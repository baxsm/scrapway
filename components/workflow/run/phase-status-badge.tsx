import { ExecutionPhaseStatus } from "@/types/workflows";
import { CircleCheck, CircleDashed, CircleX, Loader2 } from "lucide-react";
import { FC } from "react";

interface PhaseStatusBadgeProps {
  status: ExecutionPhaseStatus;
}

const PhaseStatusBadge: FC<PhaseStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case ExecutionPhaseStatus.PENDING:
      return <CircleDashed size={20} className="stroke-muted-foreground" />;
    case ExecutionPhaseStatus.RUNNING:
      return <Loader2 size={20} className="animate-spin stroke-yellow-400" />;
    case ExecutionPhaseStatus.FAILED:
      return <CircleX size={20} className="stroke-destructive" />;
    case ExecutionPhaseStatus.COMPLETED:
      return <CircleCheck size={20} className="stroke-green-500" />;
    default:
      return <div className="rounded-full">{status}</div>;
  }
};

export default PhaseStatusBadge;
