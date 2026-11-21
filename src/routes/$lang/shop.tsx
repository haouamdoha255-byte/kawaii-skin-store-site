import { Link, createFileRoute } from '@tanstack/react-router'
import { PackageOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/site/ProductCard'
import { SectionHeading } from '@/components/site/SectionHeading'
import { categories, getCategory, type CategorySlug } from '@/data/categories'
import { products } from '@/data/products'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/$lang/shop')({
  validateSearch: (search: Record<string, unknown>): { category?: CategorySlug } => {
    const category = getCategory(String(search.category ?? ''))
    return category ? { category: category.slug } : {}
  },
  head: ({ params }) => ({
    meta: [{ title: params.lang === 'ar' ? 'المتجر — Kawaii Skin Cosmetics' : 'Boutique — Kawaii Skin Cosmetics' }],
  }),
  component: Shop,
})

function Shop() {
  const { lang, t, l } = useT()
  const { category } = Route.useSearch()
  const active = category ? getCategory(category) : undefined
  const list = category ? products.filter((p) => p.category === category) : products

  const pill = (isActive: boolean) =>
    cn(
      'shrink-0 rounded-full border px-4 py-2 text-sm transition-colors motion-reduce:transition-none',
      isActive
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border bg-card text-foreground/80 hover:border-primary/50 hover:text-foreground',
    )

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        as="h1"
        eyebrow={t.shop.eyebrow}
        title={active ? l(active.name) : t.shop.title}
        text={active ? l(active.tagline) : t.shop.intro}
      />

      <nav aria-label={t.shop.eyebrow} className="-mx-4 mt-10 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 sm:flex-wrap sm:justify-center">
          <li>
            <Link to="/$lang/shop" params={{ lang }} search={{}} className={pill(!category)} aria-current={!category ? 'page' : undefined}>
              {t.shop.all}
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                to="/$lang/shop"
                params={{ lang }}
                search={{ category: c.slug }}
                className={pill(category === c.slug)}
                aria-current={category === c.slug ? 'page' : undefined}
              >
                {l(c.name)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {t.shop.count(list.length)}
      </p>

      {list.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <PackageOpen className="size-10 text-sage" aria-hidden="true" />
          <p className="text-muted-foreground">{t.shop.empty}</p>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/$lang/shop" params={{ lang }} search={{}}>
              {t.shop.emptyCta}
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
