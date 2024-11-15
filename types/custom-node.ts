import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./task";

export interface CustomNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface CustomNode extends Node {
  data: CustomNodeData;
}

export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
  disabled?: boolean;
}

export type CustomNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};
