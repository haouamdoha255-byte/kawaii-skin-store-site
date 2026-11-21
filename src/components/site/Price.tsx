import { formatPrice, useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function Price({ value, className }: { value: number | null; className?: string }) {
  const { lang, t } = useT()
  if (value == null)
    return <span className={cn('text-sm italic text-muted-foreground', className)}>{t.product.priceSoon}</span>
  return (
    <span dir="ltr" className={cn('font-medium text-foreground', className)}>
      {formatPrice(value, lang)}
    </span>
  )
}
