import type { Metadata } from 'next'
import './globals.css'

import { cn } from '@/lib/utils'
import { AuthProvider } from '@/components/context/AuthContext'
import NavMenu from '@/components/global/NavMenu'

export const metadata: Metadata = {
  title: 'Exponential Assessment',
  description: 'UI, Route Handling, and Graph',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <AuthProvider>
          <NavMenu />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
