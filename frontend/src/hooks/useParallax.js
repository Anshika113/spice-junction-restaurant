import { useEffect, useRef } from 'react'

/** Gentle scroll parallax on the depth of a 3D element. */
export function useParallax(strength = 6) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const r = el.getBoundingClientRect()
        const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
        el.style.transform =
          `perspective(1200px) rotateX(${(-progress * strength).toFixed(2)}deg) ` +
          `translate3d(0, ${(progress * -10).toFixed(1)}px, 0)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength])

  return ref
}
