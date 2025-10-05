import './globals.css'

import type { Metadata } from 'next'

import { Providers } from '@/providers'

export const metadata: Metadata = {
  title: 'Saas NextJS RBAC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
