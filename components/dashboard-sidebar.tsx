"use client";

import { FC } from "react";
import Logo from "./logo";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { dashboardRoutes } from "@/constants/dashboard";
import UserAvailableCreditsBadge from "./user-available-credits-badge";

const DashboardSidebar: FC = () => {
  const pathname = usePathname();

  const activeRoute = dashboardRoutes.reduce((bestMatch, route) => {
    if (
      pathname.startsWith(route.href) &&
      (!bestMatch || route.href.length > bestMatch.href.length)
    ) {
      return route;
    }
    return bestMatch;
  }, dashboardRoutes[0] || null);

  return (
    <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      {/* Main Sidebar Logo */}
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>

      <div className="p-2 mt-2">
        <UserAvailableCreditsBadge />
      </div>

      {/* Sidebar Routes | Links */}
      <div className="flex flex-col gap-1 p-2">
        {dashboardRoutes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? "sidebarActiveItem"
                  : "sidebarItem",
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
