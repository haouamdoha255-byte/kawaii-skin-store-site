import { cn } from '@/lib/utils'

/** Brand mark: a monogram "K" framed by two sage leaves. Replace with your own logo file if you have one. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn('size-10', className)}>
      <circle cx="32" cy="32" r="30" fill="var(--ivory)" stroke="var(--gold)" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke="var(--sage)" strokeWidth="0.6" opacity="0.7" />
      <path
        d="M14 40c2-9 8-14 15-15-3 5-7 10-15 15Z"
        fill="var(--sage)"
        opacity="0.85"
      />
      <path
        d="M50 40c-2-9-8-14-15-15 3 5 7 10 15 15Z"
        fill="var(--sage)"
        opacity="0.55"
      />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="28"
        fontStyle="italic"
        fontWeight="500"
        fill="var(--sage-deep)"
      >
        K
      </text>
    </svg>
  )
}

export function Logo({ className, size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  return (
    <span dir="ltr" className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={size === 'lg' ? 'size-20 sm:size-24' : 'size-10'} />
      <span className="flex flex-col leading-none">
        <span
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          className={cn(
            'font-medium text-foreground',
            size === 'lg' ? 'text-4xl sm:text-5xl' : 'text-xl',
          )}
        >
          Kawaii Skin
        </span>
        <span
          style={{ fontFamily: "'Jost', sans-serif" }}
          className={cn(
            'uppercase text-sage-deep',
            size === 'lg' ? 'mt-2 text-xs tracking-[0.5em]' : 'mt-1 text-[0.6rem] tracking-[0.42em]',
          )}
        >
          Cosmetics
        </span>
      </span>
    </span>
  )
}
