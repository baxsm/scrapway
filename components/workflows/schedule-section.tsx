import { Coins, CornerDownRight, MoveRight } from "lucide-react";
import { FC } from "react";
import ScheduleDialog from "./schedule-dialog";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Badge } from "@/components/ui/badge";

interface ScheduleSectionProps {
  isDraft: boolean;
  creditsCost: number;
  workflowId: string;
  workflowCron: string;
}

const ScheduleSection: FC<ScheduleSectionProps> = ({
  isDraft,
  creditsCost,
  workflowId,
  workflowCron,
}) => {
  if (isDraft) {
    return;
  }

  return (
    <div className="flex gap-2 items-center">
      <CornerDownRight className="w-4 h-4 text-muted-foreground" />
      <ScheduleDialog
        workflowId={workflowId}
        workflowCron={workflowCron}
        key={`${workflowCron}_${workflowId}`}
      />
      <MoveRight className="w-4 h-4 text-muted-foreground" />
      <TooltipWrapper content="Credits consumption for full run">
        <div className="flex gap-3 items-center">
          <Badge
            variant="outline"
            className="space-x-2 text-muted-foreground rounded-sm"
          >
            <Coins className="w-4 h-4" />
            <span className="text-sm">{creditsCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
};

export default ScheduleSection;
