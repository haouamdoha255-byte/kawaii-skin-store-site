import type { Localized } from '@/lib/i18n'
import type { CategorySlug } from './categories'

/**
 * PRODUCT CATALOG — this is the only file to edit to add, change or remove products.
 *
 * How to add a product:
 *   1. Put the photo in /public/img/products/ (e.g. /public/img/products/serum-rose.jpg)
 *   2. Copy one block below and fill in each field:
 *      - id:          unique, lowercase, no spaces (used in the page address)
 *      - category:    'face-care' | 'body-care' | 'hair-care' | 'natural-soaps' | 'gift-sets'
 *      - name:        French and Arabic names
 *      - description: French and Arabic descriptions
 *      - price:       price in Algerian dinars as a number (e.g. 2500), or null if not set yet
 *      - image:       path to the photo, starting with /img/
 *      - placeholder: remove this line (or set false) for real products
 *      - available:   set to false to show "Out of stock" and hide the order button
 *
 * The entries below are PLACEHOLDERS — replace them with your real products.
 */
export interface Product {
  id: string
  category: CategorySlug
  name: Localized
  description: Localized
  /** Price in DZD. `null` shows "price coming soon". */
  price: number | null
  image: string
  placeholder?: boolean
  available?: boolean
}

export const products: Product[] = [
  {
    id: 'visage-01',
    category: 'face-care',
    name: { fr: 'Soin du visage — Produit 01', ar: 'العناية بالوجه — المنتج 01' },
    description: {
      fr: 'Emplacement réservé : remplacez ce texte par la description de votre produit (utilisation, contenance, type de peau…).',
      ar: 'مساحة مخصصة: استبدلي هذا النص بوصف منتجك (طريقة الاستعمال، الحجم، نوع البشرة…).',
    },
    price: null,
    image: '/img/face.png',
    placeholder: true,
  },
  {
    id: 'visage-02',
    category: 'face-care',
    name: { fr: 'Soin du visage — Produit 02', ar: 'العناية بالوجه — المنتج 02' },
    description: {
      fr: 'Emplacement réservé : remplacez ce texte par la description de votre produit (utilisation, contenance, type de peau…).',
      ar: 'مساحة مخصصة: استبدلي هذا النص بوصف منتجك (طريقة الاستعمال، الحجم، نوع البشرة…).',
    },
    price: null,
    image: '/img/face.png',
    placeholder: true,
  },
  {
    id: 'corps-01',
    category: 'body-care',
    name: { fr: 'Soin du corps — Produit 01', ar: 'العناية بالجسم — المنتج 01' },
    description: {
      fr: 'Emplacement réservé : remplacez ce texte par la description de votre produit (utilisation, contenance, type de peau…).',
      ar: 'مساحة مخصصة: استبدلي هذا النص بوصف منتجك (طريقة الاستعمال، الحجم، نوع البشرة…).',
    },
    price: null,
    image: '/img/body.png',
    placeholder: true,
  },
  {
    id: 'corps-02',
    category: 'body-care',
    name: { fr: 'Soin du corps — Produit 02', ar: 'العناية بالجسم — المنتج 02' },
    description: {
      fr: 'Emplacement réservé : remplacez ce texte par la description de votre produit (utilisation, contenance, type de peau…).',
      ar: 'مساحة مخصصة: استبدلي هذا النص بوصف منتجك (طريقة الاستعمال، الحجم، نوع البشرة…).',
    },
    price: null,
    image: '/img/body.png',
    placeholder: true,
  },
  {
    id: 'cheveux-01',
    category: 'hair-care',
    name: { fr: 'Soin des cheveux — Produit 01', ar: 'العناية بالشعر — المنتج 01' },
    description: {
      fr: 'Emplacement réservé : remplacez ce texte par la description de votre produit (utilisation, contenance, type de peau…).',
      ar: 'مساحة مخصصة: استبدلي هذا النص بوصف منتجك (طريقة الاستعمال، الحجم، نوع البشرة…).',
    },
    price: null,
    image: '/img/hair.png',
    placeholder: true,
  },
  {
    id: 'cheveux-02',
    category: 'hair-care',
    name: { fr: 'Soin des cheveux — Produit 02', ar: 'العناية بالشعر — المنتج 02' },
    description: {
      fr: 'Emplacement réservé : remplacez ce texte par la description de votre produit (utilisation, contenance, type de peau…).',
      ar: 'مساحة مخصصة: استبدلي هذا النص بوصف منتجك (طريقة الاستعمال، الحجم، نوع البشرة…).',
    },
    price: null,
    image: '/img/hair.png',
    placeholder: true,
  },
  {
    id: 'savon-01',
    category: 'natural-soaps',
    name: { fr: 'Savon naturel — Produit 01', ar: 'صابون طبيعي — المنتج 01' },
    description: {
      fr: 'Emplacement réservé : remplacez ce texte par la description de votre produit (utilisation, contenance, type de peau…).',
      ar: 'مساحة مخصصة: استبدلي هذا النص بوصف منتجك (طريقة الاستعمال، الحجم، نوع البشرة…).',
    },
    price: null,
    image: '/img/soap.png',
    placeholder: true,
  },
  {
    id: 'savon-02',
    category: 'natural-soaps',
    name: { fr: 'Savon naturel — Produit 02', ar: 'صابون طبيعي — المنتج 02' },
    description: {
      fr: 'Emplacement réservé : remplacez ce texte par la description de votre produit (utilisation, contenance, type de peau…).',
      ar: 'مساحة مخصصة: استبدلي هذا النص بوصف منتجك (طريقة الاستعمال، الحجم، نوع البشرة…).',
    },
    price: null,
    image: '/img/soap.png',
    placeholder: true,
  },
  {
    id: 'coffret-01',
    category: 'gift-sets',
    name: { fr: 'Coffret cadeau — Produit 01', ar: 'علبة هدايا — المنتج 01' },
    description: {
      fr: 'Emplacement réservé : remplacez ce texte par la description de votre produit (utilisation, contenance, type de peau…).',
      ar: 'مساحة مخصصة: استبدلي هذا النص بوصف منتجك (طريقة الاستعمال، الحجم، نوع البشرة…).',
    },
    price: null,
    image: '/img/gifts.png',
    placeholder: true,
  },
  {
    id: 'coffret-02',
    category: 'gift-sets',
    name: { fr: 'Coffret cadeau — Produit 02', ar: 'علبة هدايا — المنتج 02' },
    description: {
      fr: 'Emplacement réservé : remplacez ce texte par la description de votre produit (utilisation, contenance, type de peau…).',
      ar: 'مساحة مخصصة: استبدلي هذا النص بوصف منتجك (طريقة الاستعمال، الحجم، نوع البشرة…).',
    },
    price: null,
    image: '/img/gifts.png',
    placeholder: true,
  },
]

export const getProduct = (id: string) => products.find((p) => p.id === id)
export const productsInCategory = (slug: CategorySlug) =>
  products.filter((p) => p.category === slug)
