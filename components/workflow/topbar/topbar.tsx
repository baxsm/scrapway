"use client";

import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import SaveButton from "./save-button";
import ExecuteButton from "./execute-button";
import NavigationTabs from "./navigation-tabs";
import PublishButton from "./publish-button";
import UnPublishButton from "./unpublish-button";

interface TopbarProps {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
  isPublished?: boolean;
}

const Topbar: FC<TopbarProps> = ({
  title,
  subtitle,
  workflowId,
  hideButtons = false,
  isPublished = false,
}) => {
  const router = useRouter();

  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex flex-1 items-center justify-between gap-1">
        <div className="flex gap-1">
          <TooltipWrapper content="Back">
            <Button variant="ghost" size="icon" onClick={() => router.push("/workflows")}>
              <ChevronLeft size={20} />
            </Button>
          </TooltipWrapper>
          <div className="">
            <p className="font-bold text-ellipsis truncate">{title}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate text-ellipsis">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <NavigationTabs workflowId={workflowId} />
        <div className="flex gap-1 justify-end">
          {!hideButtons && (
            <>
              <ExecuteButton workflowId={workflowId} />
              {isPublished && <UnPublishButton workflowId={workflowId} />}
              {!isPublished && (
                <>
                  <SaveButton workflowId={workflowId} />
                  <PublishButton workflowId={workflowId} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
