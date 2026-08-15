import { useEffect, useRef, useState } from 'react'

/** Reveals an element the first time it scrolls into view.
 *  Pass the element's own classes as `base` — the returned props are spread,
 *  so a className on the JSX tag itself would be overwritten. */
export function useReveal(base = '', threshold = 0.15) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    if (typeof IntersectionObserver === 'undefined') return setShown(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown, threshold])

  return { ref, className: `${base} reveal`.trim(), 'data-shown': shown }
}
