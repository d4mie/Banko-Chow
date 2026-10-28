import { ArrowRight, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { Container, Page, PageHero } from '../components/layout/Page'
import { ItemSheet } from '../components/menu/ItemSheet'
import { MenuItemCard } from '../components/menu/MenuItemCard'
import { Glass } from '../components/ui/Glass'
import { Badge } from '../components/ui/Primitives'
import { categories, comingSoon, menu, type MenuItem } from '../data/menu'
import { cx, formatNaira } from '../lib/format'
import { useCart } from '../store/cart'

export function Menu() {
  const [selected, setSelected] = useState<MenuItem | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const { count, subtotal } = useCart()

  const announce = (item: MenuItem) => {
    setToast(`${item.name} added to your order`)
    window.setTimeout(() => setToast(null), 2200)
  }

  return (
    <Page title="Menu">
      <PageHero
        eyebrow="Menu"
        title="Burger wey sabi."
        lede="Popular fast-food favourites, recreated with locally loved ingredients. Tap any item to add it to your order."
      >
        <nav className="mt-6 flex gap-2 overflow-x-auto scrollbar-none" aria-label="Menu sections">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="press glass shrink-0 rounded-full px-4 py-2 font-display text-sm font-semibold text-cream hover:bg-white/20"
            >
              {category.name}
            </a>
          ))}
          <a
            href="#coming-soon"
            className="press glass shrink-0 rounded-full px-4 py-2 font-display text-sm font-semibold text-cream hover:bg-white/20"
          >
            Coming soon
          </a>
        </nav>
      </PageHero>

      <Container className="mt-12 space-y-16 pb-16">
        {categories.map((category) => {
          const items = menu.filter((item) => item.category === category.id)
          const hasPhotos = items.some((item) => item.image)
          return (
            <section key={category.id} id={category.id} className="scroll-mt-28">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="display text-3xl font-bold text-cream sm:text-4xl">{category.name}</h2>
                  <p className="mt-2 max-w-xl text-pretty text-cream/85">{category.blurb}</p>
                </div>
              </div>
              <div className={cx('mt-6 grid gap-4', hasPhotos ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2')}>
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} onSelect={setSelected} compact={!hasPhotos} />
                ))}
              </div>
            </section>
          )
        })}

        <section id="coming-soon" className="scroll-mt-28">
          <div className="flex items-center gap-3">
            <h2 className="display text-3xl font-bold text-cream sm:text-4xl">Coming soon</h2>
            <Badge>New</Badge>
          </div>
          <p className="mt-2 max-w-xl text-pretty text-cream/85">
            Photographed for the new menu. Pricing is confirmed in store and on WhatsApp.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {comingSoon.map((item) => (
              <Glass key={item.id} className="overflow-hidden rounded-[2rem] p-2">
                <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-[1.6rem] object-cover" />
                <div className="px-3 pb-3 pt-4">
                  <h3 className="display text-xl font-bold text-cream">{item.name}</h3>
                  <p className="mt-1 text-sm text-cream/80">{item.note}</p>
                </div>
              </Glass>
            ))}
          </div>
        </section>
      </Container>

      {/* Floating order summary */}
      {count > 0 && (
        <div
          className="pointer-events-none fixed inset-x-0 z-30 flex justify-center px-4"
          style={{ bottom: 'calc(var(--tabbar-h) + var(--sab) + 1.25rem)' }}
        >
          <Link
            to="/order"
            className="pointer-events-auto press animate-pop glass-strong flex w-full max-w-md items-center justify-between gap-4 rounded-full py-2.5 pl-3 pr-2.5 shadow-float md:[--tabbar-h:0rem]"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-cream text-brand-dark">
                <ShoppingBag className="size-5" strokeWidth={2.4} />
              </span>
              <span className="text-left">
                <span className="block font-display text-sm font-semibold text-cream/80">
                  {count} item{count === 1 ? '' : 's'}
                </span>
                <span className="display block text-lg font-bold leading-none text-cream">{formatNaira(subtotal)}</span>
              </span>
            </span>
            <span className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand px-4 font-display text-[15px] font-bold text-cream">
              View order <ArrowRight className="size-4" strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      )}

      {toast && (
        <div className="pointer-events-none fixed inset-x-0 top-[calc(var(--sat)+5.5rem)] z-40 flex justify-center px-4" role="status">
          <div className="animate-pop glass-light rounded-full px-5 py-2.5 font-display text-sm font-semibold text-cocoa shadow-float">{toast}</div>
        </div>
      )}

      <ItemSheet item={selected} onClose={() => setSelected(null)} onAdded={announce} />
    </Page>
  )
}
