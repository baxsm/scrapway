import { getCreditsPack } from "@/constants/billing";
import prisma from "@/lib/prisma";
import { CreditsPackId } from "@/types/billing";
import "server-only";

import Stripe from "stripe";

export const handleCheckoutSessionCompleted = async (
  event: Stripe.Checkout.Session
) => {
  if (!event.metadata) {
    throw new Error("metadata not found");
  }

  const { userId, packId } = event.metadata ?? {};

  if (!userId) {
    throw new Error("userId not found");
  }

  if (!packId) {
    throw new Error("packId not found");
  }

  const purchasedPack = getCreditsPack(packId as CreditsPackId);

  if (!purchasedPack) {
    throw new Error("Purchased pack not found");
  }

  await prisma.userBalance.upsert({
    where: {
      userId,
    },
    create: {
      userId,
      credits: purchasedPack.credits,
    },
    update: {
      credits: {
        increment: purchasedPack.credits,
      },
    },
  });

  await prisma.userPurchase.create({
    data: {
      userId,
      stripeId: event.id,
      description: `${purchasedPack.name} - ${purchasedPack.credits} credits`,
      amount: event.amount_total || 0,
      currency: event.currency || "",
    },
  });
};
