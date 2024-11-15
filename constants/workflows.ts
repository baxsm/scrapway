import { WorkflowStatus } from "@/types/workflows";

export const workflowStatusColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};
