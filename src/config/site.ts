/**
 * Single source of truth for business details shown across web, iOS and Android.
 * Update here and every surface (header, footer, order flow, Find Us) follows.
 */
export const site = {
  name: 'Banko Chow',
  tagline: 'Real food, fast.',
  description:
    'Your neighbourhood street food brand with a classy twist. Born in the streets, inspired by culture, and driven by flavour.',

  /** Public order line printed on the menu. */
  phoneDisplay: '0907 701 5352',
  phoneTel: '+2349077015352',
  /** International format without "+" — required by wa.me links. */
  whatsapp: '2349077015352',

  instagram: 'bankochow',
  instagramUrl: 'https://instagram.com/bankochow',

  address: {
    line1: '48 Abiodun Street',
    area: 'Shomolu',
    city: 'Lagos',
    country: 'Nigeria',
  },
  mapsQuery: '48 Abiodun Street, Shomolu, Lagos, Nigeria',

  /** Shown on Find Us and the footer. Keep generic until opening hours are confirmed. */
  hoursNote: 'Open daily for pickup & delivery',

  /** CAC business name registration number. */
  registrationNumber: 'BN 8456863',

  community: 'Chow Fam',
  crew: 'The Street Chow Crew',

  slang: [
    'Street has entered fine dining.',
    'This one no dey for traffic.',
    'Burger wey sabi.',
    'For mouth wey sabi taste.',
    'Omo, this thing sweet die.',
    'Street ti take over!',
  ],
} as const

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=16&output=embed`
export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const telUrl = `tel:${site.phoneTel}`
