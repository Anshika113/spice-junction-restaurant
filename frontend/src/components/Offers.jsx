import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import Photo from './Photo'
import { IMG } from '../media'

function OfferCard({ offer }) {
  const [flipped, setFlipped] = useState(false)
  const reveal = useReveal()

  return (
    <div {...reveal}>
      <button
        type="button"
        className="flip"
        data-flipped={flipped}
        aria-pressed={flipped}
        aria-label={`${offer.name} — show details`}
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        style={{ width: '100%' }}
      >
        <div className="flip__inner">
          <div className={`flip__face flip__face--${offer.tone}`}>
            <span className="flip__photo">
              <Photo src={IMG.offer(offer.id)} fallbackId={offer.id} alt="" />
            </span>
            <span className="flip__window">{offer.window}</span>
            <span className="flip__name">{offer.name}</span>
            <p className="flip__line">{offer.line}</p>
            <div className="flip__price price">
              <b>₹{offer.price}</b>
              <s>₹{offer.was}</s>
            </div>
            <span className="flip__hint">Tap for details</span>
          </div>

          <div className="flip__face flip__face--back">
            <span className="flip__window" style={{ color: 'var(--tomato)' }}>The fine print</span>
            <span className="flip__name" style={{ fontSize: 'var(--step-1)' }}>{offer.name}</span>
            <p className="flip__line">{offer.detail}</p>
            <div className="flip__price price">
              <b>₹{offer.price}</b>
              <span style={{ fontSize: 'var(--step--1)' }}>
                you save ₹{offer.was - offer.price}
              </span>
            </div>
            <span className="flip__hint">Tap to go back</span>
          </div>
        </div>
      </button>
    </div>
  )
}

export default function Offers({ offers }) {
  return (
    <section className="offers section" id="offers">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Running now</p>
          <h2>Three offers, real prices</h2>
          <p>No "starting from". These are the prices you pay at the table and on delivery.</p>
        </div>
        <div className="offers__grid">
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </div>
    </section>
  )
}
