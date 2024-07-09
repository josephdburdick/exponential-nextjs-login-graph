import { AuthProvider } from "@/components/context/AuthContext"
import NavMenu from "@/components/global/NavMenu"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Exponential Assessment",
  description: "UI, Route Handling, and Graph",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased",
        )}
      >
        <AuthProvider>
          <NavMenu />
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
