"use client";

import { Workflow } from "@prisma/client";
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WorkflowStatus } from "@/types/workflows";
import { FileText, Play, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { workflowStatusColors } from "@/constants/workflows";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import WorkflowActions from "./workflow-actions";
import RunButton from "./run-button";
import ScheduleSection from "./schedule-section";
import LastRunDetails from "./last-run-details";
import DuplicateWorkflowDialog from "./duplicate-workflow-dialog";
import TooltipWrapper from "../tooltip-wrapper";

interface WorkflowCardProps {
  workflow: Workflow;
}

const WorkflowCard: FC<WorkflowCardProps> = ({ workflow }) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/20 group/card">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              workflowStatusColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileText className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <TooltipWrapper content={workflow.description || ""}>
                <Link
                  href={`/workflow/editor/${workflow.id}`}
                  className="flex items-center hover:underline"
                >
                  {workflow.name}
                </Link>
              </TooltipWrapper>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
              <DuplicateWorkflowDialog workflowId={workflow.id} />
            </h3>
            <ScheduleSection
              isDraft={isDraft}
              creditsCost={workflow.creditsCost}
              workflowId={workflow.id}
              workflowCron={workflow.cron || ""}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isDraft && <RunButton workflowId={workflow.id} />}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}
          >
            <Shuffle size={16} />
            Edit
          </Link>
          <WorkflowActions
            workflowName={workflow.name}
            workflowId={workflow.id}
          />
        </div>
      </CardContent>
      <LastRunDetails workflow={workflow} />
    </Card>
  );
};

export default WorkflowCard;
