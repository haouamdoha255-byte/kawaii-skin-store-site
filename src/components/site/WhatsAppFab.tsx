import { WhatsAppIcon } from './WhatsAppIcon'
import { useT } from '@/lib/i18n'
import { generalLink } from '@/lib/order'

/** Floating WhatsApp button, always reachable with the thumb on phones. */
export function WhatsAppFab() {
  const { lang, t } = useT()
  return (
    <a
      href={generalLink(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.floating}
      className="fixed bottom-5 end-5 z-30 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-sage-deep/25 ring-4 ring-background transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-ring motion-reduce:transition-none"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
