import { Link } from 'react-router-dom'
import { useParallax } from '../hooks/useParallax'
import { useTilt } from '../hooks/useTilt'
import Photo from './Photo'
import { IMG } from '../media'

export default function Hero({ info, onBook }) {
  const parallaxRef = useParallax(5)
  const tilt = useTilt(11, 'plate')

  return (
    <section className="hero">
      <div className="shell hero__grid">
        <div>
          <p className="eyebrow">Since {info.since} · Civil Lines, Kanpur</p>
          <h1>
            North Indian,
            <br />
            Chinese &amp; <em>Tandoor</em>
          </h1>

          <ul className="hero__lines">
            <li><i>▮</i><span><b>Three kitchens, one menu.</b> Gravy, wok and clay oven running side by side.</span></li>
            <li><i>▮</i><span><b>Open 11 am to 11 pm</b>, till midnight Friday to Sunday.</span></li>
            <li><i>▮</i><span><b>Delivery inside {info.delivery.radius_km} km</b>, {info.delivery.avg_minutes} minutes on average. Free above ₹{info.delivery.free_above}.</span></li>
          </ul>

          <div className="hero__cta">
            <Link className="btn btn--lg" to="/menu">Order online</Link>
            <button type="button" className="btn btn--lg btn--green" onClick={onBook}>
              Book a table
            </button>
          </div>
          <p className="hero__note">
            {info.seats} seats · Family seating · Parking for 30 · Card, UPI and cash accepted
          </p>
        </div>

        <div className="scene" ref={parallaxRef}>
          <div {...tilt}>
            <div className="plate__ring" />
            <div className="plate__ring plate__ring--2" />
            <div className="plate__ring plate__ring--3" />
            <div className="plate__food">
              <Photo
                src={IMG.hero()}
                fallbackId="hero-butter-chicken"
                veg={false}
                alt="Butter chicken, the kitchen's most ordered dish"
                className="photo--round"
                eager
              />
            </div>
            <div className="plate__tag plate__tag--a">
              <small>Most ordered</small>
              Butter Chicken
            </div>
            <div className="plate__tag plate__tag--b">
              <small>Lunch thali</small>
              ₹229 · 12 to 3:30
            </div>
            <div className="plate__tag plate__tag--c">
              <small>Google rating</small>
              4.8 ★ · 1,240 reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
