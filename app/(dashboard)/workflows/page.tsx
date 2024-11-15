import CreateWorkflowDialog from "@/components/workflows/create-workflow-dialog";
import UserWorkflows from "@/components/workflows/user-workflows";
import UserWorkflowsSkeleton from "@/components/workflows/user-workflows-skeleton";
import { FC, Suspense } from "react";

const Workflows: FC = async () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

export default Workflows;
