"use client";

import { useFlowValidation } from "@/hooks/useFlowValidation";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import { FC, ReactNode } from "react";

interface NodeCardProps {
  children: ReactNode;
  nodeId: string;
  isSelected: boolean;
}

const NodeCard: FC<NodeCardProps> = ({ children, isSelected, nodeId }) => {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();

  const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId)

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) {
          return;
        }

        const { position, measured } = node;

        if (!position || !measured) {
          return;
        }

        const { width, height } = measured;

        const x = position.x + width! / 2;
        const y = position.y + height! / 2;

        if (x === undefined || y === undefined) {
          return;
        }

        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs flex flex-col gap-1",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;