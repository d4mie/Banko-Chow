import { Plus } from 'lucide-react'
import type { MenuItem } from '../../data/menu'
import { cx, formatNaira } from '../../lib/format'
import { Badge } from '../ui/Primitives'

interface MenuItemCardProps {
  item: MenuItem
  onSelect: (item: MenuItem) => void
  /** Compact layout for lists without photos (drinks, extras). */
  compact?: boolean
  className?: string
}

export function MenuItemCard({ item, onSelect, compact = false, className }: MenuItemCardProps) {
  if (compact || !item.image) {
    return (
      <button
        type="button"
        onClick={() => onSelect(item)}
        className={cx(
          'press glass group flex w-full items-center gap-4 rounded-3xl p-4 text-left hover:bg-white/20',
          className,
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="display text-xl font-bold text-cream">{item.name}</h3>
            {item.badge && <Badge>{item.badge}</Badge>}
          </div>
          <p className="mt-0.5 truncate text-sm text-cream/80">{item.tagline}</p>
        </div>
        <p className="display text-lg font-bold text-cream">{formatNaira(item.price)}</p>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-brand-dark shadow-float transition-transform group-hover:scale-105">
          <Plus className="size-5" strokeWidth={2.6} />
        </span>
      </button>
    )
  }

  return (
    <article
      className={cx(
        'glass-light group relative flex flex-col overflow-hidden rounded-[2rem] transition-transform duration-300 hover:-translate-y-1',
        className,
      )}
    >
      <button type="button" onClick={() => onSelect(item)} className="relative block aspect-[4/3] w-full overflow-hidden text-left">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {item.badge && <Badge tone="cream" className="absolute left-4 top-4 shadow-float">{item.badge}</Badge>}
        <span className="absolute bottom-4 right-4 rounded-full border border-white/70 bg-cream/95 px-3 py-1.5 font-display text-base font-bold text-brand-dark shadow-float backdrop-blur-md">
          {formatNaira(item.price)}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="display text-2xl font-bold leading-none text-cocoa">{item.name}</h3>
            <p className="mt-1.5 font-display text-[15px] font-medium text-brand-dark">{item.tagline}</p>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cocoa/70">{item.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="truncate text-xs text-cocoa/60">{item.ingredients.join(' · ')}</p>
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="press inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-brand pl-4 pr-5 font-display text-[15px] font-bold text-cream shadow-float hover:bg-brand-light"
          >
            <Plus className="size-5" strokeWidth={2.6} /> Add
          </button>
        </div>
      </div>
    </article>
  )
}
