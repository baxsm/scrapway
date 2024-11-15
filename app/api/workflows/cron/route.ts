import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflows";
import { triggerWorkflow } from "./service";

export async function GET() {
  const now = new Date();

  const workflows = await prisma.workflow.findMany({
    select: {
      id: true,
    },
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: { not: null },
      nextRunAt: { lte: now },
    },
  });

  for (const workflow of workflows) {
    triggerWorkflow(workflow.id);
  }

  return new Response(null, { status: 200 });
}
