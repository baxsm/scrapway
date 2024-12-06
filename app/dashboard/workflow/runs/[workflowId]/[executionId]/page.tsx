import Topbar from "@/components/workflow/topbar/topbar";
import ExecutionViewerWrapper from "@/components/workflow/run/execution-viewer-wrapper";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

interface ExecutionViewerProps {
  params: Promise<{
    workflowId: string;
    executionId: string;
  }>;
}

const ExecutionViewer: FC<ExecutionViewerProps> = async ({ params }) => {
  const { workflowId, executionId } = await params;

  if (!workflowId || !executionId) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        workflowId={workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
};

export default ExecutionViewer;
