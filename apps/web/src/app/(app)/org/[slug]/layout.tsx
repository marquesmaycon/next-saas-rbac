import { Header } from '@/components/header'
import Tabs from '@/components/tabs'

export default async function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="space-y-4 px-4 py-4">
      <Header />
      <Tabs />
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        {children}
      </main>
    </div>
  )
}
