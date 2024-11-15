"use client";

import { dashboardRoutes } from "@/constants/dashboard";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import Logo from "./logo";
import Link from "next/link";
import UserAvailableCreditsBadge from "./user-available-credits-badge";

const DashboardSidebarMobile: FC = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const activeRoute =
    dashboardRoutes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || dashboardRoutes[0];

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between pr-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] space-y-4"
            side="left"
            aria-describedby="sidebar"
          >
            <Logo />
            <UserAvailableCreditsBadge />
            <div className="flex flex-col gap-1">
              {dashboardRoutes.map((route) => (
                <Link
                  key={route.label}
                  href={`/${route.href}`}
                  className={buttonVariants({
                    variant:
                      activeRoute.href === route.href
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                  onClick={() => setIsOpen(false)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default DashboardSidebarMobile;
