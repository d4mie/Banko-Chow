import logoColor from '../assets/brand/logo-color.png'
import logoWhite from '../assets/brand/logo-white.png'
import markColor from '../assets/brand/mark-color.png'
import markWhite from '../assets/brand/mark-white.png'
import { cx } from '../lib/format'

interface BrandLogoProps {
  variant?: 'full' | 'mark'
  tone?: 'white' | 'color'
  className?: string
}

const sources = {
  full: { white: logoWhite, color: logoColor },
  mark: { white: markWhite, color: markColor },
}

/** Official Banko Chow wordmark ("full") or the abbreviated "BC" mark. */
export function BrandLogo({ variant = 'full', tone = 'white', className }: BrandLogoProps) {
  return (
    <img
      src={sources[variant][tone]}
      alt="Banko Chow"
      className={cx('block w-auto select-none', className)}
      draggable={false}
      decoding="async"
    />
  )
}
