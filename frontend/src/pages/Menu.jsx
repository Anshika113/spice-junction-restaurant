import MenuBoard from '../components/MenuBoard'

export default function Menu({ info, menu }) {
  return (
    <>
      <section className="section--tight" style={{ paddingTop: '2rem', paddingBottom: '1.5rem' }}>
        <div className="shell">
          <p className="eyebrow">{menu.items.length} dishes · prices include taxes</p>
          <h1 style={{ fontSize: 'var(--step-3)' }}>The full menu</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '52ch', marginTop: '0.6rem' }}>
            Filter it, search it, add what you want. Delivery inside {info.delivery.radius_km} km,
            free above ₹{info.delivery.free_above}.
          </p>
        </div>
      </section>

      <MenuBoard categories={menu.categories} items={menu.items} />
    </>
  )
}
