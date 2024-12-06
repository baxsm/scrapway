import DashboardProviders from "@/components/providers/dashboard-providers";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <DashboardProviders>{children}</DashboardProviders>;
};

export default Layout;
