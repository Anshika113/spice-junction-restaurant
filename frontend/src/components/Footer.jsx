import { Link } from 'react-router-dom'
import { USING_PLACEHOLDERS } from '../media'

export default function Footer({ info }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(info.maps_query)}&output=embed`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(info.maps_query)}`

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            {/* NAP in text, matching the Google Business Profile letter for letter */}
            <h4>Spice Junction</h4>
            <p>
              {info.address_line1}
              <br />
              {info.address_line2}
              <br />
              <a href={`tel:${info.phone_dial}`}>{info.phone}</a>
            </p>
            <a className="btn btn--sm btn--mustard" href={directions} target="_blank" rel="noreferrer">
              Get directions
            </a>
          </div>

          <div>
            <h4>Hours</h4>
            <ul>
              {info.hours.map((h) => (
                <li key={h.days}>
                  {h.days}
                  <br />
                  <strong style={{ color: 'var(--warm-white)' }}>{h.time}</strong>
                </li>
              ))}
            </ul>
            <h4 style={{ marginTop: '1rem' }}>Also on</h4>
            <ul>
              {info.aggregators.map((a) => (
                <li key={a.label}>
                  <a href={a.url} target="_blank" rel="noreferrer">{a.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Delivery area</h4>
            <p>
              We deliver up to {info.delivery.radius_km} km. Free above ₹{info.delivery.free_above},
              otherwise ₹{info.delivery.fee}.
            </p>
            <ul>
              <li>{info.delivery.areas.join(' · ')}</li>
            </ul>
            <div className="upi" style={{ marginTop: '1rem' }}>
              <svg viewBox="0 0 48 48" width="46" height="46" aria-hidden="true">
                <rect width="48" height="48" rx="6" fill="#fff7f0" />
                {[6, 14, 22, 30, 38].map((x) =>
                  [6, 14, 22, 30, 38].map((y) =>
                    (x * y) % 3 === 0 ? (
                      <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="#191512" />
                    ) : null,
                  ),
                )}
              </svg>
              <div>
                <strong style={{ color: 'var(--warm-white)', fontSize: '0.8rem' }}>Pay by UPI</strong>
                <br />
                <span style={{ fontSize: '0.72rem' }}>{info.upi}</span>
              </div>
            </div>
          </div>

          <div className="footer__map">
            <iframe
              src={mapSrc}
              title="Spice Junction on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Spice Junction. All rights reserved.</span>

          <span className="credit">
            Design &amp; Developed by{' '}
            <a href="tel:+918604438328">Anshika</a>
          </span>

          <Link to="/contact">Privacy policy</Link>
        </div>
      </div>
    </footer>
  )
}
