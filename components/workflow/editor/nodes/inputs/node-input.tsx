import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position, useEdges } from "@xyflow/react";
import { FC } from "react";
import NodeParamField from "../node-param-field";
import { ColorForHandle } from "@/constants/workflow";
import { useFlowValidation } from "@/hooks/useFlowValidation";

interface NodeInputProps {
  input: TaskParam;
  nodeId: string;
}

const NodeInput: FC<NodeInputProps> = ({ input, nodeId }) => {
  const edges = useEdges();

  const { invalidInputs } = useFlowValidation();

  const invalidNode = invalidInputs.find((node) => node.nodeId === nodeId);
  const hasErrors = invalidNode?.inputs.find(
    (invalidInput) => invalidInput === input.name
  );

  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  return (
    <div className={cn("flex justify-start relative p-3 bg-secondary w-full", hasErrors && "bg-destructive/30")}>
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};

export default NodeInput;
