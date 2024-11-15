"use client";

import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins, CreditCard } from "lucide-react";
import { CREDITS_PACKS } from "@/constants/billing";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditsPackId } from "@/types/billing";
import { useMutation } from "@tanstack/react-query";
import { purchaseCredits } from "@/actions/billing";

const CreditsPurchase: FC = () => {
  const [selectedPack, setSelectedPack] = useState(CreditsPackId.MEDIUM);

  const { mutate, isPending } = useMutation({
    mutationFn: purchaseCredits,
    onSuccess: () => {},
    onError: () => {},
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Coins className="w-6 h-6 text-primary" />
          Purchase Credits
        </CardTitle>
        <CardDescription>
          Select the number of credits you want to purchase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(value) => setSelectedPack(value as CreditsPackId)}
          value={selectedPack}
        >
          {CREDITS_PACKS.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-3 hover:bg-secondary"
              onClick={() => setSelectedPack(pack.id)}
            >
              <RadioGroupItem value={pack.id} id={pack.id} />
              <Label className="flex justify-between w-full cursor-pointer">
                <span className="font-medium">
                  {pack.name} - {pack.label}
                </span>
                <span className="text-primary font-bold">
                  ${(pack.price / 100).toFixed(2)}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => mutate(selectedPack)}
          disabled={isPending}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Purchase credits
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditsPurchase;
