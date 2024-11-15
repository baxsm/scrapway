"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FC, ReactNode } from "react";

interface TooltipWrapperProps {
  content: string;
  children: ReactNode;

  side?: "top" | "bottom" | "left" | "right";
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({
  content,
  children,
  side,
}) => {
  if (!content || content.length === 0) {
    return children;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
