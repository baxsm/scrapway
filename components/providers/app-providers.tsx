"use client";

import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";
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
  return (
    <>
      <NextTopLoader color="orange" showSpinner={false} />
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        storageKey="scrapway"
        enableSystem
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </>
  );
};

export default AppProviders;
