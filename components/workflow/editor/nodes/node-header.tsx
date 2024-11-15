"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { CustomNode } from "@/types/custom-node";
import { TaskType } from "@/types/task";
import { useReactFlow } from "@xyflow/react";
import { Coins, Copy, GripVertical, Trash } from "lucide-react";
import { FC } from "react";

interface NodeHeaderProps {
  taskType: TaskType;
  nodeId: string;
}

const NodeHeader: FC<NodeHeaderProps> = ({ taskType, nodeId }) => {
  const task = TaskRegistry[taskType];

  const { deleteElements, getNode, addNodes } = useReactFlow();

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs uppercase font-bold text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <Coins size={16} /> {task.credits}
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button
                onClick={() => {
                  deleteElements({
                    nodes: [{ id: nodeId }],
                  });
                }}
                variant="ghost"
                size="icon"
              >
                <Trash size={12} />
              </Button>
              <Button
                onClick={() => {
                  const node = getNode(nodeId) as CustomNode;

                  const newX = node.position.x;
                  const newY =
                    node.position.y + (node.measured?.height ?? 500) + 20;

                  const newNode = createFlowNode(node.data.type, {
                    x: newX,
                    y: newY,
                  });

                  addNodes([newNode]);
                }}
                variant="ghost"
                size="icon"
              >
                <Copy size={12} />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="drag-handle cursor-grab"
          >
            <GripVertical size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
