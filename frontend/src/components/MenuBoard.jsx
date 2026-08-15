import { useMemo, useState } from 'react'
import DishCard from './DishCard'
import { Search } from './Icons'

const FILTERS = [
  { id: 'veg', label: 'Veg', test: (i) => i.veg },
  { id: 'nonveg', label: 'Non-veg', test: (i) => !i.veg },
  { id: 'jain', label: 'Jain', test: (i) => i.jain },
  { id: 'best', label: 'Bestseller', test: (i) => i.best },
  { id: 'cheap', label: 'Under ₹200', test: (i) => (i.half ?? i.price) < 200 },
]

export default function MenuBoard({ categories, items }) {
  const [cat, setCat] = useState('all')
  const [active, setActive] = useState([])
  const [q, setQ] = useState('')

  const toggle = (id) =>
    setActive((cur) => (cur.includes(id) ? cur.filter((f) => f !== id) : [...cur, id]))

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return items.filter((i) => {
      if (cat !== 'all' && i.cat !== cat) return false
      if (needle && !`${i.name} ${i.desc}`.toLowerCase().includes(needle)) return false
      return active.every((f) => FILTERS.find((x) => x.id === f).test(i))
    })
  }, [items, cat, active, q])

  const groups = useMemo(
    () =>
      categories
        .map((c) => ({ ...c, items: filtered.filter((i) => i.cat === c.id) }))
        .filter((g) => g.items.length),
    [categories, filtered],
  )

  return (
    <>
      <div className="menu-bar">
        <div className="shell">
          <div className="menu-bar__row" aria-label="Menu categories">
            <button type="button" className="chip chip--cat" aria-pressed={cat === 'all'}
                    onClick={() => setCat('all')}>
              Everything
            </button>
            {categories.map((c) => (
              <button key={c.id} type="button" className="chip chip--cat"
                      aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                {c.name}
              </button>
            ))}
          </div>

          <div className="menu-bar__row">
            {FILTERS.map((f) => (
              <button key={f.id} type="button"
                      className={`chip${f.id === 'veg' || f.id === 'jain' ? ' chip--veg' : ''}`}
                      aria-pressed={active.includes(f.id)} onClick={() => toggle(f.id)}>
                {f.label}
              </button>
            ))}
            {(active.length > 0 || cat !== 'all' || q) && (
              <button type="button" className="chip"
                      onClick={() => { setActive([]); setCat('all'); setQ('') }}>
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="shell section section--tight">
        <label className="search" style={{ marginBottom: '1.5rem' }}>
          <Search />
          <span className="sr-only">Search the menu</span>
          <input
            type="search"
            value={q}
            placeholder="Search a dish — paneer, noodles, thali…"
            onChange={(e) => setQ(e.target.value)}
          />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label="Clear search">✕</button>
          )}
        </label>

        {groups.length === 0 ? (
          <div className="empty">
            <h3>Nothing matches those filters</h3>
            <p style={{ color: 'var(--muted)' }}>
              Try removing one filter, or search for a dish by name.
            </p>
            <button type="button" className="btn btn--green"
                    onClick={() => { setActive([]); setCat('all'); setQ('') }}>
              Show the full menu
            </button>
          </div>
        ) : (
          groups.map((g) => (
            <section className="menu-group" key={g.id} id={g.id}>
              <div className="menu-group__head">
                <h3>{g.name}</h3>
                <span>{g.note} · {g.items.length} items</span>
              </div>
              <div className="menu-grid">
                {g.items.map((i) => (
                  <DishCard key={i.id} item={i} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  )
}
