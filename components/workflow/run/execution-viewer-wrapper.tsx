import { getWorkflowExecutionWithPhases } from "@/actions/workflows";
import { FC } from "react";
import ExecutionViewer from "./execution-viewer";

interface ExecutionViewerWrapperProps {
  executionId: string;
}

const ExecutionViewerWrapper: FC<ExecutionViewerWrapperProps> = async ({
  executionId,
}) => {
  const workflowExecution = await getWorkflowExecutionWithPhases(executionId);

  if (!workflowExecution) {
    return <div>Not found</div>;
  }

  return (
    <ExecutionViewer initialData={workflowExecution}/>
  )
};

export default ExecutionViewerWrapper;
