import { Link } from '@tanstack/react-router'
import { Logo } from './Logo'
import { categories } from '@/data/categories'
import { useT } from '@/lib/i18n'
import { store } from '@/config/store'

export function Footer() {
  const { lang, t, l } = useT()
  const linkClass = 'text-sm text-muted-foreground transition-colors hover:text-foreground'
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          <p className="text-xs text-sage-deep">{t.footer.order}</p>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold text-foreground">{t.footer.explore}</h2>
          <ul className="space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/$lang/shop" params={{ lang }} search={{ category: c.slug }} className={linkClass}>
                  {l(c.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold text-foreground">{t.footer.help}</h2>
          <ul className="space-y-2.5">
            <li>
              <Link to="/$lang/about" params={{ lang }} className={linkClass}>{t.nav.about}</Link>
            </li>
            <li>
              <Link to="/$lang/delivery" params={{ lang }} className={linkClass}>{t.nav.delivery}</Link>
            </li>
            <li>
              <Link to="/$lang/contact" params={{ lang }} className={linkClass}>{t.nav.contact}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <p className="mx-auto max-w-content px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {store.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
