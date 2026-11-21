import type { Product } from '@/data/products'
import { dictionaries } from '@/i18n/dictionaries'
import { formatPrice, type Lang } from '@/lib/i18n'
import { whatsappLink } from '@/lib/whatsapp'

export interface CustomerDetails {
  name?: string
  phone?: string
  wilaya?: string
  address?: string
}

/** Builds the pre-filled WhatsApp order message for a product. */
export function orderLink(
  product: Product,
  lang: Lang,
  quantity = 1,
  customer: CustomerDetails = {},
  pageUrl?: string,
) {
  const w = dictionaries[lang].whatsapp
  const lines = [
    `${w.greeting} ${w.wantOrder}`,
    '',
    `• ${w.product} : ${product.name[lang]}`,
    `• ${w.quantity} : ${quantity}`,
  ]
  if (product.price != null) lines.push(`• ${w.price} : ${formatPrice(product.price * quantity, lang)}`)
  if (pageUrl) lines.push(`• ${w.link} : ${pageUrl}`)

  const extra: Array<[string, string | undefined]> = [
    [w.name, customer.name],
    [w.phone, customer.phone],
    [w.wilaya, customer.wilaya],
    [w.address, customer.address],
  ]
  const filled = extra.filter(([, v]) => v && v.trim())
  if (filled.length) {
    lines.push('')
    filled.forEach(([k, v]) => lines.push(`${k} : ${v!.trim()}`))
  }
  lines.push('', w.thanks)
  return whatsappLink(lines.join('\n'))
}

export const generalLink = (lang: Lang) => whatsappLink(dictionaries[lang].whatsapp.general)
