import { store } from '@/config/store'

/** Builds a wa.me link. Without a configured number, WhatsApp lets the customer pick a chat. */
export function whatsappLink(message: string) {
  const number = store.whatsappNumber.replace(/\D/g, '')
  const text = encodeURIComponent(message)
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`
}

