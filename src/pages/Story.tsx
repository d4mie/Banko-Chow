import { ArrowRight, Flame, Heart, Megaphone, Users } from 'lucide-react'
import { images } from '../assets/images'
import { Container, Page, PageHero } from '../components/layout/Page'
import { Glass } from '../components/ui/Glass'
import { GlassButton } from '../components/ui/GlassButton'
import { Eyebrow, SectionHeading } from '../components/ui/Primitives'
import { site } from '../config/site'

const pillars = [
  {
    icon: Users,
    title: 'Who are we?',
    body: 'We’re Banko Chow! Your neighbourhood street food brand with a classy twist. Born in the streets, inspired by culture, and driven by flavour.',
  },
  {
    icon: Flame,
    title: 'What do we do?',
    body: 'We recreate popular fast-food pastries using locally loved ingredients. Our main star is the Street Burger, made with Agege bread and Nigerian-style fillings like suya, chicken, and asun. We also serve the tastiest zobo, completely void of added sugar.',
  },
  {
    icon: Heart,
    title: 'Why do we do it?',
    body: 'Because we believe street food deserves the spotlight. Because our flavours deserve more than gutter sides and street corners. We do it to celebrate our roots in every bite.',
  },
  {
    icon: Megaphone,
    title: 'What do we hope to achieve?',
    body: 'To redefine what street food can be. To make people proud of local flavours. And to take the taste of the streets to every corner, one street burger at a time.',
  },
]

export function Story() {
  return (
    <Page title="Our story">
      <PageHero eyebrow="Our brand story" title="Hey there, Chow fam." lede="Let’s get you acquainted with the brand." />

      <Container className="mt-12 space-y-16 pb-16">
        <section className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Glass sheen className="overflow-hidden rounded-[2.5rem] p-2.5 lg:sticky lg:top-28">
            <img
              src={images.flatlay}
              alt="Agege bread, ram suya, tomatoes and lettuce laid out on an orange table"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover"
            />
          </Glass>

          <Glass tone="light" className="space-y-5 p-6 text-[17px] leading-relaxed text-cocoa/85 sm:p-8">
            <p>
              Like every food creation there is, Banko Chow was born out of pure hunger, literally and metaphorically.
              Hunger for something different. Something familiar, yet new. The kind of food that reminds you of home but
              still makes you pause to say,{' '}
              <span className="font-display font-semibold text-brand-dark">“Omo, this thing sweet die.”</span>
            </p>
            <p>
              Our founder grew up with the aroma of Agege bread in the morning, the smoke from roadside suya in the
              evening, and the taste of chilled zobo on sweaty afternoons. But as he grew older, he noticed a gap.
            </p>
            <p>
              Why was the good stuff always either too street or too foreign? Why couldn’t they meet somewhere in the
              middle?
            </p>
            <p>
              So he started Banko Chow. Not just to serve food, but to rewrite the rules of street food. This was what
              birthed the <span className="font-display font-semibold text-brand-dark">Street Burger</span>. A delicious
              twist on the classic burger: Agege bread as the bun, stuffed with suya wey dey burst brain, perfectly spiced
              chicken, or peppered asun.
            </p>
            <p className="display text-2xl font-bold text-cocoa">Banko Chow is not just fast food, it’s real food, fast.</p>
            <p>
              And to wash it all down? Freshly made zobo, made with love and zero added sugar. Because you shouldn’t have
              to choose between taste and health.
            </p>
            <p>
              Banko Chow is what happens when culture meets creativity. When local flavour gets a glow-up. It’s for the
              people who grew up on the streets and those just discovering its magic.
            </p>
            <p className="display text-2xl font-bold text-brand">It’s not just food, it’s a whole vibe.</p>
          </Glass>
        </section>

        <section>
          <SectionHeading eyebrow="The brand" title="What we stand on." />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <Glass key={pillar.title} sheen className="p-6 sm:p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-cream text-brand-dark shadow-float">
                    <Icon className="size-6" strokeWidth={2.2} />
                  </span>
                  <h3 className="display mt-5 text-2xl font-bold text-cream">{pillar.title}</h3>
                  <p className="mt-3 text-pretty leading-relaxed text-cream/85">{pillar.body}</p>
                </Glass>
              )
            })}
          </div>
        </section>

        <section className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr]">
          <Glass tone="dark" sheen className="p-6 sm:p-10">
            <Eyebrow>Brand language</Eyebrow>
            <h2 className="display mt-3 text-3xl font-bold text-cream sm:text-4xl">How we talk.</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <dt className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Our customers</dt>
                <dd className="display mt-1 text-2xl font-bold text-cream">{site.community}</dd>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <dt className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Our staff</dt>
                <dd className="display mt-1 text-2xl font-bold text-cream">{site.crew}</dd>
              </div>
            </dl>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.slang.map((phrase) => (
                <li key={phrase} className="glass rounded-full px-4 py-2 font-display text-[15px] font-semibold text-cream">
                  “{phrase}”
                </li>
              ))}
            </ul>
            <blockquote className="mt-8 font-display text-xl font-semibold text-cream">
              In the words of Olamide, “Street ti take over!”
            </blockquote>
          </Glass>

          <Glass sheen className="overflow-hidden rounded-[2.5rem] p-2.5">
            <img
              src={images.adTraffic}
              alt="Banko Chow campaign poster: this one no dey for traffic"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover"
            />
          </Glass>
        </section>

        <section className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <SectionHeading title="Hungry yet?" lede="Street Burgers, zobo and the whole vibe are one tap away." />
          <div className="flex flex-wrap gap-3">
            <GlassButton to="/menu" variant="solid" size="lg">
              See the menu <ArrowRight className="size-5" strokeWidth={2.5} />
            </GlassButton>
            <GlassButton to="/gallery" size="lg">
              Gallery
            </GlassButton>
          </div>
        </section>
      </Container>
    </Page>
  )
}
