import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { CustomNodeData } from "@/types/custom-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs from "./inputs/node-inputs";
import NodeInput from "./inputs/node-input";
import NodeOutputs from "./outputs/node-outputs";
import NodeOutput from "./outputs/node-output";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as CustomNodeData;

  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
      <NodeInputs>
        {task.inputs.map((input, index) => (
          <NodeInput input={input} key={index} nodeId={props.id} />
        ))}
      </NodeInputs>

      <NodeOutputs>
        {task.outputs.map((output, index) => (
          <NodeOutput output={output} key={index} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

NodeComponent.displayName = "NodeComponent";

export default NodeComponent;
