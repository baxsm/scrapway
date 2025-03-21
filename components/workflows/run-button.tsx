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
  const { mutateAsync, isPending } = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success("Workflow started", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });

  const handleClick = async () => {
    toast.loading("Scheduling run...", { id: workflowId });
    await mutateAsync({ workflowId });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      disabled={isPending}
      onClick={handleClick}
    >
      <Play size={16} />
      Run
    </Button>
  );
};

export default RunButton;
