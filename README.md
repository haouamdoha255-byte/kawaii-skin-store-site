# Kawaii Skin Cosmetics — online store

A bilingual (French / Arabic) storefront for Kawaii Skin Cosmetics, an Algerian skincare brand. Customers browse products by category and place orders through WhatsApp. There is no online payment: orders are confirmed on WhatsApp and paid on delivery.

## Pages

| Address                        | Page                                                             |
| ------------------------------ | ---------------------------------------------------------------- |
| `/`                            | Redirects to the French site (`/fr`)                             |
| `/fr`, `/ar`                   | Homepage: logo, welcome section, categories, products, how to order |
| `/fr/shop`, `/ar/shop`         | All products, filterable by category (`?category=face-care`)     |
| `/fr/products/<id>`            | Product page: photo, description, price, quantity, WhatsApp order |
| `/fr/about`                    | About us                                                         |
| `/fr/delivery`                 | Delivery and payment information, FAQ                            |
| `/fr/contact`                  | Contact details and a message form that opens WhatsApp           |

Every page exists in French (`/fr/...`) and Arabic (`/ar/...`, right-to-left). The language button in the header switches between them on the same page.

## Updating the store (no coding experience needed)

| What to change                                 | File                         |
| ---------------------------------------------- | ---------------------------- |
| **Products** (name, description, price, photo) | `src/data/products.ts`       |
| **WhatsApp number**, phone, e-mail, social links, opening hours, delivery rates | `src/config/store.ts` |
| Category names and photos                      | `src/data/categories.ts`     |
| Any text on the site (French and Arabic)       | `src/i18n/dictionaries.ts`   |
| Photos                                         | `public/img/`                |

**First steps before launch**

1. Set `whatsappNumber` in `src/config/store.ts` (international format, digits only, e.g. `213555123456`). Until it is set, order buttons open WhatsApp and let the customer choose the contact.
2. Replace the 10 placeholder products in `src/data/products.ts` with your real products. Prices are numbers in Algerian dinars (e.g. `2500`); use `null` to display "price coming soon".
3. Add your phone, e-mail and social links in `src/config/store.ts` — empty values are hidden automatically.
4. Optionally list delivery rates per zone in `deliveryRates` (same file). When the list is empty, the Delivery page explains that fees are confirmed on WhatsApp.

Product photos are resized and converted to WebP automatically by the Netlify Image CDN, so you can upload regular JPG or PNG files.

## Technology

- TanStack Start (React 19, file-based routing, server rendering)
- Tailwind CSS 4 with a sage / ivory / beige theme (`src/styles.css`)
- shadcn/ui components (Radix UI)
- Netlify hosting and Netlify Image CDN
- Fonts: Cormorant Garamond and Jost (French), Amiri and Tajawal (Arabic)

## Run locally

Requires Node 22.13+ or Node 24.

```bash
pnpm install
pnpm dev          # http://localhost:3000
# or, with Netlify features such as the Image CDN:
netlify dev
```
