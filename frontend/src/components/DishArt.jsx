/* Placeholder food art. Deterministic from the dish id, so every item looks
   like itself. Swap these for real WebP photographs before going live —
   stock photos read as fake and cost you the trust you just built. */

const PALETTES = [
  ['#e23a2e', '#f5a623'],
  ['#1f6b4a', '#f5a623'],
  ['#f5a623', '#e23a2e'],
  ['#b62a20', '#f5a623'],
  ['#164e36', '#8fbf6a'],
]

const hash = (s) => [...s].reduce((a, c) => (a * 33 + c.charCodeAt(0)) % 9973, 7)

export default function DishArt({ id = 'x', veg = true, size = 62 }) {
  const h = hash(id)
  const [a, b] = PALETTES[h % PALETTES.length]
  const bits = 5 + (h % 4)

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-hidden="true">
      <rect width="100" height="100" fill="#fff7f0" />
      <circle cx="50" cy="50" r="34" fill={a} />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#191512" strokeWidth="3" />
      <circle cx="50" cy="50" r="22" fill={b} opacity="0.85" />
      {Array.from({ length: bits }).map((_, i) => {
        const ang = ((h + i * 71) % 360) * (Math.PI / 180)
        const rad = 10 + ((h + i * 13) % 14)
        return (
          <circle
            key={i}
            cx={50 + Math.cos(ang) * rad}
            cy={50 + Math.sin(ang) * rad}
            r={2.6 + (i % 3)}
            fill={veg ? '#1f6b4a' : '#191512'}
            opacity="0.75"
          />
        )
      })}
      <path d="M28 66c8 6 36 6 44 0" stroke="#191512" strokeWidth="2.5" fill="none" opacity="0.35" />
    </svg>
  )
}
