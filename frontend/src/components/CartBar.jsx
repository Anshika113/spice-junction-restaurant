import { useEffect, useRef, useState } from 'react'
import { useCart } from './CartContext'

export default function CartBar({ onCheckout }) {
  const { count, subtotal, bump } = useCart()
  const [pulse, setPulse] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) { first.current = false; return }
    setPulse(true)
    const t = setTimeout(() => setPulse(false), 380)
    return () => clearTimeout(t)
  }, [bump])

  return (
    <div className="cartbar" data-open={count > 0} aria-hidden={count === 0}>
      <span className="cartbar__count price" data-bump={pulse}>{count}</span>
      <span>
        <span className="cartbar__label">Subtotal</span>
        <br />
        <span className="cartbar__total price">₹{subtotal}</span>
      </span>
      <span className="cartbar__actions">
        <button type="button" className="btn btn--mustard" onClick={onCheckout} tabIndex={count ? 0 : -1}>
          Review order
        </button>
      </span>
    </div>
  )
}
