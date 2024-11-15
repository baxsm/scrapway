"use client";

import { unPublishWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Download, Loader2 } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

interface UnPublishButtonProps {
  workflowId: string;
}

const UnPublishButton: FC<UnPublishButtonProps> = ({ workflowId }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: unPublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow unpublished successfully", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });

  return (
    <Button
      onClick={() => {
        toast.loading("UnPublishing workflow...", { id: workflowId });

        mutate(workflowId);
      }}
      variant="outline"
      className="flex items-center gap-2"
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="stroke-orange-400 w-4 h-4" />
      )}
      UnPublish
    </Button>
  );
};

export default UnPublishButton;
