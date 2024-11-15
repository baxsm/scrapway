import PeriodSelectorWrapper from "@/components/home/period-selector-wrapper";
import StatsCards from "@/components/home/stats-cards";
import StatsCardsSkeleton from "@/components/home/stats-cards-skeleton";
import ExecutionStats from "@/components/home/execution-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { Period } from "@/types/analytics";
import { FC, Suspense } from "react";
import CreditsUsageInPeriod from "@/components/home/credits-usage-in-period";

interface HomeProps {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
}

const Home: FC<HomeProps> = async ({ searchParams }) => {
  const { month, year } = await searchParams;

  const currentDate = new Date();
  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Home</h1>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>

      <div className="h-full py-6 flex flex-col gap-4">
        <Suspense fallback={<StatsCardsSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <ExecutionStats selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <CreditsUsageInPeriod selectedPeriod={period} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
