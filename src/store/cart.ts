import { createContext, useContext } from 'react'
import { extraById, menuById } from '../data/menu'

export interface CartLine {
  /** Stable key: item id + sorted extras, so identical configurations merge. */
  key: string
  itemId: string
  extras: string[]
  qty: number
}

export interface CartState {
  lines: CartLine[]
}

export type CartAction =
  | { type: 'add'; itemId: string; extras?: string[]; qty?: number }
  | { type: 'setQty'; key: string; qty: number }
  | { type: 'remove'; key: string }
  | { type: 'clear' }
  | { type: 'hydrate'; state: CartState }

export const STORAGE_KEY = 'bankochow.cart.v1'

export function lineKey(itemId: string, extras: string[] = []): string {
  return [itemId, ...[...extras].sort()].join('+')
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const extras = [...(action.extras ?? [])].sort()
      const key = lineKey(action.itemId, extras)
      const qty = action.qty ?? 1
      const existing = state.lines.find((line) => line.key === key)
      if (existing) {
        return {
          lines: state.lines.map((line) => (line.key === key ? { ...line, qty: line.qty + qty } : line)),
        }
      }
      return { lines: [...state.lines, { key, itemId: action.itemId, extras, qty }] }
    }
    case 'setQty': {
      if (action.qty <= 0) return { lines: state.lines.filter((line) => line.key !== action.key) }
      return {
        lines: state.lines.map((line) => (line.key === action.key ? { ...line, qty: action.qty } : line)),
      }
    }
    case 'remove':
      return { lines: state.lines.filter((line) => line.key !== action.key) }
    case 'clear':
      return { lines: [] }
    case 'hydrate':
      return action.state
  }
}

export function linePrice(line: CartLine): number {
  const item = menuById[line.itemId]
  if (!item) return 0
  const extrasTotal = line.extras.reduce((sum, id) => sum + (extraById[id]?.price ?? 0), 0)
  return (item.price + extrasTotal) * line.qty
}

export function cartTotals(state: CartState) {
  const count = state.lines.reduce((sum, line) => sum + line.qty, 0)
  const subtotal = state.lines.reduce((sum, line) => sum + linePrice(line), 0)
  return { count, subtotal }
}

export function loadCart(): CartState {
  if (typeof localStorage === 'undefined') return { lines: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { lines: [] }
    const parsed = JSON.parse(raw) as CartState
    const lines = (parsed.lines ?? []).filter(
      (line) => menuById[line.itemId] && line.qty > 0 && Array.isArray(line.extras),
    )
    return { lines }
  } catch {
    return { lines: [] }
  }
}

export function persistCart(state: CartState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage can be unavailable in private mode; the cart simply becomes session-only.
  }
}

export interface CartContextValue {
  state: CartState
  count: number
  subtotal: number
  add: (itemId: string, extras?: string[], qty?: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}
