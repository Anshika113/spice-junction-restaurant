/* Generates the temporary demo images into public/img/.
 *
 * These are stand-ins so the layout is never empty during a pitch. They are
 * generated, not stock photography — stock food photos read as fake and cost
 * you the trust the rest of the page is building. When the client hands over
 * real shots, drop them into public/img/ and edit src/media.js. Nothing else
 * changes.
 *
 * Run: npm run images   (also runs automatically before dev and build)
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

const here = dirname(fileURLToPath(import.meta.url))
const content = JSON.parse(
  readFileSync(resolve(here, '../../backend/app/data/content.json'), 'utf8'),
)

const OUT = resolve(here, '../public/img')
mkdirSync(resolve(OUT, 'dishes'), { recursive: true })
mkdirSync(resolve(OUT, 'offers'), { recursive: true })

const CHAR = '#191512'
const WARM = '#FFF7F0'

const PAIRS = [
  ['#E23A2E', '#F5A623'],
  ['#1F6B4A', '#8FBF6A'],
  ['#F5A623', '#E23A2E'],
  ['#B62A20', '#F0C86A'],
  ['#164E36', '#F5A623'],
  ['#D8582B', '#F7E0A8'],
]

const hash = (s) => [...s].reduce((a, c) => (a * 33 + c.charCodeAt(0)) % 9973, 7)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/* A plate seen from above: rim, gravy, garnish. Deterministic from the id so
   every dish keeps the same picture across reloads. */
function plate(id, { veg = true, w = 600, h = 600, pair = null } = {}) {
  const n = hash(id)
  const [a, b] = pair ?? PAIRS[n % PAIRS.length]
  const cx = w / 2
  const cy = h / 2
  const r = Math.min(w, h) * 0.34
  const garnish = veg ? '#1F6B4A' : '#7A2B18'
  const bits = 7 + (n % 6)

  const specks = Array.from({ length: bits }, (_, i) => {
    const ang = ((n + i * 67) % 360) * (Math.PI / 180)
    const rad = r * (0.18 + ((n + i * 17) % 40) / 100)
    const x = (cx + Math.cos(ang) * rad).toFixed(1)
    const y = (cy + Math.sin(ang) * rad).toFixed(1)
    const rr = (r * 0.05 + (i % 3) * r * 0.022).toFixed(1)
    return `<circle cx="${x}" cy="${y}" r="${rr}" fill="${garnish}" opacity="0.72"/>`
  }).join('')

  return `<defs>
    <linearGradient id="bg-${n}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${b}" stop-opacity="0.32"/>
      <stop offset="1" stop-color="${a}" stop-opacity="0.5"/>
    </linearGradient>
    <radialGradient id="gl-${n}" cx="0.34" cy="0.28" r="0.75">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${WARM}"/>
  <rect width="${w}" height="${h}" fill="url(#bg-${n})"/>
  <rect width="${w}" height="${h}" fill="url(#gl-${n})"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 1.32}" fill="${WARM}" stroke="${CHAR}" stroke-width="${r * 0.045}"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 1.1}" fill="none" stroke="${CHAR}" stroke-width="${r * 0.02}" opacity="0.35"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${a}"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 0.66}" fill="${b}" opacity="0.9"/>
  ${specks}
  <path d="M${cx - r * 0.62} ${cy + r * 0.48}q${r * 0.62} ${r * 0.34} ${r * 1.24} 0"
        fill="none" stroke="${CHAR}" stroke-width="${r * 0.035}" opacity="0.28"/>`
}

function watermark(w, h, label) {
  const pad = Math.round(w * 0.028)
  const bw = Math.round(w * 0.36)
  const bh = Math.round(h * 0.075)
  return `<g>
    <rect x="${pad}" y="${h - bh - pad}" width="${bw}" height="${bh}" rx="${bh * 0.28}"
          fill="${CHAR}" opacity="0.86"/>
    <text x="${pad + bh * 0.4}" y="${h - bh / 2 - pad + bh * 0.2}" fill="${WARM}"
          font-family="Inter, system-ui, sans-serif" font-size="${Math.round(bh * 0.42)}"
          letter-spacing="1.4">${esc(label)}</text>
  </g>`
}

function caption(w, h, text) {
  const size = Math.round(h * 0.062)
  return `<text x="${Math.round(w * 0.05)}" y="${Math.round(h * 0.14)}" fill="${CHAR}"
      font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="${size}"
      letter-spacing="-0.4">${esc(text)}</text>`
}

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">${body}</svg>\n`

let count = 0

// Dish tiles — small, so no text on them.
for (const item of content.menu) {
  writeFileSync(
    resolve(OUT, `dishes/${item.id}.svg`),
    svg(600, 600, plate(item.id, { veg: item.veg })),
    'utf8',
  )
  count++
}

// Offer cards — wide, captioned.
for (const offer of content.offers) {
  const body =
    plate(offer.id, { veg: true, w: 960, h: 540 }) +
    caption(960, 540, offer.name) +
    watermark(960, 540, 'DEMO IMAGE — REPLACE')
  writeFileSync(resolve(OUT, `offers/${offer.id}.svg`), svg(960, 540, body), 'utf8')
  count++
}

// Hero — the one big food picture.
writeFileSync(
  resolve(OUT, 'hero.svg'),
  svg(900, 900, plate('hero-butter-chicken', { veg: false, w: 900, h: 900, pair: ['#E23A2E', '#F5A623'] })),
  'utf8',
)
count++

// Open graph / share card.
writeFileSync(
  resolve(OUT, 'og.svg'),
  svg(
    1200,
    630,
    plate('og-card', { veg: false, w: 1200, h: 630, pair: ['#1F6B4A', '#F5A623'] }) +
      caption(1200, 630, 'Spice Junction · Civil Lines, Kanpur') +
      watermark(1200, 630, 'DEMO IMAGE — REPLACE'),
  ),
  'utf8',
)
count++

console.log(`[images] wrote ${count} placeholder images -> public/img/`)