"use client";

import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { DragEvent, FC, useCallback, useEffect } from "react";
import NodeComponent from "./nodes/node-component";
import "@xyflow/react/dist/style.css";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import { CustomNode } from "@/types/custom-node";
import DeletableEdge from "./edges/deletable-edge";
import { TaskRegistry } from "@/lib/workflow/task/registry";

const nodeTypes = {
  Node: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

interface FlowEditorProps {
  workflow: Workflow;
}

const FlowEditor: FC<FlowEditorProps> = ({ workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) {
        return;
      }

      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) {
        return;
      }

      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error(error);
    }
  }, [workflow, setEdges, setNodes, setViewport]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const taskType = event.dataTransfer.getData("application/reactflow");
      if (typeof taskType === "undefined" || !taskType) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = createFlowNode(taskType as TaskType, position);
      setNodes((nodes) => nodes.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edges) => addEdge({ ...connection, animated: true }, edges));

      if (!connection.targetHandle) {
        return;
      }

      // Clear input value if connection is present between two nodes Html -> Html
      const node = nodes.find((node) => node.id === connection.target);

      if (!node) {
        return;
      }

      const nodeInputs = node.data.inputs;
      delete nodeInputs[connection.targetHandle];
      updateNodeData(node.id, { inputs: nodeInputs });
    },
    [setEdges, nodes, updateNodeData]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // Restrict self-connection
      if (connection.source === connection.target) {
        return false;
      }

      // Restrict different paramType connection
      const source = nodes.find((node) => node.id === connection.source);
      const target = nodes.find((node) => node.id === connection.target);

      if (!source || !target) {
        console.error("Invalid connection: Source or Target node not found");
        return false;
      }

      const sourceTask = TaskRegistry[source.data.type];
      const targetTask = TaskRegistry[target.data.type];

      const output = sourceTask.outputs.find(
        (output) => output.name === connection.sourceHandle
      );
      const input = targetTask.inputs.find(
        (input) => input.name === connection.targetHandle
      );

      if (input?.type !== output?.type) {
        console.error("Invalid connection: Type Mismatch");
        return false;
      }

      // Restrict Cycle
      const hasCycle = (node: CustomNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      if (target.id === connection.source) return false;
      return !hasCycle(target);
    },
    [nodes, edges]
  );

  return (
    <main className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
