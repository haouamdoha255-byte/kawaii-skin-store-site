/**
 * STORE SETTINGS — edit this file to update your contact details.
 *
 * WhatsApp number: international format, digits only, without "+" or spaces.
 * Example for an Algerian mobile 0555 12 34 56  →  '213555123456'
 * While it is empty, the order buttons open WhatsApp and let the customer pick a contact.
 */
export const store = {
  name: 'Kawaii Skin Cosmetics',
  shortName: 'Kawaii Skin',

  whatsappNumber: '',

  /** Displayed on the Contact page. Leave a value empty ('') to hide it. */
  phone: '',
  email: '',
  instagram: '', // full URL, e.g. 'https://instagram.com/yourbrand'
  facebook: '', // full URL
  tiktok: '', // full URL
  city: { fr: 'Algérie', ar: 'الجزائر' },

  /** Opening hours shown on the Contact page. Leave both empty to hide. */
  hours: { fr: '', ar: '' },

  /**
   * Delivery rates shown on the Delivery page.
   * Leave the list empty to tell customers that fees are confirmed on WhatsApp.
   * Example: { zone: { fr: 'Alger', ar: 'الجزائر العاصمة' }, home: 400, desk: 300, delay: { fr: '24 à 48 h', ar: '24 إلى 48 ساعة' } }
   */
  deliveryRates: [] as Array<{
    zone: { fr: string; ar: string }
    home: number | null
    desk: number | null
    delay: { fr: string; ar: string }
  }>,
}
