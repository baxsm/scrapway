import "server-only";

import { createLogCollector } from "@/lib/log";
import prisma from "@/lib/prisma";
import { ExecutorRegistry } from "@/lib/workflow/executor/registry";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { CustomNode } from "@/types/custom-node";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import { LogCollector } from "@/types/log";
import { TaskParamType } from "@/types/task";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflows";
import { ExecutionPhase } from "@prisma/client";
import { Edge } from "@xyflow/react";
import { revalidatePath } from "next/cache";
import { Browser, Page } from "puppeteer";

const initializeWorkflowExecution = async (
  executionId: string,
  workflowId: string,
  nextRunAt?: Date
) => {
  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executionId,
      ...(nextRunAt && { nextRunAt }),
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initializePhaseStatuses = async (execution: any) => {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        in: execution.phases.map((phase: any) => phase.id),
      },
    },
    data: {
      status: ExecutionPhaseStatus.PENDING,
    },
  });
};

const finalizeWorkflowExecution = async (
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
  creditsConsumed: number
) => {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;

  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed,
    },
  });

  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executionId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch(() => {
      // Ignore
    });
};

const finalizePhase = async (
  phaseId: string,
  success: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputs: any,
  logCollector: LogCollector,
  creditsConsumed: number
) => {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED;

  await prisma.executionPhase.update({
    where: {
      id: phaseId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs),
      creditsConsumed,
      logs: {
        createMany: {
          data: logCollector.getAll().map((log) => ({
            message: log.message,
            logLevel: log.level,
            timestamp: log.timestamp,
          })),
        },
      },
    },
  });
};

const createExecutionEnvironment = (
  node: CustomNode,
  environment: Environment,
  logCollector: LogCollector
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ExecutionEnvironment<any> => {
  return {
    getInput: (name: string) => environment.phases[node.id]?.inputs[name],

    setOutput: (name: string, value: string) =>
      (environment.phases[node.id].outputs[name] = value),

    getBrowser: () => environment.browser,
    setBrowser: (browser: Browser) => (environment.browser = browser),

    getPage: () => environment.page,
    setPage: (page: Page) => (environment.page = page),

    log: logCollector,
  };
};

const executePhase = async (
  phase: ExecutionPhase,
  node: CustomNode,
  environment: Environment,
  logCollector: LogCollector
): Promise<boolean> => {
  const runFn = ExecutorRegistry[node.data.type];

  if (!runFn) {
    logCollector.error(`Executor not found for ${node.data.type}`);
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const executionEnvironment: ExecutionEnvironment<any> =
    createExecutionEnvironment(node, environment, logCollector);

  return await runFn(executionEnvironment);
};

const setupEnvironmentForPhase = async (
  node: CustomNode,
  environment: Environment,
  edges: Edge[]
) => {
  environment.phases[node.id] = {
    inputs: {},
    outputs: {},
  };

  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    if (input.type === TaskParamType.BROWSER_INSTANCE) {
      continue;
    }

    const inputValue = node.data.inputs[input.name];

    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // Get input value from the Output
    const connectedEdge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name
    );

    if (!connectedEdge) {
      console.error("Missing edge for input", input.name, ", node id", node.id);
      continue;
    }

    const outputValue =
      environment.phases[connectedEdge.source].outputs[
        connectedEdge.sourceHandle!
      ];

    environment.phases[node.id].inputs[input.name] = outputValue;
  }
};

const decrementCredits = async (
  userId: string,
  amount: number,
  logCollector: LogCollector
) => {
  try {
    await prisma.userBalance.update({
      where: {
        userId,
        credits: { gte: amount },
      },
      data: {
        credits: {
          decrement: amount,
        },
      },
    });
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    logCollector.error("Insufficient balance");
    return false;
  }
};

const executeWorkflowPhase = async (
  phase: ExecutionPhase,
  environment: Environment,
  edges: Edge[],
  userId: string
) => {
  // Logs for each phase
  const logCollector = createLogCollector();

  const startedAt = new Date();

  const node = JSON.parse(phase.node) as CustomNode;

  setupEnvironmentForPhase(node, environment, edges);

  //  Update phase status
  await prisma.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
      inputs: JSON.stringify(environment.phases[node.id].inputs),
    },
  });

  const creditsRequired = TaskRegistry[node.data.type].credits;

  let success = await decrementCredits(userId, creditsRequired, logCollector);

  const creditsConsumed = success ? creditsRequired : 0;

  if (success) {
    // Only proceed if credits are valid
    success = await executePhase(phase, node, environment, logCollector);
  }

  const outputs = environment.phases[node.id].outputs;

  await finalizePhase(
    phase.id,
    success,
    outputs,
    logCollector,
    creditsConsumed
  );

  return { success, creditsConsumed };
};

const cleanupEnvironment = async (environment: Environment) => {
  if (environment.browser) {
    await environment.browser
      .close()
      .catch((err) => console.error("Cannot close browser", err));
  }
};

export const executeWorkflow = async (
  executionId: string,
  nextRunAt?: Date
) => {
  const execution = await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
    },
    include: {
      workflow: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("Execution not found");
  }

  const edges = JSON.parse(execution.definition).edges as Edge[];

  const environment = { phases: {} };

  await initializeWorkflowExecution(
    executionId,
    execution.workflowId,
    nextRunAt
  );

  await initializePhaseStatuses(execution);

  let creditsConsumed = 0;

  let executionFailed = false;

  for (const phase of execution.phases) {
    const phaseExecution = await executeWorkflowPhase(
      phase,
      environment,
      edges,
      execution.userId
    );

    creditsConsumed += phaseExecution.creditsConsumed;

    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
  }

  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creditsConsumed
  );

  await cleanupEnvironment(environment);

  revalidatePath("/workflows/runs");
};
