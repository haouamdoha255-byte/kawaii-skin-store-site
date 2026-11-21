import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { WhatsAppFab } from '@/components/site/WhatsAppFab'
import { isLang } from '@/lib/i18n'

export const Route = createFileRoute('/$lang')({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound()
  },
  component: SiteLayout,
})

function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
