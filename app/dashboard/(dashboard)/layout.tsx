import BreadcrumbHeader from "@/components/breadcrumb-header";
import DesktopSidebar from "@/components/dashboard-sidebar";
import ThemeToggle from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadcrumbHeader />
          <div className="gap-2 flex items-center">
            <ThemeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container p-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
