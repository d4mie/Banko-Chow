import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cx } from '../../lib/format'

export type GlassTone = 'default' | 'strong' | 'light' | 'dark'

const toneClass: Record<GlassTone, string> = {
  default: 'glass',
  strong: 'glass-strong',
  light: 'glass-light',
  dark: 'glass-dark',
}

type GlassProps<T extends ElementType> = {
  as?: T
  tone?: GlassTone
  sheen?: boolean
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>

/** Frosted, translucent container. The visual backbone of the Banko Chow UI. */
export function Glass<T extends ElementType = 'div'>({
  as,
  tone = 'default',
  sheen = false,
  className,
  ...rest
}: GlassProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return <Tag className={cx(toneClass[tone], sheen && 'glass-sheen', 'rounded-glass', className)} {...rest} />
}
