"use client";

import { runWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Loader2, Play } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

interface ExecuteButtonProps {
  workflowId: string;
}

const ExecuteButton: FC<ExecuteButtonProps> = ({ workflowId }) => {
  const { toObject } = useReactFlow();
  const generate = useExecutionPlan();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success("Execution started", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "flow-execution" });
    },
  });

  const handleClick = async () => {
    const plan = generate();
    if (!plan) {
      return;
    }

    await mutateAsync({ workflowId, flowDefinition: JSON.stringify(toObject()) });
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="flex items-center gap-2"
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Play className="stroke-amber-600 w-4 h-4" />
      )}
      Execute
    </Button>
  );
};

export default ExecuteButton;
