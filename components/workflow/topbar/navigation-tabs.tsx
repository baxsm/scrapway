"use client";

import { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationTabsProps {
  workflowId: string;
}

const NavigationTabs: FC<NavigationTabsProps> = ({ workflowId }) => {
  const pathname = usePathname();

  const activeValue = pathname?.split("/")[2];

  return (
    <Tabs value={activeValue} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <Link href={`/dashboard/workflow/editor/${workflowId}`}>
          <TabsTrigger value="editor" className="w-full">
            Editor
          </TabsTrigger>
        </Link>
        <Link href={`/dashboard/workflow/runs/${workflowId}`}>
          <TabsTrigger value="runs" className="w-full">
            Runs
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
};

export default NavigationTabs;
