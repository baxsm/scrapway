import { getWorkflowExecutions } from "@/actions/workflows";
import { Inbox } from "lucide-react";
import { FC } from "react";
import ExecutionsTable from "./executions-table";

interface ExecutionsTableWrapperProps {
  workflowId: string;
}

const ExecutionsTableWrapper: FC<ExecutionsTableWrapperProps> = async ({
  workflowId,
}) => {
  const executions = await getWorkflowExecutions(workflowId);

  if (!executions) {
    return <div>No data</div>;
  }

  if (executions.length === 0) {
    return (
      <div className="container w-full py-6">
        <div className="flex items-center flex-col gap-2 justify-between w-full h-full">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <Inbox size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No runs have been triggered yet for this workflow
            </p>
            <p className="text-sm text-muted-foreground">
              You can trigger a new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 w-full">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  );
};

export default ExecutionsTableWrapper;
