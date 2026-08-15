import { useEffect, useState } from 'react'
import { api } from '../api/client'

const SLOTS = ['12:30 pm', '1:30 pm', '2:30 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm']
const today = () => new Date().toISOString().slice(0, 10)

export default function TableModal({ info, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', date: today(), guests: 4, note: '' })
  const [slot, setSlot] = useState('8:00 pm')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit() {
    setError('')
    if (!form.name.trim()) return setError('Add the name the table should be under.')
    if (!/^[0-9+\s-]{10,14}$/.test(form.phone.trim())) return setError('Add a phone number we can confirm on.')
    setBusy(true)
    try {
      setDone(await api.bookTable({ ...form, guests: Number(form.guests), slot }))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Book a table"
         onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__card">
        {done ? (
          <div className="done">
            <div className="done__mark">✓</div>
            <h2>Table held</h2>
            <span className="done__ref price">{done.booking_id}</span>
            <p style={{ color: 'var(--muted)' }}>{done.message}</p>
            <div style={{ display: 'grid', gap: '0.6rem', marginTop: '1.2rem' }}>
              <a className="btn btn--green btn--block" target="_blank" rel="noreferrer"
                 href={`https://wa.me/${info.whatsapp}?text=${encodeURIComponent(
                   `Hi, booking ${done.booking_id} — table for ${form.guests} on ${form.date} at ${slot}`)}`}>
                Confirm on WhatsApp
              </a>
              <button type="button" className="btn btn--ghost btn--block" onClick={onClose}>Done</button>
            </div>
          </div>
        ) : (
          <>
            <div className="modal__head">
              <div>
                <p className="eyebrow eyebrow--green">Dine in</p>
                <h2>Book a table</h2>
              </div>
              <button type="button" className="modal__close" onClick={onClose} aria-label="Close">✕</button>
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

            <div className="field--row">
              <label className="field">
                <span>Date</span>
                <input type="date" value={form.date} min={today()} onChange={set('date')} />
              </label>
              <label className="field">
                <span>Guests</span>
                <input type="number" min="1" max="40" value={form.guests} onChange={set('guests')} />
              </label>
            </div>

            <div className="field">
              <span>Time</span>
              <div className="slots">
                {SLOTS.map((s) => (
                  <button key={s} type="button" className="chip" aria-pressed={slot === s}
                          onClick={() => setSlot(s)}>{s}</button>
                ))}
              </div>
            </div>

            <label className="field">
              <span>Anything we should set up?</span>
              <input value={form.note} onChange={set('note')} placeholder="Birthday cake, high chair, corner table" />
            </label>

            <button type="button" className="btn btn--green btn--block btn--lg" onClick={submit} disabled={busy}>
              {busy ? 'Holding table…' : `Book table for ${form.guests}`}
            </button>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.7rem', textAlign: 'center' }}>
              No prepayment. We hold the table 15 minutes past your slot.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
