import { getCreditsUsageInPeriod } from "@/actions/analytics";
import { Period } from "@/types/analytics";
import { FC } from "react";
import CreditsUsageChart from "@/components/credits-usage-chart";

const CreditsUsageCard: FC = async () => {
  const period: Period = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };

  const data = await getCreditsUsageInPeriod(period);

  return (
    <CreditsUsageChart
      data={data}
      title="Credits consumed"
      description="Daily credits consumed in the current month"
    />
  );
};

export default CreditsUsageCard;
