import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Price } from './Price'
import { WhatsAppIcon } from './WhatsAppIcon'
import type { Product } from '@/data/products'
import { getCategory } from '@/data/categories'
import { useT } from '@/lib/i18n'
import { orderLink } from '@/lib/order'
import { cdn } from '@/lib/images'

export function ProductCard({ product }: { product: Product }) {
  const { lang, t, l } = useT()
  const category = getCategory(product.category)
  const available = product.available !== false
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-shadow hover:shadow-xl hover:shadow-sage-deep/10 motion-reduce:transition-none">
      <Link
        to="/$lang/products/$productId"
        params={{ lang, productId: product.id }}
        className="relative block aspect-[4/5] overflow-hidden bg-muted"
        aria-label={l(product.name)}
      >
        <img
          src={cdn(product.image, 600)}
          srcSet={`${cdn(product.image, 400)} 400w, ${cdn(product.image, 600)} 600w, ${cdn(product.image, 900)} 900w`}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
        />
        <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
          {product.placeholder && (
            <Badge variant="secondary" className="bg-background/85 backdrop-blur">{t.product.placeholder}</Badge>
          )}
          {!available && <Badge className="bg-foreground/80">{t.product.outOfStock}</Badge>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-5">
        {category && <p className="text-[0.7rem] text-sage-deep sm:text-xs">{l(category.name)}</p>}
        <h3 className="font-display text-lg leading-snug text-foreground sm:text-xl">
          <Link to="/$lang/products/$productId" params={{ lang, productId: product.id }} className="hover:underline underline-offset-4">
            {l(product.name)}
          </Link>
        </h3>
        <p className="line-clamp-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">
          {l(product.description)}
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <Price value={product.price} />
          {available ? (
            <Button asChild className="h-10 w-full rounded-full">
              <a href={orderLink(product, lang)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                {t.product.order}
              </a>
            </Button>
          ) : (
            <Button disabled variant="secondary" className="h-10 w-full rounded-full">
              {t.product.outOfStock}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
