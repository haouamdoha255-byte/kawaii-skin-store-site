import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'center',
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string
  title: string
  text?: string
  align?: 'center' | 'start'
  as?: 'h1' | 'h2'
  className?: string
}) {
  return (
    <div className={cn('space-y-3', align === 'center' && 'mx-auto max-w-2xl text-center', className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={cn('text-foreground', Tag === 'h1' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl')}>{title}</Tag>
      {text && <p className="leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  )
}
