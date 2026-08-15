import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Offers from '../components/Offers'
import PartyBooking from '../components/PartyBooking'
import Reviews from '../components/Reviews'
import DishCard from '../components/DishCard'
import { useReveal } from '../hooks/useReveal'

export default function Home({ info, offers, menu, reviews, onBook }) {
  const reveal = useReveal('section')
  const best = (menu?.items ?? []).filter((i) => i.best).slice(0, 6)

  return (
    <>
      <Hero info={info} onBook={onBook} />
      {offers && <Offers offers={offers} />}

      {best.length > 0 && (
        <section {...reveal}>
          <div className="shell">
            <div className="section-head" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div>
                <p className="eyebrow">Ordered most this month</p>
                <h2>Start here</h2>
              </div>
              <Link className="btn btn--ghost btn--sm" to="/menu" style={{ marginLeft: 'auto' }}>
                See all {menu.items.length} dishes
              </Link>
            </div>
            <div className="menu-grid">
              {best.map((i) => (
                <DishCard key={i.id} item={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <PartyBooking info={info} />
      <Reviews data={reviews} />
    </>
  )
}
