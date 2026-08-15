import { useState } from 'react'
import { api } from '../api/client'
import { useReveal } from '../hooks/useReveal'
import { useTilt } from '../hooks/useTilt'

const KINDS = [
  { id: 'buffet', label: 'Weekend buffet' },
  { id: 'party', label: 'Private party' },
  { id: 'corporate', label: 'Corporate lunch' },
]
const today = () => new Date().toISOString().slice(0, 10)

export default function PartyBooking({ info }) {
  const reveal = useReveal('shell two-col')
  const tilt = useTilt(6, 'panel')
  const [form, setForm] = useState({ name: '', phone: '', date: today(), guests: 40, note: '' })
  const [kind, setKind] = useState('party')
  const [vegOnly, setVegOnly] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [quote, setQuote] = useState(null)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const guests = Number(form.guests) || 0
  const plate = ({ buffet: 449, party: 649, corporate: 549 }[kind] ?? 449)
    - (vegOnly ? 50 : 0) - (guests >= 100 ? 30 : 0)

  async function submit() {
    setError('')
    if (!form.name.trim()) return setError('Add a name for the booking.')
    if (!/^[0-9+\s-]{10,14}$/.test(form.phone.trim())) return setError('Add a phone number for the manager to call.')
    if (guests < 10) return setError('Party bookings start at 10 guests. For fewer, book a normal table.')
    setBusy(true)
    try {
      setQuote(await api.bookParty({ ...form, guests, kind, veg_only: vegOnly }))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="section" id="party" style={{ background: 'var(--warm-white)' }}>
      <div {...reveal}>
        <div>
          <p className="eyebrow">10 to 400 guests</p>
          <h2 style={{ fontSize: 'var(--step-3)' }}>Buffet &amp; party bookings</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '48ch' }}>
            Birthdays, kitty parties, office lunches and small receptions. Tell us the headcount
            and the date, and you get a per-plate estimate on this screen — not after three phone calls.
          </p>
          <ul className="hero__lines">
            <li><i>▮</i><span>Hall seats 120, or 60 in the private section.</span></li>
            <li><i>▮</i><span>Pure-veg menus cost ₹50 less per plate.</span></li>
            <li><i>▮</i><span>Above 100 guests, another ₹30 per plate comes off.</span></li>
            <li><i>▮</i><span>Advance is 25%, adjustable against the final bill.</span></li>
          </ul>
        </div>

        <div className="scene">
          <div {...tilt}>
            {quote ? (
              <div className="done">
                <div className="done__mark">✓</div>
                <h2>Estimate ready</h2>
                <span className="done__ref price">₹{quote.estimate.toLocaleString('en-IN')}</span>
                <p style={{ color: 'var(--muted)' }}>{quote.message}</p>
                <div style={{ display: 'grid', gap: '0.6rem', marginTop: '1rem' }}>
                  <a className="btn btn--green btn--block" target="_blank" rel="noreferrer"
                     href={`https://wa.me/${info.whatsapp}?text=${encodeURIComponent(
                       `Hi, enquiry ${quote.booking_id} — ${kind} for ${guests} guests on ${form.date}`)}`}>
                    Send this on WhatsApp
                  </a>
                  <button type="button" className="btn btn--ghost btn--block" onClick={() => setQuote(null)}>
                    Change the numbers
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="field">
                  <span>What is it for?</span>
                  <div className="slots">
                    {KINDS.map((k) => (
                      <button key={k.id} type="button" className="chip" aria-pressed={kind === k.id}
                              onClick={() => setKind(k.id)}>{k.label}</button>
                    ))}
                  </div>
                </div>

                {error && <div className="error">{error}</div>}

                <div className="field--row">
                  <label className="field">
                    <span>Guests</span>
                    <input type="number" min="10" max="400" value={form.guests} onChange={set('guests')} />
                  </label>
                  <label className="field">
                    <span>Date</span>
                    <input type="date" min={today()} value={form.date} onChange={set('date')} />
                  </label>
                </div>

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

                <div className="slots" style={{ marginBottom: '1rem' }}>
                  <button type="button" className="chip chip--veg" aria-pressed={vegOnly}
                          onClick={() => setVegOnly((v) => !v)}>Pure veg menu</button>
                </div>

                <div className="totals price" style={{ marginBottom: '1rem' }}>
                  <div><span>Per plate</span><span>₹{plate}</span></div>
                  <div><span>Estimate</span><span>₹{(plate * guests).toLocaleString('en-IN')}</span></div>
                </div>

                <button type="button" className="btn btn--block btn--lg" onClick={submit} disabled={busy}>
                  {busy ? 'Getting your estimate…' : 'Get my estimate'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
