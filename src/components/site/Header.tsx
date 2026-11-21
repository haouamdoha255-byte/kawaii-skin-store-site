import { useState } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { Languages, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from './Logo'
import { WhatsAppIcon } from './WhatsAppIcon'
import { useT, type Lang } from '@/lib/i18n'
import { generalLink } from '@/lib/order'

const navItems = [
  { to: '/$lang', key: 'home', exact: true },
  { to: '/$lang/shop', key: 'shop' },
  { to: '/$lang/about', key: 'about' },
  { to: '/$lang/delivery', key: 'delivery' },
  { to: '/$lang/contact', key: 'contact' },
] as const

function LanguageSwitch({ className }: { className?: string }) {
  const { lang, t } = useT()
  const navigate = useNavigate()
  const href = useRouterState({ select: (s) => s.location.href })
  const other: Lang = lang === 'fr' ? 'ar' : 'fr'
  const target = href.replace(/^\/(fr|ar)(?=\/|\?|#|$)/, `/${other}`)
  return (
    <a
      href={target}
      hrefLang={other}
      lang={other}
      aria-label={t.nav.switchLabel}
      onClick={(e) => {
        e.preventDefault()
        void navigate({ href: target })
      }}
      className={
        'inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent motion-reduce:transition-none ' +
        (className ?? '')
      }
    >
      <Languages className="size-4 text-sage-deep" aria-hidden="true" />
      {t.nav.switchTo}
    </a>
  )
}

export function Header() {
  const { lang, t } = useT()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link to="/$lang" params={{ lang }} aria-label="Kawaii Skin Cosmetics" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={t.nav.menu} className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              params={{ lang }}
              activeOptions={{ exact: 'exact' in item }}
              className="rounded-full px-4 py-2 text-[0.95rem] text-foreground/80 transition-colors hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground motion-reduce:transition-none"
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <a href={generalLink(lang)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t.nav.openMenu}>
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={lang === 'ar' ? 'left' : 'right'}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="w-[85%] max-w-sm bg-background"
            >
              <SheetHeader className="border-b border-border">
                <SheetTitle className="sr-only">{t.nav.menu}</SheetTitle>
                <SheetDescription className="sr-only">Kawaii Skin Cosmetics</SheetDescription>
                <Logo />
              </SheetHeader>
              <nav aria-label={t.nav.menu} className="flex flex-col px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.to}
                    params={{ lang }}
                    activeOptions={{ exact: 'exact' in item }}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/60 py-4 font-display text-2xl text-foreground data-[status=active]:text-sage-deep"
                  >
                    {t.nav[item.key]}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button asChild size="lg" className="h-12 w-full rounded-full">
                  <a href={generalLink(lang)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    {t.home.whatsappCta}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
