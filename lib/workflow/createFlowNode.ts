import { CustomNode } from "@/types/custom-node";
import { TaskType } from "@/types/task";

export const createFlowNode = (
  nodeType: TaskType,
  position?: { x: number; y: number }
): CustomNode => {
  return {
    id: crypto.randomUUID(),
    type: "Node",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
};
