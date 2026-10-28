import { MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router'
import { site, telUrl, whatsappUrl } from '../../config/site'
import { BrandLogo } from '../BrandLogo'
import { Glass } from '../ui/Glass'
import { InstagramIcon } from '../ui/InstagramIcon'

const year = new Date().getFullYear()

const links = [
  { to: '/menu', label: 'Menu' },
  { to: '/order', label: 'Order' },
  { to: '/story', label: 'Our story' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/find-us', label: 'Find us' },
]

export function Footer() {
  return (
    <footer className="px-safe pb-tabbar md:pb-10">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <Glass className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr_1fr]" sheen>
          <div>
            <BrandLogo className="h-12" />
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-cream/85">{site.description}</p>
            <p className="mt-4 font-display text-lg font-semibold text-cream">{site.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Explore</p>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-display text-base font-semibold text-cream hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Talk to us</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={telUrl} className="inline-flex items-center gap-2 text-cream hover:text-white">
                  <Phone className="size-4" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream hover:text-white"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream hover:text-white"
                >
                  <InstagramIcon className="size-4" /> @{site.instagram}
                </a>
              </li>
            </ul>
            <address className="mt-4 text-sm not-italic leading-relaxed text-cream/80">
              {site.address.line1}, {site.address.area}
              <br />
              {site.address.city}, {site.address.country}
            </address>
          </div>
        </Glass>

        <div className="mt-5 flex flex-col items-center justify-between gap-2 px-2 text-xs text-cream/70 sm:flex-row">
          <p>
            © {year} {site.name}. {site.registrationNumber}.
          </p>
          <p className="font-display font-semibold tracking-wide">Street ti take over!</p>
        </div>
      </div>
    </footer>
  )
}
