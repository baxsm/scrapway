export enum CreditsPackId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type CreditsPackType = {
  id: CreditsPackId;
  name: string;
  label: string;
  credits: number;
  price: number;
  stripePriceId: string;
};
