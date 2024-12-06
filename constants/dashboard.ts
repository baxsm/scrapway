import { Coins, Home, Layers2, ShieldCheck } from "lucide-react";

export const dashboardRoutes = [
  {
    href: "/dashboard",
    label: "Home",
    icon: Home,
  },
  {
    href: "/dashboard/workflows",
    label: "Workflows",
    icon: Layers2,
  },
  {
    href: "/dashboard/credentials",
    label: "Credentials",
    icon: ShieldCheck,
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: Coins,
  },
];
