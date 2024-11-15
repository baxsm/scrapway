"use client";

import {
  getWorkflowExecutionWithPhases,
  getWorkflowPhaseDetails,
} from "@/actions/workflows";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflows";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Circle,
  Clock,
  Coins,
  Loader2,
  Workflow,
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import ExecutionLabel from "./execution-label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { datesToDurationString } from "@/lib/dates";
import { getPhasesTotalCost } from "@/lib/phases";
import ParameterViewer from "./parameter-viewer";
import LogViewer from "./log-viewer";
import PhaseStatusBadge from "./phase-status-badge";
import ReactCountupWrapper from "@/components/react-countup-wrapper";

type ExecutionData = Awaited<ReturnType<typeof getWorkflowExecutionWithPhases>>;

interface ExecutionViewerProps {
  initialData: ExecutionData;
}

const ExecutionViewer: FC<ExecutionViewerProps> = ({ initialData }) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => getWorkflowExecutionWithPhases(initialData!.id),
    // Only refetch if the execution is RUNNING
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const { data: phaseDetails } = useQuery({
    queryKey: ["phaseDetails", selectedPhase, data?.status],
    enabled: selectedPhase !== null,
    queryFn: () => getWorkflowPhaseDetails(selectedPhase || ""),
  });

  const isRunning = data?.status === WorkflowExecutionStatus.RUNNING;

  useEffect(() => {
    const phases = data?.phases || [];

    if (isRunning) {
      const phaseToSelect = phases.toSorted((a, b) =>
        a.startedAt! > b.startedAt! ? -1 : 1
      )[0];

      setSelectedPhase(phaseToSelect.id);
      return;
    }

    const phaseToSelect = phases.toSorted((a, b) =>
      a.completedAt! > b.completedAt! ? -1 : 1
    )[0];
    setSelectedPhase(phaseToSelect.id);
  }, [data?.phases, isRunning, setSelectedPhase]);

  const duration = datesToDurationString(data?.completedAt, data?.startedAt);

  const creditsConsumed = getPhasesTotalCost(data?.phases || []);

  return (
    <div className="flex w-full h-full">
      <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
        <div className="py-4 px-2">
          {/* Status */}
          <ExecutionLabel
            icon={Circle}
            label="Status"
            value={
              <div className="font-semibold capitalize flex gap-2 items-center">
                <PhaseStatusBadge
                  status={data?.status as ExecutionPhaseStatus}
                />
                <span>{data?.status}</span>
              </div>
            }
          />
          <ExecutionLabel
            icon={Calendar}
            label="Started at"
            value={
              <span className="lowercase">
                {data?.startedAt
                  ? formatDistanceToNow(new Date(data.startedAt), {
                      addSuffix: true,
                    })
                  : "-"}
              </span>
            }
          />
          <ExecutionLabel
            icon={Clock}
            label="Duration"
            value={
              duration ? (
                duration
              ) : (
                <Loader2 className="animate-spin" size={20} />
              )
            }
          />
          <ExecutionLabel
            icon={Coins}
            label="Credits consumed"
            value={<ReactCountupWrapper value={creditsConsumed} />}
          />
        </div>

        <Separator />

        <div className="flex justify-center items-center py-2 px-4">
          <div className="text-muted-foreground flex items-center gap-2">
            <Workflow size={20} className="stroke-muted-foreground/80" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>

        <Separator />

        <div className="overflow-auto h-full px-2 py-4">
          {data?.phases.map((phase, index) => (
            <Button
              key={index}
              variant={selectedPhase === phase.id ? "secondary" : "ghost"}
              className="w-full justify-between"
              onClick={() => {
                if (isRunning) {
                  return;
                }
                setSelectedPhase(phase.id);
              }}
            >
              <div className="flex items-center gap-4">
                <Badge variant="outline">{index + 1}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>

              <PhaseStatusBadge status={phase.status as ExecutionPhaseStatus} />
            </Button>
          ))}
        </div>
      </aside>

      <div className="flex w-full h-full">
        {isRunning && (
          <div className="flex items-center flex-col gap-2 justify-center w-full h-full">
            <p className="font-bold">Run is in progress, please wait!</p>
          </div>
        )}
        {!isRunning && !selectedPhase && (
          <div className="flex items-center flex-col gap-2 justify-center w-full h-full">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="text-sm text-muted-foreground">
                Select a phase to view details
              </p>
            </div>
          </div>
        )}
        {!isRunning && selectedPhase && phaseDetails && (
          <div className="flex flex-col p-4 container gap-4 overflow-auto">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="space-x-4">
                <div className="flex gap-1 items-center">
                  <Coins size={18} className="stroke-muted-foreground" />
                  <span>Credits</span>
                </div>
                <span>{phaseDetails.creditsConsumed}</span>
              </Badge>
              <Badge variant="outline" className="space-x-4">
                <div className="flex gap-1 items-center">
                  <Clock size={18} className="stroke-muted-foreground" />
                  <span>Duration</span>
                </div>
                <span>
                  {datesToDurationString(
                    phaseDetails.completedAt,
                    phaseDetails.startedAt
                  ) || "-"}
                </span>
              </Badge>
            </div>

            <ParameterViewer
              title="Inputs"
              subtitle="Inputs used for this phase"
              paramsJson={phaseDetails.inputs}
            />

            <ParameterViewer
              title="Outputs"
              subtitle="Outputs generated by this phase"
              paramsJson={phaseDetails.outputs}
            />

            <LogViewer logs={phaseDetails.logs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutionViewer;
