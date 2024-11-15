import { getCreditsUsageInPeriod } from "@/actions/analytics";
import { Period } from "@/types/analytics";
import { FC } from "react";
import CreditsUsageChart from "@/components/credits-usage-chart";

interface CreditsUsageInPeriodProps {
  selectedPeriod: Period;
}

const CreditsUsageInPeriod: FC<CreditsUsageInPeriodProps> = async ({
  selectedPeriod,
}) => {
  const data = await getCreditsUsageInPeriod(selectedPeriod);

  return (
    <CreditsUsageChart
      data={data}
      title="Daily credits spent"
      description="Daily credits consumed in selected period"
    />
  );
};

export default CreditsUsageInPeriod;
