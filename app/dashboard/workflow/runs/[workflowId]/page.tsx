import ExecutionsTableWrapper from "@/components/workflow/run/executions-table-wrapper";
import Topbar from "@/components/workflow/topbar/topbar";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

interface ExecutionProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const Execution: FC<ExecutionProps> = async ({ params }) => {
  const { workflowId } = await params;

  if (!workflowId) {
    notFound();
  }

  return (
    <div className="w-full h-full overflow-auto">
      <Topbar
        workflowId={workflowId}
        title="All runs"
        subtitle="List of all your workflow runs"
        hideButtons
      />
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 size={30} className="animate-spin stroke-primary" />
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={workflowId} />
      </Suspense>
    </div>
  );
};

export default Execution;
