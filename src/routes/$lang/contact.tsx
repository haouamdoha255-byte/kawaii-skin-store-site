import { useState, type FormEvent } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Camera, Clock, Globe, Mail, MapPin, Phone, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SectionHeading } from '@/components/site/SectionHeading'
import { WhatsAppIcon } from '@/components/site/WhatsAppIcon'
import { store } from '@/config/store'
import { useT } from '@/lib/i18n'
import { generalLink } from '@/lib/order'
import { whatsappLink } from '@/lib/whatsapp'

export const Route = createFileRoute('/$lang/contact')({
  head: ({ params }) => ({
    meta: [{ title: params.lang === 'ar' ? 'اتصلي بنا — Kawaii Skin Cosmetics' : 'Contact — Kawaii Skin Cosmetics' }],
  }),
  component: Contact,
})

function Contact() {
  const { lang, t, l } = useT()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const channels = [
    store.phone && { icon: Phone, label: t.contact.phone, value: store.phone, href: `tel:${store.phone.replace(/\s/g, '')}`, ltr: true },
    store.email && { icon: Mail, label: t.contact.email, value: store.email, href: `mailto:${store.email}`, ltr: true },
    store.instagram && { icon: Camera, label: t.contact.instagram, value: store.instagram.replace(/^https?:\/\/(www\.)?/, ''), href: store.instagram, ltr: true },
    store.facebook && { icon: Globe, label: t.contact.facebook, value: store.facebook.replace(/^https?:\/\/(www\.)?/, ''), href: store.facebook, ltr: true },
    store.tiktok && { icon: Video, label: t.contact.tiktok, value: store.tiktok.replace(/^https?:\/\/(www\.)?/, ''), href: store.tiktok, ltr: true },
    { icon: MapPin, label: t.contact.location, value: l(store.city) },
    l(store.hours) && { icon: Clock, label: t.contact.hours, value: l(store.hours) },
  ].filter(Boolean) as Array<{ icon: typeof Phone; label: string; value: string; href?: string; ltr?: boolean }>

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim()) {
      setError(true)
      return
    }
    const text = [t.whatsapp.greeting, '', message.trim(), name.trim() && `\n— ${name.trim()}`].filter(Boolean).join('\n')
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading as="h1" eyebrow={t.contact.eyebrow} title={t.contact.title} text={t.contact.lead} />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <div className="grain rounded-3xl bg-primary p-7 text-primary-foreground">
            <WhatsAppIcon className="size-9" />
            <h2 className="mt-4 text-3xl">{t.contact.whatsapp}</h2>
            <p className="mt-1 text-primary-foreground/85">{t.contact.whatsappText}</p>
            {store.whatsappNumber && (
              <p dir="ltr" className="mt-3 text-lg font-medium rtl:text-end">
                +{store.whatsappNumber}
              </p>
            )}
            <Button asChild variant="secondary" size="lg" className="mt-6 h-12 w-full rounded-full sm:w-auto">
              <a href={generalLink(lang)} target="_blank" rel="noopener noreferrer">
                {t.contact.whatsappCta}
              </a>
            </Button>
          </div>
          <ul className="divide-y divide-border rounded-3xl border border-border bg-card">
            {channels.map(({ icon: Icon, label, value, href, ltr }) => (
              <li key={label} className="flex items-center gap-4 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-sage-deep">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted-foreground">{label}</span>
                  {href ? (
                    <a href={href} dir={ltr ? 'ltr' : undefined} className="block truncate font-medium text-foreground hover:underline" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      {value}
                    </a>
                  ) : (
                    <span className="block font-medium text-foreground">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div>
            <h2 className="text-3xl text-foreground">{t.contact.formTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.contact.formHint}</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact-name">{t.contact.name}</Label>
            <Input id="contact-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="h-11 bg-background" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact-message">{t.contact.message}</Label>
            <Textarea
              id="contact-message"
              rows={6}
              value={message}
              aria-invalid={error || undefined}
              aria-describedby={error ? 'contact-error' : undefined}
              onChange={(e) => {
                setMessage(e.target.value)
                if (error) setError(false)
              }}
              className="bg-background"
            />
            {error && (
              <p id="contact-error" role="alert" className="text-sm text-destructive">
                {t.contact.required}
              </p>
            )}
          </div>
          <Button type="submit" size="lg" className="h-12 w-full rounded-full text-base">
            <WhatsAppIcon />
            {t.contact.send}
          </Button>
        </form>
      </div>
    </div>
  )
}
