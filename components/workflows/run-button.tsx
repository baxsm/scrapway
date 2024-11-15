"use client";

import { runWorkflow } from "@/actions/workflows";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface RunButtonProps {
  workflowId: string;
}

const RunButton: FC<RunButtonProps> = ({ workflowId }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success("Workflow started", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      disabled={isPending}
      onClick={() => {
        toast.loading("Scheduling run...", { id: workflowId });
        mutate({ workflowId });
      }}
    >
      <Play size={16} />
      Run
    </Button>
  );
};

export default RunButton;
