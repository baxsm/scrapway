import { ColorForHandle } from "@/constants/workflow";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { FC } from "react";

interface NodeOutputProps {
  output: TaskParam;
}

const NodeOutput: FC<NodeOutputProps> = ({ output }) => {
  return (
    <div className="flex justify-end relative p-3 bg-secondary w-full">
      {/* <NodeParamField param={input} nodeId={nodeId} /> */}
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
};

export default NodeOutput;
