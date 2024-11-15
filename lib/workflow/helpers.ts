import { CustomNode } from "@/types/custom-node";
import { TaskRegistry } from "./task/registry";

export const calculateWorkflowCost = (nodes: CustomNode[]) => {
  return nodes.reduce((acc, node) => {
    return acc + TaskRegistry[node.data.type].credits;
  }, 0);
};
