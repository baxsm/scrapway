import { Workflow } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import ExecutionStatusIndicator from "../workflow/run/execution-status-indicator";
import { WorkflowExecutionStatus, WorkflowStatus } from "@/types/workflows";
import { format, formatDistanceToNow } from "date-fns";
import { ChevronRight, Clock } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";
import ExecutionStatusLabel from "../workflow/run/execution-status-label";

interface LastRunDetailsProps {
  workflow: Workflow;
}

const LastRunDetails: FC<LastRunDetailsProps> = ({
  workflow: { lastRunAt, lastRunStatus, id, lastRunId, nextRunAt, status },
}) => {
  const isDraft = status === WorkflowStatus.DRAFT;

  if (isDraft) {
    return;
  }

  const formattedStartedAt =
    lastRunAt &&
    formatDistanceToNow(lastRunAt, {
      addSuffix: true,
    });

  const nextSchedule = nextRunAt && format(nextRunAt, "yyyy-MM-dd HH:mm");
  const nextScheduleUtc =
    nextRunAt && formatInTimeZone(nextRunAt, "UTC", "HH:mm");

  return (
    <div className="bg-primary/5 px-4 py-1 flex justify-between items-center text-muted-foreground">
      <div className="flex items-center text-sm gap-2">
        {lastRunAt && (
          <Link
            href={`/workflow/runs/${id}/${lastRunId}`}
            className="flex items-center text-sm gap-2 group"
          >
            <span>Last run:</span>
            <ExecutionStatusIndicator
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <ExecutionStatusLabel
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <span>{formattedStartedAt}</span>
            <ChevronRight
              size={14}
              className="-translate-x-[2px] group-hover:translate-x-0 transition"
            />
          </Link>
        )}
        {!lastRunAt && <p>No runs yet</p>}
      </div>
      {nextRunAt && (
        <div className="flex gap-2 items-center">
          <Clock size={12} />
          <span>Next run at:</span>
          <span>{nextSchedule}</span>
          <span className="text-xs">({nextScheduleUtc} UTC)</span>
        </div>
      )}
    </div>
  );
};

export default LastRunDetails;
