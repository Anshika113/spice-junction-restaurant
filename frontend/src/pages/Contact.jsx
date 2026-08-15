import { useReveal } from '../hooks/useReveal'

export default function Contact({ info, onBook }) {
  const reveal = useReveal('shell two-col')
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(info.maps_query)}`
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(info.maps_query)}&output=embed`

  return (
    <>
      <section className="section--tight" style={{ paddingTop: '2rem' }}>
        <div className="shell">
          <p className="eyebrow">Civil Lines, Kanpur</p>
          <h1 style={{ fontSize: 'var(--step-3)' }}>Find us, call us, book us</h1>
        </div>
      </section>

      <section className="section section--tight">
        <div {...reveal}>
          <div className="panel">
            <h2 style={{ fontSize: 'var(--step-2)', marginBottom: '0.8rem' }}>Reach the restaurant</h2>
            <p style={{ color: 'var(--muted)' }}>
              Phones are answered from 11 am. For orders during the lunch rush, WhatsApp is faster.
            </p>
            <div style={{ display: 'grid', gap: '0.6rem', marginTop: '1rem' }}>
              <a className="btn btn--block" href={`tel:${info.phone_dial}`}>Call {info.phone}</a>
              <a className="btn btn--green btn--block" target="_blank" rel="noreferrer"
                 href={`https://wa.me/${info.whatsapp}?text=${encodeURIComponent('Hi, I want to place an order')}`}>
                Message on WhatsApp
              </a>
              <button type="button" className="btn btn--mustard btn--block" onClick={onBook}>
                Book a table
              </button>
            </div>

            <h3 style={{ fontSize: 'var(--step-1)', margin: '1.6rem 0 0.6rem' }}>Address</h3>
            <p style={{ color: 'var(--muted)' }}>
              {info.address_line1}<br />{info.address_line2}
            </p>
            <a className="btn btn--ghost btn--sm" href={directions} target="_blank" rel="noreferrer">
              Get directions
            </a>

            <h3 style={{ fontSize: 'var(--step-1)', margin: '1.6rem 0 0.6rem' }}>Hours</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.3rem', color: 'var(--muted)' }}>
              {info.hours.map((h) => (
                <li key={h.days} className="price">{h.days} — {h.time}</li>
              ))}
            </ul>
          </div>

          <div className="panel panel--flat" style={{ padding: 0, overflow: 'hidden', minHeight: 380 }}>
            <iframe src={mapSrc} title="Map to Spice Junction" loading="lazy"
                    style={{ width: '100%', height: '100%', minHeight: 380, border: 0, display: 'block' }}
                    referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell panel">
          <h2 style={{ fontSize: 'var(--step-2)', marginBottom: '0.7rem' }}>Privacy policy</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '70ch' }}>
            We collect a name, phone number and address only to deliver your order or hold your table.
            We do not sell that information or use it for anything else, and we delete delivery
            addresses after 90 days. To have your details removed sooner, call {info.phone} or
            message us on WhatsApp and we will do it the same day.
          </p>
          <p style={{ color: 'var(--muted)', maxWidth: '70ch', marginBottom: 0 }}>
            This site does not run advertising trackers. Payment happens on delivery or at the
            counter, so no card details are stored here.
          </p>
        </div>
      </section>
    </>
  )
}
