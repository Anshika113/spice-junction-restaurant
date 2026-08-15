import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'

const CartCtx = createContext(null)
const key = (id, portion) => `${id}:${portion}`

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { item, portion } = action
      const k = key(item.id, portion)
      const price = portion === 'half' && item.half ? item.half : item.price
      const existing = state.lines[k]
      return {
        ...state,
        bump: state.bump + 1,
        lines: {
          ...state.lines,
          [k]: existing
            ? { ...existing, qty: existing.qty + 1 }
            : { id: item.id, name: item.name, portion, price, qty: 1, veg: item.veg },
        },
      }
    }
    case 'dec': {
      const line = state.lines[action.key]
      if (!line) return state
      const next = { ...state.lines }
      if (line.qty <= 1) delete next[action.key]
      else next[action.key] = { ...line, qty: line.qty - 1 }
      return { ...state, lines: next }
    }
    case 'remove': {
      const next = { ...state.lines }
      delete next[action.key]
      return { ...state, lines: next }
    }
    case 'clear':
      return { lines: {}, bump: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { lines: {}, bump: 0 })

  const add = useCallback((item, portion = 'full') => dispatch({ type: 'add', item, portion }), [])
  const dec = useCallback((k) => dispatch({ type: 'dec', key: k }), [])
  const remove = useCallback((k) => dispatch({ type: 'remove', key: k }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  const value = useMemo(() => {
    const entries = Object.entries(state.lines)
    const count = entries.reduce((s, [, l]) => s + l.qty, 0)
    const subtotal = entries.reduce((s, [, l]) => s + l.qty * l.price, 0)
    return {
      lines: entries.map(([k, l]) => ({ key: k, ...l })),
      count,
      subtotal,
      bump: state.bump,
      qtyOf: (id, portion) => state.lines[key(id, portion)]?.qty ?? 0,
      add,
      dec,
      remove,
      clear,
    }
  }, [state, add, dec, remove, clear])

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
