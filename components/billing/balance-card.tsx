import { getAvailableCredits } from "@/actions/billing";
import { FC } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ReactCountupWrapper from "@/components/react-countup-wrapper";
import { Coins } from "lucide-react";

const BalanceCard: FC = async () => {
  const userBalance = await getAvailableCredits();

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden">
      <CardContent className="p-6 relative items-center">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Available credits
            </h3>
            <p className="text-4xl font-bold text-primary">
              <ReactCountupWrapper value={userBalance} />
            </p>
          </div>
          <Coins
            size={140}
            className="text-primary opacity-20 absolute bottom-0 right-0"
          />
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        When your credit balance reaches zero, your workflows will stop working
      </CardFooter>
    </Card>
  );
};

export default BalanceCard;
