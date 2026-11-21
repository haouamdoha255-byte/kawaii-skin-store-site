import { useRouterState } from '@tanstack/react-router'
import { dictionaries, type Dictionary } from '@/i18n/dictionaries'

export const languages = ['fr', 'ar'] as const
export type Lang = (typeof languages)[number]
export type Localized = Record<Lang, string>

export const defaultLang: Lang = 'fr'

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && (languages as readonly string[]).includes(value)

export const dirFor = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr')

/** Reads the language from the first URL segment (/fr/... or /ar/...). */
export function useLang(): Lang {
  const segment = useRouterState({
    select: (s) => s.location.pathname.split('/')[1],
  })
  return isLang(segment) ? segment : defaultLang
}

export function useT(): { lang: Lang; t: Dictionary; l: (v: Localized) => string } {
  const lang = useLang()
  return { lang, t: dictionaries[lang], l: (v) => v[lang] }
}

export function formatPrice(price: number, lang: Lang) {
  // Western digits in both languages, as commonly used for prices in Algeria.
  const n = new Intl.NumberFormat('fr-DZ', { maximumFractionDigits: 0 }).format(price)
  return lang === 'ar' ? `${n} دج` : `${n} DA`
}
