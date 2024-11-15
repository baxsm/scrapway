import { getAvailableCredits } from "@/actions/billing";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Coins, Loader2 } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import ReactCountupWrapper from "./react-countup-wrapper";
import { buttonVariants } from "./ui/button";

const UserAvailableCreditsBadge: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: getAvailableCredits,
    refetchInterval: 30 * 1000,
  });

  return (
    <Link
      href="/billing"
      className={cn(
        "w-full space-x-2 items-center",
        buttonVariants({ variant: "outline" })
      )}
    >
      <Coins size={20} className="text-primary" />
      <span className="font-semibold capitalize">
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : data !== undefined ? (
          <ReactCountupWrapper value={data} />
        ) : (
          "-"
        )}
      </span>
    </Link>
  );
};

export default UserAvailableCreditsBadge;
