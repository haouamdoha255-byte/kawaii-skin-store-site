import type { Localized } from '@/lib/i18n'

export type CategorySlug = 'face-care' | 'body-care' | 'hair-care' | 'natural-soaps' | 'gift-sets'

export interface Category {
  slug: CategorySlug
  name: Localized
  tagline: Localized
  image: string
}

/** The five product categories, in the order they appear on the site. */
export const categories: Category[] = [
  {
    slug: 'face-care',
    name: { fr: 'Soins du visage', ar: 'العناية بالوجه' },
    tagline: { fr: 'Des rituels doux pour un teint lumineux', ar: 'طقوس لطيفة لبشرة مشرقة' },
    image: '/img/face.png',
  },
  {
    slug: 'body-care',
    name: { fr: 'Soins du corps', ar: 'العناية بالجسم' },
    tagline: { fr: 'Douceur et confort au quotidien', ar: 'نعومة وراحة كل يوم' },
    image: '/img/body.png',
  },
  {
    slug: 'hair-care',
    name: { fr: 'Soins des cheveux', ar: 'العناية بالشعر' },
    tagline: { fr: 'Prendre soin de vos longueurs', ar: 'اهتمام خاص بشعرك' },
    image: '/img/hair.png',
  },
  {
    slug: 'natural-soaps',
    name: { fr: 'Savons naturels', ar: 'صابون طبيعي' },
    tagline: { fr: 'L’essentiel, avec simplicité', ar: 'البساطة في أجمل صورها' },
    image: '/img/soap.png',
  },
  {
    slug: 'gift-sets',
    name: { fr: 'Coffrets cadeaux', ar: 'علب الهدايا' },
    tagline: { fr: 'Pour offrir — ou se faire plaisir', ar: 'هدية لمن تحبين أو لنفسك' },
    image: '/img/gifts.png',
  },
]

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug)
