import { useCallback, useEffect, useRef, useState } from 'react'

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Pointer-driven 3D tilt. Returns props to spread on the element; pass the
 *  element's own classes as `base` so the spread does not overwrite them.
 *  Skipped entirely for touch devices and reduced-motion users. */
export function useTilt(max = 9, base = '') {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  const onMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el || reduced() || e.pointerType === 'touch') return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--ry', `${px * max * 2}deg`)
      el.style.setProperty('--rx', `${-py * max * 2}deg`)
      setActive(true)
    },
    [max],
  )

  const reset = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
    setActive(false)
  }, [])

  useEffect(() => reset, [reset])

  return {
    ref,
    className: `${base} tilt`.trim(),
    'data-active': active,
    onPointerMove: onMove,
    onPointerLeave: reset,
    onPointerCancel: reset,
  }
}
