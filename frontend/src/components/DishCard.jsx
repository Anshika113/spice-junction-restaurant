import { useState } from 'react'
import { useCart } from './CartContext'
import Photo from './Photo'
import { IMG } from '../media'
import { Chilli } from './Icons'

export default function DishCard({ item }) {
  const { add, dec, qtyOf } = useCart()
  const [portion, setPortion] = useState('full')
  const price = portion === 'half' && item.half ? item.half : item.price
  const qty = qtyOf(item.id, portion)
  const cartKey = `${item.id}:${portion}`

  return (
    <article className="dish">
      <div className="dish__top">
        <div className="dish__art">
          <Photo src={IMG.dish(item.id)} fallbackId={item.id} veg={item.veg} alt="" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="dish__title">
            <span className={`veg-dot${item.veg ? '' : ' veg-dot--nonveg'}`}
                  title={item.veg ? 'Veg' : 'Non-veg'}>
              <i />
              <span className="sr-only">{item.veg ? 'Veg' : 'Non-veg'}</span>
            </span>
            <h4>{item.name}</h4>
            {item.best && <span className="tag tag--best">Bestseller</span>}
            {item.jain && <span className="tag tag--jain">Jain</span>}
          </div>
          <p className="dish__desc">{item.desc}</p>
        </div>
      </div>

      <div className="dish__meta">
        <span className="spice" aria-label={`Spice level ${item.spice} of 3`}>
          {[1, 2, 3].map((n) => (
            <Chilli key={n} on={n <= item.spice} />
          ))}
        </span>

        {item.half && (
          <span className="portion" role="group" aria-label={`Portion size for ${item.name}`}>
            <button type="button" aria-pressed={portion === 'half'} onClick={() => setPortion('half')}>
              Half
            </button>
            <button type="button" aria-pressed={portion === 'full'} onClick={() => setPortion('full')}>
              Full
            </button>
          </span>
        )}
      </div>

      <div className="dish__meta">
        <span className="dish__price price">₹{price}</span>
        {item.half && portion === 'full' && (
          <span className="dish__half price">half ₹{item.half}</span>
        )}

        <span className="dish__add">
          {qty === 0 ? (
            <button type="button" className="btn btn--sm" onClick={() => add(item, portion)}>
              Add
            </button>
          ) : (
            <span className="stepper">
              <button type="button" onClick={() => dec(cartKey)} aria-label={`Remove one ${item.name}`}>
                −
              </button>
              <span className="price">{qty}</span>
              <button type="button" onClick={() => add(item, portion)} aria-label={`Add one ${item.name}`}>
                +
              </button>
            </span>
          )}
        </span>
      </div>
    </article>
  )
}
