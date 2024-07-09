import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Exponential Assessment",
  description: "UI, Route Handling, and Graph",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
      </body>
    </html>
  );
}
