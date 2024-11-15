import { CreditsPackId, CreditsPackType } from "@/types/billing";

export const CREDITS_PACKS: CreditsPackType[] = [
  {
    id: CreditsPackId.SMALL,
    name: "Small Pack",
    label: "1,000 Credits",
    credits: 1000,
    price: 999, // $9.99
    stripePriceId: process.env.STRIPE_SMALL_PACK_PRICE_ID!,
  },
  {
    id: CreditsPackId.MEDIUM,
    name: "Medium Pack",
    label: "5,000 Credits",
    credits: 5000,
    price: 3999,
    stripePriceId: process.env.STRIPE_MEDIUM_PACK_PRICE_ID!,
  },
  {
    id: CreditsPackId.LARGE,
    name: "Large Pack",
    label: "10,000 Credits",
    credits: 10000,
    price: 6999,
    stripePriceId: process.env.STRIPE_LARGE_PACK_PRICE_ID!,
  },
];

export const getCreditsPack = (id: CreditsPackId) => {
  return CREDITS_PACKS.find((pack) => pack.id === id);
};
