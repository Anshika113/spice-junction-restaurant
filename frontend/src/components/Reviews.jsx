import { useReveal } from '../hooks/useReveal'

export default function Reviews({ data }) {
  const reveal = useReveal('shell')
  if (!data) return null

  return (
    <section className="section" id="reviews">
      <div {...reveal}>
        <div className="section-head" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <p className="eyebrow eyebrow--green">Google reviews</p>
            <h2>What last month sounded like</h2>
          </div>
          <span className="rating-badge price" style={{ marginLeft: 'auto' }}>
            ★ {data.average} <span style={{ fontWeight: 500, fontSize: '0.8rem' }}>from {data.count} recent</span>
          </span>
        </div>

        <div className="reviews__grid">
          {data.reviews.map((r) => (
            <article className="review" key={r.id}>
              <div className="review__stars" aria-label={`${r.rating} out of 5`}>
                {'★'.repeat(r.rating)}
                <span style={{ color: 'var(--line)' }}>{'★'.repeat(5 - r.rating)}</span>
              </div>
              <p className="review__text">{r.text}</p>
              <p className="review__who">
                {r.author}
                <small>{r.when}</small>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
