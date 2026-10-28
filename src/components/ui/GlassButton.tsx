import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cx } from '../../lib/format'

export type ButtonVariant = 'glass' | 'solid' | 'ghost' | 'dark'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'press inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-wide select-none whitespace-nowrap outline-none focus-visible:ring-4 focus-visible:ring-white/40 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<ButtonVariant, string> = {
  glass:
    'text-cream border border-white/35 bg-white/15 shadow-glass-sm backdrop-blur-xl hover:bg-white/25 hover:border-white/50 active:bg-white/30',
  solid: 'text-brand-dark bg-cream border border-white shadow-float hover:bg-white',
  ghost: 'text-cream border border-transparent hover:bg-white/10 active:bg-white/15',
  dark: 'text-cream bg-cocoa/45 border border-white/15 backdrop-blur-xl hover:bg-cocoa/60',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-13 px-7 text-base',
}

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children?: ReactNode
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined }
type ButtonAsLink = CommonProps & Omit<LinkProps, 'className'> & { to: LinkProps['to']; href?: undefined }
type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }

export type GlassButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

/** Pill button with translucent glass styling. Renders a router Link, anchor or button. */
export function GlassButton(props: GlassButtonProps) {
  const { variant = 'glass', size = 'md', className, children } = props
  const classes = cx(base, variants[variant], sizes[size], className)

  if ('to' in props && props.to !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    return (
      <Link className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if ('href' in props && props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    )
  }
  const { variant: _v, size: _s, className: _c, children: _ch, type, ...rest } = props as ButtonAsButton
  return (
    <button type={type ?? 'button'} className={classes} {...rest}>
      {children}
    </button>
  )
}
