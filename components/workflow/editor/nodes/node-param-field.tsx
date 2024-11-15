"use client";

import { TaskParam, TaskParamType } from "@/types/task";
import { FC, useCallback } from "react";
import StringParam from "./params/string-param";
import { useReactFlow } from "@xyflow/react";
import { CustomNode } from "@/types/custom-node";
import BrowserInstanceParam from "./params/browser-instance-param";
import SelectParam from "./params/select-param";
import CredentialsParam from "./params/credentials-param";

interface NodeParamFieldProps {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
}

const NodeParamField: FC<NodeParamFieldProps> = ({
  param,
  nodeId,
  disabled,
}) => {
  const { updateNodeData, getNode } = useReactFlow();

  const node = getNode(nodeId) as CustomNode;

  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [updateNodeData, param.name, node?.data.inputs, nodeId]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={""}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.CREDENTIAL:
      return (
        <CredentialsParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
