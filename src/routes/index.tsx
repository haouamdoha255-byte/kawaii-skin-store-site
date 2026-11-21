import { createFileRoute, redirect } from '@tanstack/react-router'
import { defaultLang } from '@/lib/i18n'

// The site lives under /fr and /ar. The bare address opens the default language.
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/$lang', params: { lang: defaultLang } })
  },
})
