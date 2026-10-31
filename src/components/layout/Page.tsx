import { useEffect, type ReactNode } from 'react'
import { site } from '../../config/site'
import { cx } from '../../lib/format'
import { Eyebrow } from '../ui/Primitives'

interface PageProps {
  title: string
  children: ReactNode
  className?: string
}

/** Sets the document title and reserves room for the floating header. */
export function Page({ title, children, className }: PageProps) {
  useEffect(() => {
    document.title = title === site.name ? `${site.name} — Street food with a classy twist` : `${title} · ${site.name}`
  }, [title])

  return <div className={cx('px-safe', className)}>{children}</div>
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-6xl px-4 sm:px-6', className)}>{children}</div>
}

/** Header block used by every inner page: eyebrow, big title and lede. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
}) {
  return (
    <Container className="pt-[calc(var(--sat)+6rem)] sm:pt-[calc(var(--sat)+7.5rem)]">
      <div className="animate-rise max-w-3xl">
        <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
        <h1 className="display text-balance text-4xl font-bold leading-[1] text-cream sm:text-6xl">{title}</h1>
        {lede && <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-cream/85 sm:text-lg">{lede}</p>}
        {children}
      </div>
    </Container>
  )
}
