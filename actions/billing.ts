"use server";

import { getCreditsPack } from "@/constants/billing";
import { getAppUrl } from "@/lib/appUrl";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { CreditsPackId } from "@/types/billing";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getAvailableCredits = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const balance = await prisma.userBalance.findUnique({
    where: {
      userId,
    },
  });

  if (!balance) {
    return -1;
  }

  return balance.credits;
};

export const purchaseCredits = async (packId: CreditsPackId) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const selectedPack = getCreditsPack(packId);

  if (!selectedPack) {
    throw new Error("Invalid Pack");
  }

  const priceId = selectedPack.stripePriceId;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    invoice_creation: {
      enabled: true,
    },
    success_url: getAppUrl("/billing"),
    cancel_url: getAppUrl("/billing"),
    metadata: {
      userId,
      packId,
    },
    // The items we are going to Buy
    line_items: [
      {
        quantity: 1,
        price: priceId,
      },
    ],
  });

  if (!session.url) {
    throw new Error("Unable to create stripe session");
  }

  redirect(session.url);
};

export const getUserPurchaseHistory = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return prisma.userPurchase.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
};

export const downloadInvoice = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const purchase = await prisma.userPurchase.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!purchase) {
    throw new Error("Bad request");
  }

  const session = await stripe.checkout.sessions.retrieve(purchase.stripeId);

  if (!session.invoice) {
    throw new Error("Invoice not found");
  }

  const invoice = await stripe.invoices.retrieve(session.invoice as string);

  return invoice.hosted_invoice_url;
};
