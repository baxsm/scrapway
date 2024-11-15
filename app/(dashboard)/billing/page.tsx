import BalanceCard from "@/components/billing/balance-card";
import CreditsPurchase from "@/components/billing/credits-purchase";
import CreditsUsageCard from "@/components/billing/credits-usage-card";
import TransactionsHistory from "@/components/billing/transactions-history";
import { Skeleton } from "@/components/ui/skeleton";
import { FC, Suspense } from "react";

const Billing: FC = () => {
  return (
    <div className="mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Billing</h1>
      <Suspense fallback={<Skeleton className="h-[166px] w-full" />}>
        <BalanceCard />
      </Suspense>
      <CreditsPurchase />
      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <CreditsUsageCard />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <TransactionsHistory />
      </Suspense>
    </div>
  );
};

export default Billing;
