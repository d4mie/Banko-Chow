import { ArrowRight, Bike, Flame, Leaf, MessageCircle, Sparkles, Store, UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { images } from '../assets/images'
import { Marquee } from '../components/Marquee'
import { Container, Page } from '../components/layout/Page'
import { ItemSheet } from '../components/menu/ItemSheet'
import { MenuItemCard } from '../components/menu/MenuItemCard'
import { Glass } from '../components/ui/Glass'
import { GlassButton } from '../components/ui/GlassButton'
import { Badge, Eyebrow, SectionHeading } from '../components/ui/Primitives'
import { mapsUrl, site, whatsappUrl } from '../config/site'
import { comingSoon, menuById, signatureItems, startingPrice, type MenuItem } from '../data/menu'
import { formatNaira } from '../lib/format'

const steps = [
  {
    icon: UtensilsCrossed,
    title: 'Pick your Street Burger',
    body: 'Mainland, Island or Linkbridge. Add sausage or cheese if you want it to do more.',
  },
  {
    icon: MessageCircle,
    title: 'Send it on WhatsApp',
    body: 'Your order is packaged into one message. Tap send and the Street Chow Crew takes over.',
  },
  {
    icon: Bike,
    title: 'Pickup or delivery',
    body: `Grab it hot at ${site.address.area}, or get it delivered. Delivery fee is confirmed in chat.`,
  },
]

const values = [
  { icon: Flame, title: 'Suya wey dey burst brain', body: 'Smoky ram suya and spiced chicken, fresh off the fire.' },
  { icon: Sparkles, title: 'Agege bread as the bun', body: 'Soft, toasted and unmistakably Lagos. No imported buns.' },
  { icon: Leaf, title: 'Zobo, zero added sugar', body: 'Freshly made every day. Taste and health, same cup.' },
]

export function Home() {
  const [selected, setSelected] = useState<MenuItem | null>(null)

  return (
    <Page title={site.name}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[calc(var(--sat)+5.5rem)] sm:pt-[calc(var(--sat)+7rem)]">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="animate-rise">
              <Badge className="mb-5">
                <Sparkles className="size-3" /> Born in {site.address.area}, {site.address.city}
              </Badge>
              <h1 className="display text-balance text-[2.9rem] font-bold leading-[0.95] text-cream sm:text-6xl lg:text-7xl">
                Street food with a <span className="text-cocoa/90">classy</span> twist.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-cream/90 sm:text-lg">
                Street Burgers on Agege bread, stuffed with suya wey dey burst brain or perfectly spiced chicken. Washed down with
                freshly made zobo. <span className="font-semibold text-cream">Real food, fast.</span>
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <GlassButton to="/menu" variant="solid" size="lg">
                  Order now <ArrowRight className="size-5" strokeWidth={2.5} />
                </GlassButton>
                <GlassButton to="/story" size="lg">
                  Our story
                </GlassButton>
              </div>

              <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
                {[
                  { label: 'Street Burgers from', value: formatNaira(startingPrice) },
                  { label: 'Zobo', value: formatNaira(menuById.zobo.price) },
                  { label: 'Added sugar', value: 'Zero' },
                ].map((stat) => (
                  <Glass key={stat.label} className="rounded-2xl px-3 py-3">
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-cream/70">{stat.label}</dt>
                    <dd className="display mt-1 text-lg font-bold text-cream sm:text-xl">{stat.value}</dd>
                  </Glass>
                ))}
              </dl>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <Glass sheen className="animate-rise relative overflow-hidden rounded-[2.5rem] p-2.5 [animation-delay:120ms]">
                <img
                  src={images.heroBurger}
                  alt="Banko Chow Street Burger cut open with sauce running over lettuce and tomato"
                  className="aspect-[4/5] w-full rounded-[2rem] object-cover sm:aspect-[5/5.2]"
                  fetchPriority="high"
                />
              </Glass>

              <Glass tone="light" className="animate-float absolute -left-3 bottom-16 rounded-2xl px-4 py-3 sm:-left-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-dark/80">Best seller</p>
                <p className="display text-lg font-bold text-cocoa">Mainland · {formatNaira(menuById.mainland.price)}</p>
              </Glass>
              <Glass
                tone="light"
                className="animate-float absolute -right-2 top-10 rounded-2xl px-4 py-3 [animation-delay:-3s] sm:-right-6"
              >
                <p className="display text-base font-bold text-cocoa">“Omo, this thing sweet die.”</p>
                <p className="text-[11px] font-medium text-brand-dark/80">— every first bite</p>
              </Glass>
            </div>
          </div>
        </Container>

        <Container className="mt-12 sm:mt-16">
          <Marquee />
        </Container>
      </section>

      {/* Signature menu */}
      <section className="py-16 sm:py-24" id="menu">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="The Street Burger"
              title="Three ways to chow."
              lede="Every Street Burger starts with toasted Agege bread, crisp lettuce, tomatoes and a generous run of Banko special sauce."
            />
            <GlassButton to="/menu" className="shrink-0">
              Full menu <ArrowRight className="size-4" strokeWidth={2.5} />
            </GlassButton>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {signatureItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onSelect={setSelected} />
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
            <MenuItemCard item={menuById.zobo} onSelect={setSelected} compact />
            <Glass className="flex items-center gap-4 rounded-3xl px-5 py-4">
              <p className="text-sm text-cream/85">
                Extras: <span className="font-semibold text-cream">Sausage</span> or{' '}
                <span className="font-semibold text-cream">Cheese</span> for {formatNaira(menuById.cheese.price)}
              </p>
            </Glass>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <Glass key={value.title} sheen className="p-6">
                  <span className="grid size-12 place-items-center rounded-2xl bg-cream text-brand-dark shadow-float">
                    <Icon className="size-6" strokeWidth={2.2} />
                  </span>
                  <h3 className="display mt-5 text-2xl font-bold text-cream">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/85">{value.body}</p>
                </Glass>
              )
            })}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="pb-16 sm:pb-24">
        <Container>
          <Glass tone="dark" sheen className="p-6 sm:p-10">
            <SectionHeading eyebrow="How we chow" title="Order in three taps." />
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <li key={step.title} className="relative">
                    <div className="flex items-center gap-3">
                      <span className="display grid size-10 place-items-center rounded-full bg-cream text-base font-bold text-brand-dark">
                        {index + 1}
                      </span>
                      <Icon className="size-6 text-cream" strokeWidth={2.2} />
                    </div>
                    <h3 className="display mt-4 text-xl font-bold text-cream">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/80">{step.body}</p>
                  </li>
                )
              })}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <GlassButton to="/menu" variant="solid">
                Start an order
              </GlassButton>
              <GlassButton href={whatsappUrl('Hey Banko Chow! I want to place an order.')} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" /> Chat on WhatsApp
              </GlassButton>
            </div>
          </Glass>
        </Container>
      </section>

      {/* Coming soon */}
      <section className="pb-16 sm:pb-24">
        <Container>
          <SectionHeading
            eyebrow="New on the menu"
            title="The streets are expanding."
            lede="Fries, wings and full combos are joining the Street Burger. Pricing is confirmed in store and on WhatsApp."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {comingSoon.map((item) => (
              <Glass key={item.id} className="group overflow-hidden rounded-[2rem] p-2">
                <div className="relative overflow-hidden rounded-[1.6rem]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <Badge tone="cream" className="absolute left-3 top-3 shadow-float">
                    New
                  </Badge>
                </div>
                <div className="px-3 pb-3 pt-4">
                  <h3 className="display text-xl font-bold text-cream">{item.name}</h3>
                  <p className="mt-1 text-sm text-cream/80">{item.note}</p>
                </div>
              </Glass>
            ))}
          </div>
        </Container>
      </section>

      {/* Story teaser */}
      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Glass sheen className="order-2 overflow-hidden rounded-[2.5rem] p-2.5 lg:order-1">
              <img
                src={images.flatlay}
                alt="Street Burger ingredients laid out: Agege bread, ram suya, tomatoes, lettuce and Banko sauce"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[2rem] object-cover"
              />
            </Glass>
            <div className="order-1 lg:order-2">
              <SectionHeading
                eyebrow="Our story"
                title="When local flavour gets a glow-up."
                lede="Born out of pure hunger — for something familiar, yet new. The kind of food that reminds you of home but still makes you pause to say, “Omo, this thing sweet die.”"
              />
              <blockquote className="mt-6 border-l-2 border-cream/60 pl-4 font-display text-xl font-semibold text-cream">
                “Street ti take over!”
                <footer className="mt-1 text-sm font-medium text-cream/75">— Olamide</footer>
              </blockquote>
              <div className="mt-8 flex flex-wrap gap-3">
                <GlassButton to="/story">
                  Read the full story <ArrowRight className="size-4" strokeWidth={2.5} />
                </GlassButton>
                <GlassButton to="/gallery" variant="ghost">
                  See the gallery
                </GlassButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Find us */}
      <section className="pb-10 sm:pb-16">
        <Container>
          <Glass tone="light" sheen className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Eyebrow tone="cocoa">Find us</Eyebrow>
              <h2 className="display mt-3 text-3xl font-bold text-cocoa sm:text-4xl">
                {site.address.line1}, {site.address.area}.
              </h2>
              <p className="mt-3 flex items-center gap-2 text-cocoa/70">
                <Store className="size-4" /> {site.hoursNote} · {site.address.city}, {site.address.country}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 font-display text-base font-bold text-cream shadow-float hover:bg-brand-light"
              >
                Open in Maps
              </a>
              <Link
                to="/find-us"
                className="press inline-flex h-12 items-center gap-2 rounded-full border border-cocoa/15 bg-white/60 px-6 font-display text-base font-bold text-cocoa hover:bg-white"
              >
                Contact details
              </Link>
            </div>
          </Glass>
        </Container>
      </section>

      <ItemSheet item={selected} onClose={() => setSelected(null)} />
    </Page>
  )
}
