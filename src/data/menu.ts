import { images } from '../assets/images'

export type CategoryId = 'street-burgers' | 'drinks' | 'extras'

export interface Category {
  id: CategoryId
  name: string
  blurb: string
}

export interface MenuItem {
  id: string
  category: CategoryId
  name: string
  /** Short, punchy line used on cards. */
  tagline: string
  description: string
  ingredients: string[]
  /** Price in Naira. */
  price: number
  image?: string
  badge?: string
  /** Whether paid extras (sausage, cheese) can be added. */
  allowExtras?: boolean
}

export interface Extra {
  id: string
  name: string
  price: number
}

export const categories: Category[] = [
  {
    id: 'street-burgers',
    name: 'Street Burgers',
    blurb: 'Agege bread as the bun. Nigerian-style fillings. Banko special sauce on everything.',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    blurb: 'Freshly made, chilled, and completely void of added sugar.',
  },
  {
    id: 'extras',
    name: 'Extras',
    blurb: 'Make your Street Burger do more.',
  },
]

export const extras: Extra[] = [
  { id: 'sausage', name: 'Sausage', price: 700 },
  { id: 'cheese', name: 'Cheese', price: 700 },
]

export const menu: MenuItem[] = [
  {
    id: 'mainland',
    category: 'street-burgers',
    name: 'Mainland',
    tagline: 'Suya wey dey burst brain.',
    description:
      'Smoky ram suya tucked into soft, toasted Agege bread with crisp lettuce, fresh tomatoes and a generous run of Banko special sauce.',
    ingredients: ['Agege bread', 'Ram suya', 'Lettuce', 'Tomatoes', 'Banko special sauce'],
    price: 3500,
    image: images.mainland,
    badge: 'Best seller',
    allowExtras: true,
  },
  {
    id: 'island',
    category: 'street-burgers',
    name: 'Island',
    tagline: 'Perfectly spiced, properly stacked.',
    description:
      'Shredded, perfectly spiced chicken on toasted Agege bread, layered with lettuce, tomatoes and Banko special sauce.',
    ingredients: ['Agege bread', 'Shredded chicken', 'Lettuce', 'Tomatoes', 'Banko special sauce'],
    price: 4000,
    image: images.island,
    allowExtras: true,
  },
  {
    id: 'linkbridge',
    category: 'street-burgers',
    name: 'Linkbridge',
    tagline: 'Mainland meets Island.',
    description:
      'The best of both sides in one bun: ram suya and shredded chicken together with lettuce, tomatoes and Banko special sauce.',
    ingredients: ['Agege bread', 'Ram suya', 'Shredded chicken', 'Lettuce', 'Tomatoes', 'Banko special sauce'],
    price: 4500,
    image: images.linkbridge,
    badge: 'Loaded',
    allowExtras: true,
  },
  {
    id: 'zobo',
    category: 'drinks',
    name: 'Zobo',
    tagline: 'Zero added sugar. All the flavour.',
    description:
      'Freshly made zobo, served chilled and made with love and zero added sugar. Because you shouldn’t have to choose between taste and health.',
    ingredients: ['Hibiscus', 'Ginger', 'Pineapple', 'Cloves'],
    price: 1000,
    badge: 'Fresh daily',
  },
  {
    id: 'sausage',
    category: 'extras',
    name: 'Sausage',
    tagline: 'Add to any Street Burger.',
    description: 'A juicy sausage added to your Street Burger.',
    ingredients: ['Sausage'],
    price: 700,
  },
  {
    id: 'cheese',
    category: 'extras',
    name: 'Cheese',
    tagline: 'Melted over the filling.',
    description: 'A slice of cheese melted over your filling.',
    ingredients: ['Cheese'],
    price: 700,
  },
]

/** Items photographed for the upcoming menu. Pricing is confirmed in store. */
export const comingSoon = [
  { id: 'fries', name: 'Seasoned Fries', image: images.friesCup, note: 'Golden, peppery, and made for sauce.' },
  { id: 'wings', name: 'Peppered Wings', image: images.wings, note: 'Crispy wings with a proper kick.' },
  { id: 'combo', name: 'Street Combo', image: images.comboCoke, note: 'Burger, wings, fries and a cold drink.' },
]

export const menuById = Object.fromEntries(menu.map((item) => [item.id, item])) as Record<string, MenuItem>
export const extraById = Object.fromEntries(extras.map((extra) => [extra.id, extra])) as Record<string, Extra>

export const signatureItems = menu.filter((item) => item.category === 'street-burgers')
export const startingPrice = Math.min(...signatureItems.map((item) => item.price))
