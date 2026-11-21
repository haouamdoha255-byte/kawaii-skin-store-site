# AGENTS.md

Guide for developers and AI agents working on this codebase.

## Project overview

Kawaii Skin Cosmetics is a bilingual (French / Arabic) storefront for an Algerian skincare brand. It is a content-only site: there is no database, no cart and no online payment. Every "order" button opens WhatsApp with a pre-filled message (product, quantity, price, optional customer name / phone / wilaya / address). The product owner edits products and contact details in plain TypeScript data files.

The owner explicitly asked for **no fake products, prices, certifications or ingredients**. The catalog contains clearly labelled placeholders (`placeholder: true`, `price: null`). Never invent product data, delivery fees, delays, certifications or claims about ingredients; keep marketing copy generic.

## Tech stack

TanStack Start (React 19, TanStack Router), Vite 8, Tailwind CSS 4, shadcn/ui (Radix), lucide-react icons, deployed on Netlify with `@netlify/vite-plugin-tanstack-start`. Images go through the Netlify Image CDN.

## Directory structure

```
public/img/                  Brand and category photos (hero, about, face, body, hair, soap, gifts)
public/favicon.svg           Logo mark favicon
src/config/store.ts          WhatsApp number, phone, e-mail, socials, hours, delivery rates
src/data/categories.ts       The 5 categories (slug, FR/AR name and tagline, image)
src/data/products.ts         Product catalog — the single source of products
src/i18n/dictionaries.ts     All UI text, `fr` object plus `ar: Dictionary` (type-checked to match)
src/lib/i18n.ts              Lang type, useLang/useT hooks, formatPrice (DZD → "2 500 DA" / "2 500 دج")
src/lib/order.ts             Builds WhatsApp order and general-enquiry links
src/lib/whatsapp.ts          wa.me link builder (falls back to number-less link when unset)
src/lib/images.ts            cdn(src, width) → /.netlify/images URL
src/components/site/         Logo (SVG), Header (nav, language switch, mobile Sheet), Footer,
                             ProductCard, Price, SectionHeading, WhatsAppFab, WhatsAppIcon
src/components/ui/           shadcn/ui primitives
src/components/error-pages.tsx  Localized 404 / error pages
src/routes/__root.tsx        HTML shell; sets <html lang dir> from the URL, loads Google Fonts
src/routes/index.tsx         Redirects / → /fr
src/routes/$lang/route.tsx   Validates lang (fr|ar, else 404) and renders Header/Footer/FAB layout
src/routes/$lang/index.tsx   Homepage
src/routes/$lang/shop.tsx    Catalog with ?category= filter (validated search param)
src/routes/$lang/products/$productId.tsx  Product page with quantity + optional customer details
src/routes/$lang/about.tsx | contact.tsx | delivery.tsx
```

## Key decisions

- **Language in the URL** (`/fr/...`, `/ar/...`) rather than localStorage, so server-rendered HTML has the right `lang`/`dir` with no flash, and each language is shareable/indexable. `useLang()` reads the first path segment, so it also works in the root shell and error pages.
- **RTL**: use logical utilities (`start-*`, `end-*`, `text-start`, `ms-*`) and `rtl:` variants (e.g. `rtl:rotate-180` for arrows, `rtl:-scale-x-100` on the hero photo). `[dir='rtl']` swaps the font variables to Arabic fonts first.
- **Prices**: `number | null` in DZD. Format only through `formatPrice` / `<Price>`; always render inside `dir="ltr"`.
- **Theme**: colors are CSS variables in `src/styles.css` (`--ivory`, `--beige`, `--sand`, `--sage`, `--sage-deep`, `--gold`, mapped to shadcn tokens). Use token classes (`bg-primary`, `text-sage-deep`, `bg-secondary`), never raw colors.
- **Typography**: headings use `font-display` / h1–h3 base styles (Cormorant Garamond / Amiri); body uses Jost / Tajawal.
- **Images**: always reference `/img/...` via `cdn()` with a `srcSet`; never ship the originals directly.
- **No backend**: if a future feature needs persistence (e.g. storing orders, admin product editor), use Netlify Database via TanStack Start server functions — not local JSON files.

## Adding text

Add the key to the `fr` object in `src/i18n/dictionaries.ts`; TypeScript then requires the same key in `ar`. Access it with `const { t } = useT()`. For bilingual data fields use the `Localized` type (`{ fr, ar }`) and `l(value)`.

## Conventions

- Components PascalCase, utilities camelCase, imports via `@/`.
- Typed links: `<Link to="/$lang/shop" params={{ lang }} search={{ category }}>`.
- `noUnusedLocals` is on — remove unused imports.
- lucide-react v1 has no brand icons (Instagram, Facebook…); use generic icons or inline SVG.
