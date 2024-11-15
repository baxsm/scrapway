import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const StatsCardsSkeleton: FC = () => {
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="w-full min-h-[120px]"/>
      ))}
    </div>
  );
};

export default StatsCardsSkeleton;
