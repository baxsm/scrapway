import type { Metadata } from "next";
import AppProviders from "@/components/providers/app-providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Poppins } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Scrapway",
  description:
    "Scrapway allows users to create powerful data scraping workflows and execute them either manually or via cron jobs. With an intuitive UI and support for various tasks such as user interactions, data extraction, storage, and result delivery - you can easily automate scraping operations with minimal effort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl="/sign-in"
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-primary hover:bg-primary/80 text-sm !shadow-none",
        },
      }}
    >
      <html lang="en">
        <body className={cn("font-sans antialiased", poppins.className)}>
          <AppProviders>{children}</AppProviders>
          <Toaster richColors position="bottom-right" closeButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
