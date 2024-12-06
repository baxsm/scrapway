"use client";

import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { dashboardRoutes } from "@/constants/dashboard";
import DashboardSidebarMobile from "./dashboard-sidebar-mobile";

const BreadcrumbHeader: FC = () => {
  const pathname = usePathname();

  const getPathNames = (pathname: string) => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const pathnames: typeof dashboardRoutes = [];
    let cumulativePath = "";
    pathSegments.forEach((segment) => {
      cumulativePath += `/${segment}`;
      const route = dashboardRoutes.find(
        (route) => route.href === cumulativePath
      );
      if (route) {
        pathnames.push({
          label: route.label,
          href: route.href,
          icon: HomeIcon,
        });
      }
    });
    return pathnames.length ? pathnames : [{ ...dashboardRoutes[0] }];
  };

  const pathNames = getPathNames(pathname);

  return (
    <div className="flex flex-start">
      <DashboardSidebarMobile />
      <Breadcrumb className="flex items-center">
        <BreadcrumbList>
          {pathNames.map((path, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className={buttonVariants({
                    variant: "ghost",
                    className: "capitalize",
                    size: "sm",
                  })}
                  href={`${path.href}`}
                >
                  {path.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== pathNames.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
