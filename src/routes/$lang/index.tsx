import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Banknote, MessageCircleHeart, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/site/Logo'
import { ProductCard } from '@/components/site/ProductCard'
import { SectionHeading } from '@/components/site/SectionHeading'
import { WhatsAppIcon } from '@/components/site/WhatsAppIcon'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { useT } from '@/lib/i18n'
import { cdn } from '@/lib/images'
import { generalLink } from '@/lib/order'

export const Route = createFileRoute('/$lang/')({
  component: Home,
})

const promiseIcons = [MessageCircleHeart, Banknote, Truck]

// One product from each category is featured on the homepage.
const featured = categories
  .map((c) => products.find((p) => p.category === c.slug))
  .filter((p) => p !== undefined)

function Home() {
  const { lang, t, l } = useT()
  const arrow = <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[46svh] min-h-72 lg:absolute lg:inset-0 lg:h-auto">
          <img
            src={cdn('/img/hero.png', 1600)}
            srcSet={`${cdn('/img/hero.png', 800)} 800w, ${cdn('/img/hero.png', 1600)} 1600w, ${cdn('/img/hero.png', 2400)} 2400w`}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            className="size-full object-cover object-[72%_center] rtl:-scale-x-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/75 lg:to-transparent rtl:lg:bg-gradient-to-l" />
        </div>
        <div className="relative mx-auto max-w-content px-4 pb-14 sm:px-6 lg:py-28 xl:py-36">
          <div className="-mt-16 max-w-xl space-y-6 lg:mt-0">
            <Logo size="lg" />
            <p className="eyebrow pt-2">{t.home.eyebrow}</p>
            <h1 className="text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">{t.home.title}</h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t.home.welcome}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full px-7 text-base">
                <Link to="/$lang/shop" params={{ lang }}>
                  {t.home.shopCta}
                  {arrow}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-primary/40 bg-background/70 px-7 text-base">
                <a href={generalLink(lang)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  {t.home.whatsappCta}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="border-y border-border/70 bg-secondary/50">
        <ul className="mx-auto grid max-w-content gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {t.home.promises.map((p, i) => {
            const Icon = promiseIcons[i]
            return (
              <li key={p.title} className="flex items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-background text-sage-deep ring-1 ring-border">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-medium text-foreground">{p.title}</span>
                  <span className="block text-sm text-muted-foreground">{p.text}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6">
        <SectionHeading eyebrow={t.home.categoriesEyebrow} title={t.home.categoriesTitle} />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
          {categories.map((c, i) => (
            <li key={c.slug} className={i === 0 ? 'col-span-2 lg:col-span-1' : ''}>
              <Link
                to="/$lang/shop"
                params={{ lang }}
                search={{ category: c.slug }}
                className={
                  'group relative block overflow-hidden rounded-2xl bg-muted ' +
                  (i === 0 ? 'aspect-[16/10] lg:aspect-[4/5]' : 'aspect-[4/5]')
                }
              >
                <img
                  src={cdn(c.image, 600)}
                  srcSet={`${cdn(c.image, 400)} 400w, ${cdn(c.image, 800)} 800w`}
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 space-y-1 p-4 text-primary-foreground sm:p-5">
                  <h3 className="font-display text-xl sm:text-2xl">{l(c.name)}</h3>
                  <p className="hidden text-sm text-primary-foreground/85 sm:block">{l(c.tagline)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured products */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading eyebrow={t.home.featuredEyebrow} title={t.home.featuredTitle} align="start" />
            <Link
              to="/$lang/shop"
              params={{ lang }}
              className="inline-flex items-center gap-2 text-sm font-medium text-sage-deep underline-offset-4 hover:underline"
            >
              {t.home.viewAll}
              {arrow}
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6">
        <SectionHeading eyebrow={t.home.howEyebrow} title={t.home.howTitle} />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {t.home.steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-border bg-card p-7">
              <span className="font-display text-5xl text-sage/60" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-2xl text-foreground">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-content px-4 sm:px-6">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-secondary/60 md:grid-cols-2">
          <img
            src={cdn('/img/about.png', 900)}
            alt=""
            loading="lazy"
            className="aspect-[4/3] size-full object-cover md:aspect-auto md:h-full"
          />
          <div className="space-y-5 p-7 pt-0 md:p-12">
            <p className="eyebrow">{t.home.aboutEyebrow}</p>
            <h2 className="text-3xl text-foreground sm:text-4xl">{t.home.aboutTitle}</h2>
            <p className="leading-relaxed text-muted-foreground">{t.home.aboutText}</p>
            <Button asChild variant="outline" className="rounded-full border-primary/40 bg-transparent">
              <Link to="/$lang/about" params={{ lang }}>
                {t.home.aboutCta}
                {arrow}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-content px-4 pt-20 sm:px-6">
        <div className="grain relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h2 className="text-3xl sm:text-4xl">{t.home.finalTitle}</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/85">{t.home.finalText}</p>
          <Button asChild size="lg" variant="secondary" className="mt-8 h-12 rounded-full px-7 text-base">
            <a href={generalLink(lang)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {t.home.whatsappCta}
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
