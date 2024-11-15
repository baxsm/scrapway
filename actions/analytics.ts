import { periodToDateRange } from "@/lib/dates";
import prisma from "@/lib/prisma";
import { Period } from "@/types/analytics";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflows";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";

export const getPeriods = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const years = await prisma.workflowExecution.aggregate({
    where: {
      userId,
    },
    _min: { startedAt: true },
  });

  const currentYear = new Date().getFullYear();

  const minYear = years._min.startedAt
    ? years._min.startedAt.getFullYear()
    : currentYear;

  const periods: Period[] = [];

  for (let year = minYear; year <= currentYear; year++) {
    for (let month = 0; month <= 11; month++) {
      periods.push({ year, month });
    }
  }

  return periods;
};

export const getStatsCardsValues = async (selectedPeriod: Period) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const dateRange = periodToDateRange(selectedPeriod);

  const executions = await prisma.workflowExecution.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
      status: {
        in: [WorkflowExecutionStatus.COMPLETED, WorkflowExecutionStatus.FAILED],
      },
    },
    select: {
      creditsConsumed: true,
      phases: {
        where: {
          creditsConsumed: {
            not: null,
          },
        },
        select: {
          creditsConsumed: true,
        },
      },
    },
  });

  const stats = {
    workflowExecutions: executions.length,
    creditsConsumed: 0,
    phaseExecutions: 0,
  };

  stats.creditsConsumed = executions.reduce(
    (sum, executions) => sum + executions.creditsConsumed,
    0
  );

  stats.phaseExecutions = executions.reduce(
    (sum, executions) => sum + executions.phases.length,
    0
  );

  return stats;
};

type ExecutionStats = {
  success: number;
  failed: number;
};

export const getWorkflowExecutionStats = async (selectedPeriod: Period) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const dateRange = periodToDateRange(selectedPeriod);

  const executions = await prisma.workflowExecution.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
    },
  });

  const dateFormat = "yyy-MM-dd";

  const stats: Record<string, ExecutionStats> = eachDayOfInterval({
    start: dateRange.startDate,
    end: dateRange.endDate,
  })
    .map((date) => format(date, dateFormat))
    .reduce(
      (acc, date) => {
        acc[date] = {
          success: 0,
          failed: 0,
        };
        return acc;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as {
        [key: string]: ExecutionStats;
      }
    );

  executions.forEach((execution) => {
    const date = format(execution.startedAt!, dateFormat);
    if (execution.status === WorkflowExecutionStatus.COMPLETED) {
      stats[date].success += 1;
    }
    if (execution.status === WorkflowExecutionStatus.FAILED) {
      stats[date].failed += 1;
    }
  });

  const result = Object.entries(stats).map(([date, info]) => ({
    date,
    ...info,
  }));

  return result;
};

type CreditsStats = {
  success: number;
  failed: number;
};

export const getCreditsUsageInPeriod = async (selectedPeriod: Period) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const dateRange = periodToDateRange(selectedPeriod);

  const executionPhases = await prisma.executionPhase.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
      status: {
        in: [ExecutionPhaseStatus.COMPLETED, ExecutionPhaseStatus.FAILED],
      },
    },
  });

  const dateFormat = "yyy-MM-dd";

  const stats: Record<string, CreditsStats> = eachDayOfInterval({
    start: dateRange.startDate,
    end: dateRange.endDate,
  })
    .map((date) => format(date, dateFormat))
    .reduce(
      (acc, date) => {
        acc[date] = {
          success: 0,
          failed: 0,
        };
        return acc;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as {
        [key: string]: CreditsStats;
      }
    );

  executionPhases.forEach((phase) => {
    const date = format(phase.startedAt!, dateFormat);
    if (phase.status === ExecutionPhaseStatus.COMPLETED) {
      stats[date].success += phase.creditsConsumed || 0;
    }
    if (phase.status === ExecutionPhaseStatus.FAILED) {
      stats[date].failed += phase.creditsConsumed || 0;
    }
  });

  const result = Object.entries(stats).map(([date, info]) => ({
    date,
    ...info,
  }));

  return result;
};
