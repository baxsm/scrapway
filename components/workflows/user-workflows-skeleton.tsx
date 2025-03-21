import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const UserWorkflowsSkeleton: FC = ({}) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-32 w-full" />
      ))}
    </div>
  );
};

export default UserWorkflowsSkeleton;
