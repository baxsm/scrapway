import { Workflow } from "@prisma/client";
import { FC } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./flow-editor";
import Topbar from "../topbar/topbar";
import TaskMenu from "./task-menu";
import { FlowValidationContextProvider } from "@/context/flow-validation-context";
import { WorkflowStatus } from "@/types/workflows";

interface EditorProps {
  workflow: Workflow;
}

const Editor: FC<EditorProps> = ({ workflow }) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Topbar
            title="Workflow Editor"
            subtitle={workflow.name}
            workflowId={workflow.id}
            isPublished={workflow.status === WorkflowStatus.PUBLISHED}
          />
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};

export default Editor;
