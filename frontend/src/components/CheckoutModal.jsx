import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useCart } from './CartContext'

export default function CheckoutModal({ info, onClose }) {
  const { lines, subtotal, count, add, dec, remove, clear } = useCart()
  const [mode, setMode] = useState('delivery')
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const d = info.delivery
  const fee = mode === 'takeaway' || subtotal >= d.free_above ? 0 : d.fee
  const total = subtotal + fee
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit() {
    setError('')
    if (!form.name.trim()) return setError('Add a name so the kitchen knows whose order this is.')
    if (!/^[0-9+\s-]{10,14}$/.test(form.phone.trim())) return setError('Add a 10-digit phone number we can call.')
    if (mode === 'delivery' && !form.address.trim()) return setError('Add a delivery address, including the landmark.')

    setBusy(true)
    try {
      const res = await api.placeOrder({
        mode,
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: mode === 'delivery' ? form.address.trim() : null,
        note: form.note.trim() || null,
        items: lines.map(({ id, name, portion, qty, price }) => ({ id, name, portion, qty, price })),
      })
      setDone(res)
      clear()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="modal" role="dialog" aria-modal="true" aria-label="Order placed"
           onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal__card">
          <div className="done">
            <div className="done__mark">✓</div>
            <h2>Order placed</h2>
            <span className="done__ref price">{done.order_id}</span>
            <p style={{ color: 'var(--muted)' }}>
              ₹{done.total} · arriving in about {done.eta_minutes} minutes.
              The kitchen calls {form.phone} if anything is unclear.
            </p>
            <div style={{ display: 'grid', gap: '0.6rem', marginTop: '1.2rem' }}>
              <a className="btn btn--green btn--block"
                 href={`https://wa.me/${info.whatsapp}?text=${done.whatsapp_text}`}
                 target="_blank" rel="noreferrer">
                Send this order on WhatsApp
              </a>
              <button type="button" className="btn btn--ghost btn--block" onClick={onClose}>
                Back to the menu
              </button>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '1rem' }}>
              Demo build — nothing is stored and no payment is taken.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Review your order"
         onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__card">
        <div className="modal__head">
          <div>
            <p className="eyebrow">{count} item{count === 1 ? '' : 's'}</p>
            <h2>Your order</h2>
          </div>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <ul className="lines">
          {lines.map((l) => (
            <li key={l.key}>
              <span className="stepper">
                <button type="button" onClick={() => dec(l.key)} aria-label={`One less ${l.name}`}>−</button>
                <span className="price">{l.qty}</span>
                <button type="button"
                        onClick={() => add({ id: l.id, name: l.name, price: l.price, half: l.price, veg: l.veg }, l.portion)}
                        aria-label={`One more ${l.name}`}>+</button>
              </span>
              <span className="lines__name">
                {l.name}
                {l.portion === 'half' && <small>Half plate</small>}
              </span>
              <b className="price">₹{l.qty * l.price}</b>
              <button type="button" className="modal__close" style={{ width: 28, height: 28 }}
                      onClick={() => remove(l.key)} aria-label={`Remove ${l.name}`}>✕</button>
            </li>
          ))}
        </ul>

        <div className="slots" style={{ marginBottom: '1rem' }}>
          <button type="button" className="chip" aria-pressed={mode === 'delivery'}
                  onClick={() => setMode('delivery')}>Delivery</button>
          <button type="button" className="chip" aria-pressed={mode === 'takeaway'}
                  onClick={() => setMode('takeaway')}>Takeaway</button>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="field--row">
          <label className="field">
            <span>Name</span>
            <input value={form.name} onChange={set('name')} autoComplete="name" />
          </label>
          <label className="field">
            <span>Phone</span>
            <input value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
          </label>
        </div>

        {mode === 'delivery' && (
          <label className="field">
            <span>Address</span>
            <textarea value={form.address} onChange={set('address')}
                      placeholder="Flat, building, landmark" autoComplete="street-address" />
          </label>
        )}

        <label className="field">
          <span>Anything for the kitchen?</span>
          <input value={form.note} onChange={set('note')} placeholder="Less spicy, no onion, extra plates" />
        </label>

        <div className="totals price">
          <div><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div>
            <span>Delivery</span>
            <span>{fee === 0 ? (mode === 'takeaway' ? 'Takeaway' : 'Free') : `₹${fee}`}</span>
          </div>
          <div><span>Total</span><span>₹{total}</span></div>
        </div>

        <button type="button" className="btn btn--block btn--lg" style={{ marginTop: '1rem' }}
                onClick={submit} disabled={busy || count === 0}>
          {busy ? 'Placing order…' : `Place order · ₹${total}`}
        </button>
        <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.7rem', textAlign: 'center' }}>
          Pay on delivery by cash, card or UPI. No account needed.
        </p>
      </div>
    </div>
  )
}
