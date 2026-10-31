import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { Container, Page, PageHero } from '../components/layout/Page'
import { Glass } from '../components/ui/Glass'
import { GlassButton } from '../components/ui/GlassButton'
import { InstagramIcon } from '../components/ui/InstagramIcon'
import { Eyebrow } from '../components/ui/Primitives'
import { mapsEmbedUrl, mapsUrl, site, telUrl, whatsappUrl } from '../config/site'

const contacts = [
  {
    icon: Phone,
    label: 'Call to order',
    value: site.phoneDisplay,
    href: telUrl,
    external: false,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with the crew',
    href: whatsappUrl('Hey Banko Chow! I have a question.'),
    external: true,
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: `@${site.instagram}`,
    href: site.instagramUrl,
    external: true,
  },
]

export function FindUs() {
  return (
    <Page title="Find us">
      <PageHero
        eyebrow="Find us"
        title={`${site.address.area}, ${site.address.city}.`}
        lede="Pull up for pickup, or let the Street Chow Crew bring it to you. Either way, this one no dey for traffic."
      />

      <Container className="mt-12 grid gap-6 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <Glass tone="light" sheen className="p-6 sm:p-7">
            <Eyebrow tone="cocoa">Address</Eyebrow>
            <address className="display mt-2 text-2xl font-bold not-italic leading-tight text-cocoa sm:text-3xl">
              {site.address.line1},
              <br />
              {site.address.area}, {site.address.city}
            </address>
            <p className="mt-3 flex items-center gap-2 text-sm text-cocoa/70">
              <Clock className="size-4" /> {site.hoursNote}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex h-12 items-center gap-2 rounded-full bg-brand px-5 font-display text-base font-bold text-cream shadow-float hover:bg-brand-light"
              >
                <Navigation className="size-4" strokeWidth={2.4} /> Get directions
              </a>
              <GlassButton to="/menu" variant="dark">
                Order for pickup
              </GlassButton>
            </div>
          </Glass>

          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {contacts.map((contact) => {
              const Icon = contact.icon
              return (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    target={contact.external ? '_blank' : undefined}
                    rel={contact.external ? 'noopener noreferrer' : undefined}
                    className="press glass flex items-center gap-4 rounded-3xl p-4 hover:bg-white/20"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cream text-brand-dark shadow-float">
                      <Icon className="size-5" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-cream/70">{contact.label}</span>
                      <span className="display block truncate text-lg font-bold text-cream">{contact.value}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <Glass sheen className="overflow-hidden rounded-[2.5rem] p-2.5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-cocoa/20 lg:aspect-auto lg:h-full lg:min-h-[32rem]">
            <iframe
              title={`Map of ${site.name}`}
              src={mapsEmbedUrl}
              className="absolute inset-0 size-full border-0 grayscale-[20%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="glass-light pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-cocoa">
              <MapPin className="size-4 text-brand" /> {site.name}
            </div>
          </div>
        </Glass>
      </Container>
    </Page>
  )
}
