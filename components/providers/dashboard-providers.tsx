"use client";

import { FC, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface DashboardProvidersProps {
  children: ReactNode;
}

const DashboardProviders: FC<DashboardProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  );
};

export default DashboardProviders;
