import { cn } from "@/lib/utils";
import { WorkflowExecutionStatus } from "@/types/workflows";
import { FC } from "react";

const labelColors: Record<WorkflowExecutionStatus, string> = {
  PENDING: "text-slate-400",
  RUNNING: "text-yellow-400",
  FAILED: "text-red-400",
  COMPLETED: "text-emerald-600",
};

interface ExecutionStatusLabelProps {
  status: WorkflowExecutionStatus;
}

const ExecutionStatusLabel: FC<ExecutionStatusLabelProps> = ({ status }) => {
  return <span className={cn("lowercase", labelColors[status])}>{status}</span>;
};

export default ExecutionStatusLabel;
