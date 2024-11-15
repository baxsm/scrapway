import { getUserPurchaseHistory } from "@/actions/billing";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftRight } from "lucide-react";
import InvoiceButton from "./invoice-button";

const TransactionsHistory: FC = async () => {
  const purchasesHistory = await getUserPurchaseHistory();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ArrowLeftRight className="w-6 h-6 text-primary" />
          Transaction history
        </CardTitle>
        <CardDescription>
          View your transaction history and download invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        {purchasesHistory.length === 0 ? (
          <p className="text-muted-foreground">No transactions yet</p>
        ) : (
          purchasesHistory.map((purchase) => (
            <div
              key={purchase.id}
              className="flex items-center justify-between py-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium">{formatDate(purchase.date)}</p>
                <p className="text-muted-foreground text-sm">
                  {purchase.description}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {formatAmount(purchase.amount, purchase.currency)}
                </p>
                <InvoiceButton id={purchase.id} />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsHistory;

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100);
};
