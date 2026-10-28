import { Minus, Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { cx } from '../../lib/format'

export function Badge({ children, className, tone = 'glass' }: { children: ReactNode; className?: string; tone?: 'glass' | 'cream' | 'brand' }) {
  const tones = {
    glass: 'bg-white/20 text-cream border-white/35',
    cream: 'bg-cream text-brand-dark border-white',
    brand: 'bg-brand text-cream border-brand-light',
  }
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em] backdrop-blur-md',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Eyebrow({
  children,
  className,
  tone = 'cream',
}: {
  children: ReactNode
  className?: string
  tone?: 'cream' | 'cocoa'
}) {
  return (
    <p
      className={cx(
        'font-display text-xs font-semibold uppercase tracking-[0.22em]',
        tone === 'cocoa' ? 'text-brand-dark/85' : 'text-cream/75',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className,
  tone = 'cream',
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
  className?: string
  tone?: 'cream' | 'cocoa'
}) {
  const isCocoa = tone === 'cocoa'
  return (
    <div className={cx('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Eyebrow className="mb-3" tone={isCocoa ? 'cocoa' : 'cream'}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cx(
          'display text-balance text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-5xl',
          isCocoa ? 'text-cocoa' : 'text-cream',
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={cx('mt-4 text-pretty text-base leading-relaxed sm:text-lg', isCocoa ? 'text-cocoa/75' : 'text-cream/85')}>
          {lede}
        </p>
      )}
    </div>
  )
}

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 20,
  size = 'md',
  tone = 'glass',
  label = 'Quantity',
}: {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md'
  tone?: 'glass' | 'cocoa'
  label?: string
}) {
  const dims = size === 'sm' ? 'h-9' : 'h-11'
  const btn = size === 'sm' ? 'size-9' : 'size-11'
  const tones =
    tone === 'cocoa'
      ? 'border-cocoa/15 bg-cocoa/5 text-cocoa'
      : 'border-white/35 bg-white/15 text-cream backdrop-blur-xl'
  return (
    <div className={cx('inline-flex items-center rounded-full border', dims, tones)} role="group" aria-label={label}>
      <button
        type="button"
        className={cx('press grid place-items-center rounded-full hover:bg-white/20 disabled:opacity-40', btn)}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease"
      >
        <Minus className="size-4" strokeWidth={2.5} />
      </button>
      <span className="min-w-6 text-center font-display text-base font-bold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={cx('press grid place-items-center rounded-full hover:bg-white/20 disabled:opacity-40', btn)}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase"
      >
        <Plus className="size-4" strokeWidth={2.5} />
      </button>
    </div>
  )
}

export function Divider({ className }: { className?: string }) {
  return <div className={cx('h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent', className)} />
}
