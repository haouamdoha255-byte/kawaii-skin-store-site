import { Link, createFileRoute } from '@tanstack/react-router'
import { Flower2, HeartHandshake, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/site/SectionHeading'
import { useT } from '@/lib/i18n'
import { cdn } from '@/lib/images'

export const Route = createFileRoute('/$lang/about')({
  head: ({ params }) => ({
    meta: [{ title: params.lang === 'ar' ? 'من نحن — Kawaii Skin Cosmetics' : 'À propos — Kawaii Skin Cosmetics' }],
  }),
  component: About,
})

const valueIcons = [Flower2, Sparkles, HeartHandshake]

function About() {
  const { lang, t } = useT()
  return (
    <>
      <section className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16">
        <SectionHeading as="h1" eyebrow={t.about.eyebrow} title={t.about.title} text={t.about.lead} />
      </section>

      <section className="mx-auto grid max-w-content items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
        <img
          src={cdn('/img/about.png', 900)}
          srcSet={`${cdn('/img/about.png', 600)} 600w, ${cdn('/img/about.png', 900)} 900w, ${cdn('/img/about.png', 1300)} 1300w`}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt=""
          className="aspect-[4/5] w-full rounded-3xl object-cover"
        />
        <div className="space-y-5">
          <h2 className="text-3xl text-foreground sm:text-4xl">{t.about.storyTitle}</h2>
          {t.about.story.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-20 sm:px-6">
        <SectionHeading title={t.about.valuesTitle} />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {t.about.values.map((v, i) => {
            const Icon = valueIcons[i]
            return (
              <li key={v.title} className="rounded-2xl border border-border bg-card p-7 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-sage-deep">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-2xl text-foreground">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{v.text}</p>
              </li>
            )
          })}
        </ul>
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="h-12 rounded-full px-7">
            <Link to="/$lang/shop" params={{ lang }}>
              {t.about.cta}
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
