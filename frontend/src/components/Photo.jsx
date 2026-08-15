import { useState } from 'react'
import DishArt from './DishArt'

/** An <img> that never leaves a hole in the layout. If the file is missing or
 *  fails to load, it swaps to the drawn plate art keyed off `fallbackId`.
 *  Pass alt="" when the surrounding text already names the dish. */
export default function Photo({ src, fallbackId = 'x', alt = '', veg = true, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={`photo photo--fallback ${className}`.trim()} aria-hidden={alt === ''}>
        <DishArt id={fallbackId} veg={veg} size="100%" />
      </span>
    )
  }

  return (
    <img
      className={`photo ${className}`.trim()}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
