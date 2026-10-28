import { Check, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { extras, type MenuItem } from '../../data/menu'
import { cx, formatNaira } from '../../lib/format'
import { useCart } from '../../store/cart'
import { Badge, QuantityStepper } from '../ui/Primitives'
import { Sheet } from '../ui/Sheet'

interface ItemSheetProps {
  item: MenuItem | null
  onClose: () => void
  onAdded?: (item: MenuItem) => void
}

export function ItemSheet({ item, onClose, onAdded }: ItemSheetProps) {
  return (
    <Sheet open={Boolean(item)} onClose={onClose} title={item?.name}>
      {/* Keyed so quantity and extras reset whenever a different item opens. */}
      {item && <ItemSheetContent key={item.id} item={item} onClose={onClose} onAdded={onAdded} />}
    </Sheet>
  )
}

function ItemSheetContent({ item, onClose, onAdded }: ItemSheetProps & { item: MenuItem }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [picked, setPicked] = useState<string[]>([])

  const extrasTotal = picked.reduce((sum, id) => sum + (extras.find((extra) => extra.id === id)?.price ?? 0), 0)
  const total = (item.price + extrasTotal) * qty

  const toggle = (id: string) =>
    setPicked((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]))

  const confirm = () => {
    add(item.id, item.allowExtras ? picked : [], qty)
    onAdded?.(item)
    onClose()
  }

  return (
    <>
      {item.image ? (
        <div className="relative -mt-12 aspect-[4/3] w-full overflow-hidden">
          <img src={item.image} alt={item.name} className="size-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgb(255_248_240)] to-transparent" />
        </div>
      ) : (
        <div className="-mt-12 h-16" />
      )}

      <div className="px-5 pb-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          {item.badge && <Badge tone="brand">{item.badge}</Badge>}
          <Badge tone="cream" className="border-cocoa/10 bg-cocoa/5 text-cocoa/70">
            {item.category === 'street-burgers' ? 'Street Burger' : item.category}
          </Badge>
        </div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="display text-3xl font-bold leading-none text-cocoa">{item.name}</h3>
          <p className="display shrink-0 text-2xl font-bold text-brand">{formatNaira(item.price)}</p>
        </div>
        <p className="mt-1 font-display text-lg font-medium text-brand-dark">{item.tagline}</p>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-cocoa/75">{item.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Ingredients">
          {item.ingredients.map((ingredient) => (
            <li key={ingredient} className="rounded-full border border-cocoa/10 bg-white/60 px-3 py-1 text-xs font-medium text-cocoa/80">
              {ingredient}
            </li>
          ))}
        </ul>

        {item.allowExtras && (
          <fieldset className="mt-6">
            <legend className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-cocoa/60">Make it do more</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {extras.map((extra) => {
                const on = picked.includes(extra.id)
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggle(extra.id)}
                    aria-pressed={on}
                    className={cx(
                      'press flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors',
                      on ? 'border-brand bg-brand text-cream shadow-float' : 'border-cocoa/10 bg-white/60 text-cocoa hover:bg-white',
                    )}
                  >
                    <span>
                      <span className="block font-display text-base font-semibold">+ {extra.name}</span>
                      <span className={cx('text-xs', on ? 'text-cream/85' : 'text-cocoa/60')}>{formatNaira(extra.price)}</span>
                    </span>
                    <span
                      className={cx(
                        'grid size-6 place-items-center rounded-full border',
                        on ? 'border-cream/70 bg-cream text-brand' : 'border-cocoa/20',
                      )}
                    >
                      {on && <Check className="size-4" strokeWidth={3} />}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <QuantityStepper value={qty} onChange={setQty} min={1} tone="cocoa" />
          <button
            type="button"
            onClick={confirm}
            className="press inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 font-display text-base font-bold text-cream shadow-float hover:bg-brand-light"
          >
            <ShoppingBag className="size-5" strokeWidth={2.4} />
            Add · {formatNaira(total)}
          </button>
        </div>
      </div>
    </>
  )
}
