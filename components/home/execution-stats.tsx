import { getWorkflowExecutionStats } from "@/actions/analytics";
import { Period } from "@/types/analytics";
import { FC } from "react";
import ExecutionStatsChart from "./execution-stats-chart";

interface ExecutionStatsProps {
  selectedPeriod: Period;
}

const ExecutionStats: FC<ExecutionStatsProps> = async ({ selectedPeriod }) => {
  const data = await getWorkflowExecutionStats(selectedPeriod);

  return <ExecutionStatsChart data={data}/>
};

export default ExecutionStats;
