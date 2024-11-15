"use client";

import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CustomDialogHeader from "../custom-dialog-header";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import {
  removeWorkflowSchedule,
  updateWorkflowCron,
} from "@/actions/workflows";
import { toast } from "sonner";
import cronsTrue from "cronstrue";
import cronParser from "cron-parser";
import { Separator } from "@/components/ui/separator";

interface ScheduleDialogProps {
  workflowId: string;
  workflowCron: string;
}

const ScheduleDialog: FC<ScheduleDialogProps> = ({
  workflowId,
  workflowCron,
}) => {
  const [cron, setCron] = useState(workflowCron);
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");

  const { mutate: updateSchedule, isPending: isUpdating } = useMutation({
    mutationFn: updateWorkflowCron,
    onSuccess: () => {
      toast.success("Schedule updated successfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cron" });
    },
  });

  const { mutate: removeSchedule, isPending: isRemoving } = useMutation({
    mutationFn: removeWorkflowSchedule,
    onSuccess: () => {
      toast.success("Schedule removed successfully", { id: "cron" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "cron" });
    },
  });

  useEffect(() => {
    try {
      cronParser.parseExpression(cron);
      const humanCronString = cronsTrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanCronString);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setValidCron(false);
    }
  }, [cron]);

  const workflowHasValidCron = workflowCron && workflowCron.length > 0;
  const readableSavedCron =
    workflowHasValidCron && cronsTrue.toString(workflowCron);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className={cn(
            "text-sm p-0 h-auto text-green-500",
            workflowHasValidCron && "text-primary"
          )}
        >
          {workflowHasValidCron ? (
            <div className="flex items-center gap-2">
              <Clock />
              {readableSavedCron}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <TriangleAlert className="w-3 h-3" />
              Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={Calendar}
        />
        <div className="p-6 space-y-4">
          <p>
            Specify a cron expression to schedule periodic workflow execution.
            All times are in UTC
          </p>
          <Input
            placeholder="E.g. * * * * *"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
          />
          <div
            className={cn(
              "bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
              validCron && "border-primary text-primary"
            )}
          >
            {validCron
              ? readableCron
              : cron.length === 0
              ? "Value is required"
              : "Not a valid cron expression"}
          </div>

          {workflowHasValidCron && (
            <DialogClose asChild>
              <div>
                <Button
                  onClick={() => {
                    toast.loading("Removing schedule...", { id: "cron" });
                    removeSchedule(workflowId);
                  }}
                  disabled={isRemoving || isUpdating}
                  variant="outline"
                  className="w-full text-destructive border-destructive hover:text-destructive"
                >
                  Remove current schedule
                </Button>
                <Separator className="my-4" />
              </div>
            </DialogClose>
          )}
        </div>
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button className="w-full" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                if (cron.length === 0) {
                  return;
                }

                toast.loading("Saving...", { id: "cron" });
                updateSchedule({ workflowId, cron });
              }}
              className="w-full"
              disabled={isUpdating || !validCron}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
