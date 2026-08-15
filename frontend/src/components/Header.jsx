import { Link, NavLink } from 'react-router-dom'

export default function Header({ info }) {
  return (
    <>
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[0, 1].map((k) => (
            <span key={k}>
              Lunch thali ₹229 &nbsp;·&nbsp; Free delivery above ₹499 &nbsp;·&nbsp;
              Weekend buffet ₹449 &nbsp;·&nbsp; Delivery in {info.delivery.avg_minutes} min average
            </span>
          ))}
        </div>
      </div>

      <header className="header">
        <div className="shell header__inner">
          <Link to="/" className="brand">
            <span className="brand__mark">SJ</span>
            <span>
              <span className="brand__name">{info.name}</span>
              <span className="brand__sub">Civil Lines, Kanpur</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Main">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <Link to="/menu" className="btn btn--sm header__cta">Order online</Link>
        </div>
      </header>
    </>
  )
}
