import { useState } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, Banknote, Minus, Plus, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Price } from '@/components/site/Price'
import { ProductCard } from '@/components/site/ProductCard'
import { WhatsAppIcon } from '@/components/site/WhatsAppIcon'
import { getCategory } from '@/data/categories'
import { getProduct, products } from '@/data/products'
import { useT } from '@/lib/i18n'
import { cdn } from '@/lib/images'
import { orderLink, type CustomerDetails } from '@/lib/order'

export const Route = createFileRoute('/$lang/products/$productId')({
  loader: ({ params }) => {
    const product = getProduct(params.productId)
    if (!product) throw notFound()
    return { product }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    const lang = params.lang === 'ar' ? 'ar' : 'fr'
    return {
      meta: [
        { title: `${loaderData.product.name[lang]} — Kawaii Skin Cosmetics` },
        { name: 'description', content: loaderData.product.description[lang] },
      ],
    }
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
})

function ProductNotFound() {
  const { lang, t } = useT()
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-3xl text-foreground">{t.notFound.title}</h1>
      <p className="mt-3 text-muted-foreground">{t.notFound.text}</p>
      <Button asChild className="mt-8 rounded-full">
        <Link to="/$lang/shop" params={{ lang }}>
          {t.product.back}
        </Link>
      </Button>
    </div>
  )
}

function ProductPage() {
  const { product } = Route.useLoaderData()
  const { lang, t, l } = useT()
  const category = getCategory(product.category)
  const available = product.available !== false
  const [quantity, setQuantity] = useState(1)
  const [customer, setCustomer] = useState<CustomerDetails>({})

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const field = (key: keyof CustomerDetails, label: string, type = 'text', autoComplete?: string) => (
    <div className="space-y-1.5">
      <Label htmlFor={`order-${key}`}>{label}</Label>
      <Input
        id={`order-${key}`}
        type={type}
        autoComplete={autoComplete}
        inputMode={type === 'tel' ? 'tel' : undefined}
        value={customer[key] ?? ''}
        onChange={(e) => setCustomer((c) => ({ ...c, [key]: e.target.value }))}
        className="h-11 bg-background"
      />
    </div>
  )

  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6 sm:py-12">
      <Link
        to="/$lang/shop"
        params={{ lang }}
        search={category ? { category: category.slug } : {}}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
        {t.product.back}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative overflow-hidden rounded-3xl bg-muted lg:sticky lg:top-28 lg:self-start">
          <img
            src={cdn(product.image, 1000)}
            srcSet={`${cdn(product.image, 600)} 600w, ${cdn(product.image, 1000)} 1000w, ${cdn(product.image, 1400)} 1400w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={l(product.name)}
            className="aspect-square size-full object-cover"
          />
          {product.placeholder && (
            <Badge variant="secondary" className="absolute start-4 top-4 bg-background/85 backdrop-blur">
              {t.product.placeholder}
            </Badge>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            {category && (
              <Link
                to="/$lang/shop"
                params={{ lang }}
                search={{ category: category.slug }}
                className="eyebrow hover:underline"
              >
                {l(category.name)}
              </Link>
            )}
            <h1 className="text-4xl leading-tight text-foreground sm:text-5xl">{l(product.name)}</h1>
            <Price value={product.price} className="block text-2xl" />
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">{l(product.description)}</p>

          {available ? (
            <div className="space-y-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium text-foreground" id="qty-label">
                  {t.product.quantity}
                </span>
                <div className="flex items-center rounded-full border border-border" role="group" aria-labelledby="qty-label">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-11 rounded-full"
                    aria-label={t.product.decrease}
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus />
                  </Button>
                  <output className="w-10 text-center text-lg font-medium" aria-live="polite">
                    {quantity}
                  </output>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-11 rounded-full"
                    aria-label={t.product.increase}
                    disabled={quantity >= 20}
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              {product.price != null && (
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">{t.product.total}</span>
                  <Price value={product.price * quantity} className="text-xl" />
                </div>
              )}

              <fieldset className="space-y-4 border-t border-border pt-5">
                <legend className="sr-only">{t.product.formTitle}</legend>
                <div aria-hidden="true">
                  <p className="font-medium text-foreground">{t.product.formTitle}</p>
                  <p className="text-sm text-muted-foreground">{t.product.formHint}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {field('name', t.product.name, 'text', 'name')}
                  {field('phone', t.product.phone, 'tel', 'tel')}
                  {field('wilaya', t.product.wilaya, 'text', 'address-level1')}
                  {field('address', t.product.address, 'text', 'street-address')}
                </div>
              </fieldset>

              <Button asChild size="lg" className="h-13 w-full rounded-full text-base">
                <a
                  href={orderLink(product, lang, quantity, customer)}
                  // Add the page link to the message at click time (the URL is only known in the browser).
                  onClick={(e) => {
                    e.currentTarget.href = orderLink(product, lang, quantity, customer, window.location.href)
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  {t.product.orderWhatsapp}
                </a>
              </Button>
            </div>
          ) : (
            <Button disabled size="lg" variant="secondary" className="h-13 w-full rounded-full">
              {t.product.outOfStock}
            </Button>
          )}

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Banknote className="size-5 text-sage-deep" aria-hidden="true" />
              {t.product.noPayment}
            </li>
            <li className="flex items-center gap-3">
              <Truck className="size-5 text-sage-deep" aria-hidden="true" />
              <Link to="/$lang/delivery" params={{ lang }} className="underline underline-offset-4 hover:text-foreground">
                {t.product.deliveryLink}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl text-foreground">{t.product.related}</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
