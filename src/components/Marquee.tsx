import { site } from '../config/site'
import { cx } from '../lib/format'

/** Infinite scrolling strip of brand slang. */
export function Marquee({ className }: { className?: string }) {
  const phrases = [...site.slang, ...site.slang]
  return (
    <div className={cx('glass overflow-hidden rounded-full py-3', className)} aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap pl-10">
        {phrases.map((phrase, index) => (
          <span key={`${phrase}-${index}`} className="display flex items-center gap-10 text-lg font-semibold text-cream">
            {phrase}
            <span className="size-2 rounded-full bg-cream/70" />
          </span>
        ))}
      </div>
    </div>
  )
}
