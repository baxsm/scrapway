"use client";

import { publishWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Loader2, Upload } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

interface PublishButtonProps {
  workflowId: string;
}

const PublishButton: FC<PublishButtonProps> = ({ workflowId }) => {
  const { toObject } = useReactFlow();
  const generate = useExecutionPlan();

  const { mutate, isPending } = useMutation({
    mutationFn: publishWorkflow,
    onSuccess: () => {
      toast.success("Workflow published successfully", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });

  return (
    <Button
      onClick={() => {
        const plan = generate();
        if (!plan) {
          return;
        }

        toast.loading("Publishing workflow...", { id: workflowId });

        mutate({ workflowId, flowDefinition: JSON.stringify(toObject()) });
      }}
      variant="outline"
      className="flex items-center gap-2"
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Upload className="stroke-purple-400 w-4 h-4" />
      )}
      Publish
    </Button>
  );
};

export default PublishButton;
