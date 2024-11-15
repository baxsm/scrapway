"use client";

import dynamic from "next/dynamic";
import { FC, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextTopLoader from "nextjs-toploader";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  }
);

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color="orange" showSpinner={false}/>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        storageKey="scrapway"
        enableSystem
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};

export default AppProviders;
