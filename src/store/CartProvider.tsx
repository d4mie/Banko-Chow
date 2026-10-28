import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { successHaptic, tapHaptic } from '../lib/native'
import { CartContext, cartReducer, cartTotals, loadCart, persistCart, type CartContextValue } from './cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart)

  useEffect(() => {
    persistCart(state)
  }, [state])

  const add = useCallback<CartContextValue['add']>((itemId, extras, qty) => {
    dispatch({ type: 'add', itemId, extras, qty })
    successHaptic()
  }, [])
  const setQty = useCallback<CartContextValue['setQty']>((key, qty) => {
    dispatch({ type: 'setQty', key, qty })
    tapHaptic()
  }, [])
  const remove = useCallback<CartContextValue['remove']>((key) => {
    dispatch({ type: 'remove', key })
    tapHaptic()
  }, [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  const value = useMemo<CartContextValue>(() => {
    const { count, subtotal } = cartTotals(state)
    return { state, count, subtotal, add, setQty, remove, clear }
  }, [state, add, setQty, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
