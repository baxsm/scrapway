import { getStatsCardsValues } from "@/actions/analytics";
import { Period } from "@/types/analytics";
import { CirclePlay, Coins, Waypoints } from "lucide-react";
import { FC } from "react";
import StatsCard from "./stats-card";

interface StatsCardsProps {
  selectedPeriod: Period;
}

const StatsCards: FC<StatsCardsProps> = async ({ selectedPeriod }) => {
  const data = await getStatsCardsValues(selectedPeriod);

  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]">
      <StatsCard
        title="Workflow executions"
        value={data.workflowExecutions}
        icon={CirclePlay}
      />
      <StatsCard
        title="Phase executions"
        value={data.phaseExecutions}
        icon={Waypoints}
      />
      <StatsCard
        title="Credits consumed"
        value={data.creditsConsumed}
        icon={Coins}
      />
    </div>
  );
};

export default StatsCards;
