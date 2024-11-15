import { executeWorkflow } from "@/actions/execute-workflow";
import prisma from "@/lib/prisma";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflows";
import { timingSafeEqual } from "crypto";
import cronParser from "cron-parser";

const isValidSecret = (secret: string) => {
  const API_SECRET = process.env.API_SECRET;
  if (!API_SECRET) {
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(secret), Buffer.from(API_SECRET));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = authHeader.split(" ")[1];
  if (!isValidSecret(secret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const workflowId = searchParams.get("workflowId") as string;

  if (!workflowId) {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
    },
  });

  if (!workflow) {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const executionPlan = JSON.parse(
    workflow.executionPlan!
  ) as WorkflowExecutionPlan;

  if (!executionPlan) {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    const cron = cronParser.parseExpression(workflow.cron!, { utc: true });
    const nextRun = cron.next().toDate();

    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId,
        userId: workflow.userId,
        definition: workflow.definition,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        trigger: WorkflowExecutionTrigger.CRON,
        phases: {
          create: executionPlan.flatMap((phase) =>
            phase.nodes.flatMap((node) => ({
              userId: workflow.userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            }))
          ),
        },
      },
    });

    await executeWorkflow(execution.id, nextRun);
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }

  return new Response(null, { status: 200 });
}
