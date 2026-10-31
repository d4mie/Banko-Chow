import { site, whatsappUrl } from '../config/site'
import { extraById, menuById } from '../data/menu'
import { cartTotals, linePrice, type CartState } from '../store/cart'
import { formatNaira } from './format'

export type Fulfilment = 'pickup' | 'delivery'

export interface OrderDetails {
  name: string
  phone: string
  fulfilment: Fulfilment
  address: string
  note: string
}

export const ORDER_DETAILS_KEY = 'bankochow.order-details.v1'

export const emptyDetails: OrderDetails = {
  name: '',
  phone: '',
  fulfilment: 'pickup',
  address: '',
  note: '',
}

export function loadDetails(): OrderDetails {
  try {
    const raw = localStorage.getItem(ORDER_DETAILS_KEY)
    return raw ? { ...emptyDetails, ...(JSON.parse(raw) as Partial<OrderDetails>) } : emptyDetails
  } catch {
    return emptyDetails
  }
}

export function persistDetails(details: OrderDetails): void {
  try {
    localStorage.setItem(ORDER_DETAILS_KEY, JSON.stringify(details))
  } catch {
    // Non-fatal: details simply are not remembered next time.
  }
}

export function describeLine(itemId: string, extras: string[]): string {
  const item = menuById[itemId]
  const name = item?.category === 'street-burgers' ? `${item.name} Street Burger` : (item?.name ?? itemId)
  if (extras.length === 0) return name
  return `${name} (+ ${extras.map((id) => extraById[id]?.name ?? id).join(', ')})`
}

/** Builds the WhatsApp message the Street Chow Crew receives. */
export function buildOrderMessage(cart: CartState, details: OrderDetails): string {
  const { subtotal } = cartTotals(cart)
  const lines = cart.lines.map(
    (line) => `• ${line.qty}x ${describeLine(line.itemId, line.extras)} — ${formatNaira(linePrice(line))}`,
  )

  const parts = [`Hey ${site.name}! I'd like to place an order 🍔`, '', ...lines, '', `Subtotal: ${formatNaira(subtotal)}`]

  if (details.fulfilment === 'delivery') {
    parts.push(`Delivery to: ${details.address.trim() || '(address to confirm)'}`)
  } else {
    parts.push(`Pickup at ${site.address.line1}, ${site.address.area}`)
  }
  if (details.name.trim()) parts.push(`Name: ${details.name.trim()}`)
  if (details.phone.trim()) parts.push(`Phone: ${details.phone.trim()}`)
  if (details.note.trim()) parts.push(`Note: ${details.note.trim()}`)

  parts.push('', 'Sent from the Banko Chow app')
  return parts.join('\n')
}

export function orderWhatsappUrl(cart: CartState, details: OrderDetails): string {
  return whatsappUrl(buildOrderMessage(cart, details))
}
