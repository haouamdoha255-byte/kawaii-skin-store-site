import { createFileRoute } from '@tanstack/react-router'
import { Banknote, Info } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/site/SectionHeading'
import { WhatsAppIcon } from '@/components/site/WhatsAppIcon'
import { store } from '@/config/store'
import { formatPrice, useT } from '@/lib/i18n'
import { generalLink } from '@/lib/order'

export const Route = createFileRoute('/$lang/delivery')({
  head: ({ params }) => ({
    meta: [{ title: params.lang === 'ar' ? 'التوصيل — Kawaii Skin Cosmetics' : 'Livraison — Kawaii Skin Cosmetics' }],
  }),
  component: Delivery,
})

function Delivery() {
  const { lang, t, l } = useT()
  const fee = (v: number | null) => (v == null ? '—' : formatPrice(v, lang))

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading as="h1" eyebrow={t.delivery.eyebrow} title={t.delivery.title} text={t.delivery.lead} />

      <section className="mt-14">
        <h2 className="text-3xl text-foreground">{t.delivery.stepsTitle}</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.delivery.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="grid size-10 place-items-center rounded-full bg-primary font-medium text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl bg-secondary/70 p-7">
          <Banknote className="size-8 text-sage-deep" aria-hidden="true" />
          <h2 className="mt-4 text-3xl text-foreground">{t.delivery.paymentTitle}</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">{t.delivery.paymentText}</p>
        </section>

        <section className="rounded-3xl border border-border bg-card p-7">
          <h2 className="text-3xl text-foreground">{t.delivery.ratesTitle}</h2>
          {store.deliveryRates.length === 0 ? (
            <p className="mt-4 flex gap-3 leading-relaxed text-muted-foreground">
              <Info className="mt-1 size-5 shrink-0 text-sage-deep" aria-hidden="true" />
              {t.delivery.ratesEmpty}
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-start text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-2 text-start font-medium">{t.delivery.zone}</th>
                    <th className="py-2 text-start font-medium">{t.delivery.home}</th>
                    <th className="py-2 text-start font-medium">{t.delivery.desk}</th>
                    <th className="py-2 text-start font-medium">{t.delivery.delay}</th>
                  </tr>
                </thead>
                <tbody>
                  {store.deliveryRates.map((r) => (
                    <tr key={r.zone.fr} className="border-b border-border/60">
                      <td className="py-3 font-medium text-foreground">{l(r.zone)}</td>
                      <td className="py-3" dir="ltr">{fee(r.home)}</td>
                      <td className="py-3" dir="ltr">{fee(r.desk)}</td>
                      <td className="py-3">{l(r.delay)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <section className="mx-auto mt-16 max-w-reading">
        <h2 className="text-center text-3xl text-foreground">{t.delivery.faqTitle}</h2>
        <Accordion type="single" collapsible className="mt-6">
          {t.delivery.faq.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger className="text-start text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="h-12 rounded-full px-7">
            <a href={generalLink(lang)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {t.delivery.cta}
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
