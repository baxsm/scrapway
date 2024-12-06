"use client";

import { getWorkflowExecutions } from "@/actions/workflows";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { datesToDurationString } from "@/lib/dates";
import { Badge } from "@/components/ui/badge";
import ExecutionStatusIndicator from "./execution-status-indicator";
import { WorkflowExecutionStatus } from "@/types/workflows";
import { Coins } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

type InitialDataType = Awaited<ReturnType<typeof getWorkflowExecutions>>;

interface ExecutionsTableProps {
  workflowId: string;
  initialData: InitialDataType;
}

const ExecutionsTable: FC<ExecutionsTableProps> = ({
  workflowId,
  initialData,
}) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["execution", workflowId],
    queryFn: () => getWorkflowExecutions(workflowId),
    refetchInterval: 5000,
    initialData,
  });

  return (
    <div className="border rounded-lg shadow-md overflow-auto">
      <Table className="h-full">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Consumed</TableHead>
            <TableHead className="text-right text-sm text-muted-foreground">
              Started at (desc)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="gap-2 h-full overflow-auto">
          {data.map((execution) => {
            const duration = datesToDurationString(
              execution.completedAt,
              execution.startedAt
            );

            const formattedStartedAt =
              execution.startedAt &&
              formatDistanceToNow(execution.startedAt, {
                addSuffix: true,
              });

            return (
              <TableRow
                key={execution.id}
                className="cursor-pointer"
                onClick={() => {
                  router.push(
                    `/dashboard/workflow/runs/${execution.workflowId}/${execution.id}`
                  );
                }}
              >
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{execution.id}</span>
                    <div className="text-muted-foreground text-sm">
                      <span>Triggered via </span>
                      <Badge variant="outline">{execution.trigger}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <ExecutionStatusIndicator
                        status={execution.status as WorkflowExecutionStatus}
                      />
                      <span className="font-semibold capitalize">
                        {execution.status}
                      </span>
                    </div>
                    <div className="text-muted-foreground text-sm mx-5">
                      {duration}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Coins size={16} className="text-primary" />
                      <span className="font-semibold capitalize">
                        {execution.creditsConsumed}
                      </span>
                    </div>
                    <div className="text-muted-foreground text-sm mx-5">
                      Credits
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formattedStartedAt}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExecutionsTable;
