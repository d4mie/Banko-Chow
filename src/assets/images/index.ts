import adTraffic from './ad-traffic.webp'
import burgerSide from './burger-side.webp'
import cheese from './cheese.webp'
import comboCoke from './combo-coke.webp'
import comboSprite from './combo-sprite.webp'
import flatlay from './flatlay.webp'
import friesCloseup from './fries-closeup.webp'
import friesCup from './fries-cup.webp'
import heroBurger from './hero-burger.webp'
import island from './island.webp'
import linkbridge from './linkbridge.webp'
import mainland from './mainland.webp'
import sauceDrizzle from './sauce-drizzle.webp'
import sausage from './sausage.webp'
import stacked from './stacked.webp'
import suyaOpen from './suya-open.webp'
import toastedCloseup from './toasted-closeup.webp'
import toastedPaper from './toasted-paper.webp'
import toastedTop from './toasted-top.webp'
import wings from './wings.webp'
import wingsSauce from './wings-sauce.webp'
import zobo from './zobo.webp'

// Zobo is the client's bottle photo. Sausage and cheese are Unsplash photos
// (Unsplash License): photo-1624772398066 and photo-1627935722051.
export const images = {
  adTraffic,
  burgerSide,
  cheese,
  comboCoke,
  comboSprite,
  flatlay,
  friesCloseup,
  friesCup,
  heroBurger,
  island,
  linkbridge,
  mainland,
  sauceDrizzle,
  sausage,
  stacked,
  suyaOpen,
  toastedCloseup,
  toastedPaper,
  toastedTop,
  wings,
  wingsSauce,
  zobo,
} as const

export type ImageKey = keyof typeof images

export interface GalleryPhoto {
  src: string
  alt: string
  /** Aspect hint for the masonry layout. */
  tall?: boolean
}

export const gallery: GalleryPhoto[] = [
  { src: heroBurger, alt: 'Street Burger cut open, sauce running over lettuce and tomato', tall: true },
  { src: linkbridge, alt: 'Linkbridge Street Burger with Banko special sauce drizzle' },
  { src: friesCup, alt: 'Seasoned fries in a Banko Chow cup', tall: true },
  { src: toastedCloseup, alt: 'Toasted Agege bread burger with sauce' },
  { src: wings, alt: 'Crispy peppered chicken wings' },
  { src: suyaOpen, alt: 'Open Street Burger loaded with ram suya' },
  { src: comboCoke, alt: 'Street combo with wings, fries and a cold drink', tall: true },
  { src: toastedTop, alt: 'Grilled Agege bread bun from above' },
  { src: sauceDrizzle, alt: 'Shredded chicken and suya under Banko special sauce' },
  { src: stacked, alt: 'Stacked Street Burgers on branded paper', tall: true },
  { src: island, alt: 'Island Street Burger with shredded chicken, lettuce and tomato' },
  { src: toastedPaper, alt: 'Street Burger on Banko Chow paper' },
  { src: friesCloseup, alt: 'Close up of golden seasoned fries' },
  { src: burgerSide, alt: 'Street Burger side view with sauce' },
  { src: wingsSauce, alt: 'Peppered wings with dipping sauce', tall: true },
  { src: comboSprite, alt: 'Street Burger, wings and fries combo with Sprite' },
]
