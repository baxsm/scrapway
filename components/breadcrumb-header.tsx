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
import DashboardSidebarMobile from "./dashboard-sidebar-mobile";

const BreadcrumbHeader: FC = () => {
  const pathname = usePathname();

  const paths = pathname === "/" ? [""] : pathname.split("/");

  return (
    <div className="flex flex-start">
      <DashboardSidebarMobile />
      <Breadcrumb className="flex items-center">
        <BreadcrumbList>
          {paths.map((path, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                  {path === "" ? "home" : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== paths.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
