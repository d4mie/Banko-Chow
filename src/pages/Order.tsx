import { Bike, MessageCircle, Phone, ShoppingBag, Store, Trash2 } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Container, Page, PageHero } from '../components/layout/Page'
import { Glass } from '../components/ui/Glass'
import { GlassButton } from '../components/ui/GlassButton'
import { QuantityStepper } from '../components/ui/Primitives'
import { site, telUrl } from '../config/site'
import { menuById } from '../data/menu'
import { cx, formatNaira } from '../lib/format'
import { openExternal, successHaptic } from '../lib/native'
import { describeLine, loadDetails, orderWhatsappUrl, persistDetails, type Fulfilment, type OrderDetails } from '../lib/order'
import { linePrice, useCart } from '../store/cart'

const fieldClass =
  'w-full rounded-2xl border border-cocoa/10 bg-white/70 px-4 py-3 text-[15px] text-cocoa placeholder:text-cocoa/40 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15'

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-xs font-semibold uppercase tracking-[0.16em] text-cocoa/60">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-cocoa/55">{hint}</span>}
    </label>
  )
}

export function Order() {
  const { state, count, subtotal, setQty, remove, clear } = useCart()
  const [details, setDetails] = useState<OrderDetails>(loadDetails)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    persistDetails(details)
  }, [details])

  const update = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) =>
    setDetails((current) => ({ ...current, [key]: value }))

  const needsAddress = details.fulfilment === 'delivery' && details.address.trim().length < 6
  const canSend = count > 0 && !needsAddress

  const send = () => {
    if (!canSend) return
    openExternal(orderWhatsappUrl(state, details))
    successHaptic()
    setSent(true)
  }

  if (count === 0 && !sent) {
    return (
      <Page title="Your order">
        <PageHero eyebrow="Your order" title="Nothing in the bag yet." lede="Pick a Street Burger and we’ll package your order into a single WhatsApp message." />
        <Container className="mt-10 pb-16">
          <Glass sheen className="flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-cream text-brand-dark shadow-float">
                <ShoppingBag className="size-7" strokeWidth={2.2} />
              </span>
              <div>
                <p className="display text-2xl font-bold text-cream">Start with the Mainland.</p>
                <p className="text-sm text-cream/80">Our best seller, from {formatNaira(menuById.mainland.price)}.</p>
              </div>
            </div>
            <GlassButton to="/menu" variant="solid" size="lg">
              Browse the menu
            </GlassButton>
          </Glass>
        </Container>
      </Page>
    )
  }

  return (
    <Page title="Your order">
      <PageHero
        eyebrow="Your order"
        title={sent ? 'Order sent. Chow loading…' : 'Almost chow time.'}
        lede={
          sent
            ? 'Your order opened in WhatsApp. If it didn’t, tap “Send on WhatsApp” again or call us directly.'
            : 'Review your bag, tell us how you want it, and send the order straight to our WhatsApp line.'
        }
      />

      <Container className="mt-10 grid gap-6 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* Bag */}
        <section aria-labelledby="bag-heading">
          <Glass tone="light" className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 id="bag-heading" className="display text-2xl font-bold text-cocoa">
                Your bag <span className="text-cocoa/40">· {count}</span>
              </h2>
              {count > 0 && (
                <button type="button" onClick={clear} className="press text-sm font-semibold text-brand-dark hover:underline">
                  Clear all
                </button>
              )}
            </div>

            {count === 0 ? (
              <p className="mt-6 text-cocoa/70">
                Your bag is empty.{' '}
                <Link to="/menu" className="font-semibold text-brand-dark underline">
                  Add more chow
                </Link>
                .
              </p>
            ) : (
              <ul className="mt-5 divide-y divide-cocoa/10">
                {state.lines.map((line) => {
                  const item = menuById[line.itemId]
                  return (
                    <li key={line.key} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      {item?.image ? (
                        <img src={item.image} alt="" className="size-16 shrink-0 rounded-2xl object-cover" />
                      ) : (
                        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                          <ShoppingBag className="size-6" />
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="display truncate text-lg font-bold leading-tight text-cocoa">{describeLine(line.itemId, line.extras)}</p>
                        <p className="mt-0.5 text-sm text-cocoa/60">{formatNaira(linePrice(line))}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <QuantityStepper size="sm" tone="cocoa" value={line.qty} onChange={(qty) => setQty(line.key, qty)} />
                          <button
                            type="button"
                            onClick={() => remove(line.key)}
                            className="press grid size-9 place-items-center rounded-full text-cocoa/50 hover:bg-cocoa/5 hover:text-brand-dark"
                            aria-label={`Remove ${item?.name ?? 'item'}`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-cocoa/10 pt-4">
              <p className="font-display font-semibold text-cocoa/70">Subtotal</p>
              <p className="display text-2xl font-bold text-cocoa">{formatNaira(subtotal)}</p>
            </div>
            <p className="mt-1 text-xs text-cocoa/55">Delivery fee, if any, is confirmed on WhatsApp based on your location.</p>

            <Link to="/menu" className="mt-4 inline-flex font-display text-sm font-semibold text-brand-dark hover:underline">
              + Add more chow
            </Link>
          </Glass>
        </section>

        {/* Details */}
        <section aria-labelledby="details-heading" className="lg:sticky lg:top-28">
          <Glass tone="light" className="p-5 sm:p-6">
            <h2 id="details-heading" className="display text-2xl font-bold text-cocoa">
              How do you want it?
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Fulfilment">
              {(
                [
                  { id: 'pickup', label: 'Pickup', icon: Store, hint: site.address.area },
                  { id: 'delivery', label: 'Delivery', icon: Bike, hint: 'Fee confirmed in chat' },
                ] as Array<{ id: Fulfilment; label: string; icon: typeof Store; hint: string }>
              ).map((option) => {
                const Icon = option.icon
                const on = details.fulfilment === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => update('fulfilment', option.id)}
                    className={cx(
                      'press flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors',
                      on ? 'border-brand bg-brand text-cream shadow-float' : 'border-cocoa/10 bg-white/60 text-cocoa hover:bg-white',
                    )}
                  >
                    <Icon className="size-5 shrink-0" strokeWidth={2.2} />
                    <span>
                      <span className="block font-display text-base font-semibold">{option.label}</span>
                      <span className={cx('block text-xs', on ? 'text-cream/85' : 'text-cocoa/55')}>{option.hint}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-5 space-y-4">
              {details.fulfilment === 'delivery' && (
                <Field label="Delivery address" hint="Street, area and a landmark help the rider.">
                  <textarea
                    className={cx(fieldClass, 'min-h-20 resize-none')}
                    placeholder="e.g. 12 Bajulaiye Road, Shomolu — opposite the filling station"
                    value={details.address}
                    onChange={(event) => update('address', event.target.value)}
                    autoComplete="street-address"
                  />
                </Field>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name">
                  <input
                    className={fieldClass}
                    placeholder="Chow fam"
                    value={details.name}
                    onChange={(event) => update('name', event.target.value)}
                    autoComplete="name"
                  />
                </Field>
                <Field label="Phone (optional)">
                  <input
                    className={fieldClass}
                    placeholder="0800 000 0000"
                    inputMode="tel"
                    value={details.phone}
                    onChange={(event) => update('phone', event.target.value)}
                    autoComplete="tel"
                  />
                </Field>
              </div>
              <Field label="Note for the kitchen (optional)">
                <input
                  className={fieldClass}
                  placeholder="Extra pepper, no tomatoes…"
                  value={details.note}
                  onChange={(event) => update('note', event.target.value)}
                />
              </Field>
            </div>

            <button
              type="button"
              onClick={send}
              disabled={!canSend}
              className="press mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 font-display text-base font-bold text-cream shadow-float hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MessageCircle className="size-5" strokeWidth={2.4} />
              Send on WhatsApp · {formatNaira(subtotal)}
            </button>
            {needsAddress && count > 0 && <p className="mt-2 text-center text-xs text-brand-dark">Add a delivery address to continue.</p>}

            <a
              href={telUrl}
              className="press mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white/60 font-display text-[15px] font-bold text-cocoa hover:bg-white"
            >
              <Phone className="size-4" strokeWidth={2.4} /> Call {site.phoneDisplay}
            </a>

            <p className="mt-4 text-center text-xs leading-relaxed text-cocoa/55">
              Sending opens WhatsApp with your order pre-filled. Nothing is charged until the crew confirms.
            </p>
          </Glass>
        </section>
      </Container>
    </Page>
  )
}
