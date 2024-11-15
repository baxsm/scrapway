"use client";

import { updateWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon, Loader2 } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

interface SaveButtonProps {
  workflowId: string;
}

const SaveButton: FC<SaveButtonProps> = ({ workflowId }) => {
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success("Flow saved successfully", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });

  return (
    <Button
      disabled={isPending}
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving workflow...", { id: workflowId });
        mutate({ id: workflowId, definition: workflowDefinition });
      }}
    >
      {isPending ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        <CheckIcon className="stroke-green-400 w-4 h-4" />
      )}
      Save
    </Button>
  );
};

export default SaveButton;
