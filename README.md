# Spice Junction — Restaurant

Site for a busy multi-cuisine family restaurant. The job of every screen is
the same: place an order or book a table in under three taps.

React (Vite, JS) frontend + FastAPI backend. **No database is connected** — that
is deliberate for a pitch demo.

---

## Run it

### Frontend only (this is all you need for a demo)

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

The site runs fully static. `src/api/static.js` mirrors every API route in the
browser and reads the same `content.json` the backend uses, so there is nothing
to start and nothing to break in front of a client.

### With the FastAPI backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate    # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000                # http://localhost:8000/docs
```

Then, in `frontend/.env`:

```
VITE_USE_API=true
```

Restart `npm run dev`. Vite proxies `/api` to port 8000. Orders and bookings now
hit real endpoints and land in an in-memory list (`backend/app/store.py`) that
clears on restart — that list is where a real DB would go.

### Build for production

```bash
cd frontend && npm run build     # -> frontend/dist, drop this on Cloudflare Pages
```

---

## Editing the content

Everything the client sees — dishes, prices, offers, hours, address, delivery
areas, reviews — lives in **one file**:

```
backend/app/data/content.json
```

`npm run dev` and `npm run build` copy it into `frontend/src/content/` automatically
(`frontend/scripts/sync-content.mjs`). Edit the JSON, refresh, done. This is also
the file an admin panel would write to before a database exists — useful line when
you pitch the Growth tier.

Swap for the real client before the meeting:
- `info.name`, `info.address_line1/2`, `info.phone`, `info.whatsapp`, `info.upi`
- `info.maps_query` (drives both map embeds and the directions button)
- the four reviews with their real recent Google reviews
- `DishArt` placeholder artwork with actual WebP photos

---

## The white screen past the footer — fixed here

`frontend/src/styles/global.css`, section 1 at the top of the file.

It was never a layout overflow bug. It is the browser's rubber-band overscroll
exposing `<html>`'s default white background — which is why it only shows at the
two ends of the page and grows as you keep pulling.

Three things together kill it:

1. `overscroll-behavior: none` on **both** `html` and `body` — stops the bounce.
2. `html` painted in the page's own colour (`--char`) — nothing white left to expose.
3. An `@supports (-webkit-touch-callout: none)` gradient fallback, because older
   iOS Safari ignores `overscroll-behavior` on the document.

Header and footer are both `--char` here, so `html` is `--char` and both ends match.
**If you recolour the header or footer, update that gradient too** — the comment in
the CSS says the same thing.

Modals use `overscroll-behavior: contain` so scrolling inside the cart doesn't drag
the page behind it.

---

## Where the 2D/3D effects are

The 2D half is a hard-offset shadow system (`--hard`, no blur) on buttons, chips
and cards — press a button and it physically sinks into its shadow.

The 3D half is real perspective, used in four places only:

| Effect | File | What it does |
|---|---|---|
| Hero plate stack | `components/Hero.jsx` | Four layers on separate `translateZ` planes, tilting to the pointer |
| Scroll parallax | `hooks/useParallax.js` | Rotates the hero scene a few degrees as you scroll |
| Offer flip cards | `components/Offers.jsx` | `rotateY(180deg)` to the fine print, hover on desktop, tap on mobile |
| Card tilt | `hooks/useTilt.js` | Pointer tilt on the hero plate and the party-booking panel |
| Scroll reveal | `hooks/useReveal.js` | Sections rise and un-rotate once, on first view |

Both hooks take the element's own classes as their first/second argument, because
their props get spread onto the tag — `useTilt(6, 'panel')`, `useReveal('shell two-col')`.

Everything is off under `prefers-reduced-motion`, and tilt is skipped for touch
pointers so it never fights a scroll.

---

## What's in the build

**Pages** — Home, Menu, Contact. Ordering and table booking are modals, so nobody
loses their cart to a page change.

**Signature element** — the full interactive menu (`components/MenuBoard.jsx`):
sticky category nav, five filter chips (Veg / Non-veg / Jain / Bestseller / Under ₹200),
search, 1–3 chilli spice indicator, half/full portion pricing, add-to-cart with a
running total in a sticky footer bar. Never a PDF, never an image of a menu.

**Baseline that ships on every demo:**
- Floating WhatsApp button with a pre-filled message, on every page
- Click-to-call, `tel:` links
- Sticky mobile action bar — Order / Book / Call, three actions, no more
- Google Maps embed + Get directions
- Reviews block with average and recency
- `Restaurant` schema in `index.html`, including hours and `acceptsReservations`
- NAP and opening hours as text in the footer, not baked into an image
- Guest checkout, six fields maximum, no account
- Visible keyboard focus, `prefers-reduced-motion` respected
- Privacy policy on the Contact page

**Palette** — tomato `#E23A2E`, spinach `#1F6B4A`, mustard `#F5A623`, warm white
`#FFF7F0`, char `#191512`. One direction, bold, no muted neutrals mixed in.
**Type** — Archivo Black display, Inter body, tabular figures on every price.

---

## Backend API

| Method | Route | Notes |
|---|---|---|
| GET | `/api/info` | NAP, hours, delivery rules, UPI, aggregator links |
| GET | `/api/menu` | `?category=` and `?q=` supported |
| GET | `/api/offers` | Three running offers |
| GET | `/api/reviews` | With computed average |
| POST | `/api/orders` | Returns order id, totals, ETA, WhatsApp text |
| GET | `/api/orders` | Stands in for the admin panel |
| POST | `/api/bookings/table` | Slot hold |
| POST | `/api/bookings/party` | Per-plate estimate, veg and 100+ discounts applied |
| GET | `/api/bookings` | Admin view |

Interactive docs at `/docs` once uvicorn is running.

---

## Before the client meeting

1. Put their name, photos and real prices in `content.json`.
2. Point the WhatsApp number at your own phone and send an enquiry in front of them.
   This is the moment that closes the deal.
3. Run PageSpeed on their current site or JustDial listing, screenshot it next to
   this build.
4. Show `content.json` and say: menu and rates you change yourself, no phone call
   to me.

---

## Images

Every picture on the site is a **temporary generated placeholder**, written to
`frontend/public/img/` by `scripts/make-placeholders.mjs` (runs automatically
before `dev` and `build`, or `npm run images` on its own). They are drawn in
the brand palette, deterministic per dish id, and the wide ones carry a
"DEMO IMAGE — REPLACE" watermark so nobody mistakes them for finished work.

To put the client's real photos in:

1. Export as WebP — dishes square 800x800, offers 16:9, hero square-ish.
2. Name each file after the id in `content.json` (`s1.webp`, `lunch-thali.webp`)
   and drop it in the same folder.
3. In `frontend/src/media.js`, change `EXT` from `'.svg'` to `'.webp'`.

That is the whole swap. `Photo.jsx` falls back to the drawn plate art if any
single file is missing, so a half-finished photoshoot never leaves a hole in
the grid, and the "these are placeholders" note in the footer disappears on its
own once `EXT` changes.

---

## If the page comes up blank

The site can no longer fail silently: `index.html` carries a boot fallback and a
global error handler, and `src/components/ErrorBoundary.jsx` catches render
crashes. Whatever went wrong gets printed on the page. Read that message first.

If nothing at all appears, work down this list:

1. `npm install` inside `frontend/` — the zip ships without `node_modules`.
2. Stop the server and run `npm run dev -- --force`. This clears Vite's
   dependency cache in `node_modules/.vite`, which goes stale after a folder is
   moved, renamed or re-extracted — the usual cause of a working project
   suddenly rendering nothing.
3. Hard-refresh the browser with Ctrl+Shift+R. A normal refresh can keep serving
   the old module graph.
4. Check `frontend/.env`. If `VITE_USE_API=true` and no FastAPI server is
   running on port 8000, the page stalls on the loading screen — set it to
   `false` for a static demo.
5. Open DevTools (F12) → Console. The first red line names the file.
#   s p i c e - j u n c t i o n - r e s t a u r a n t  
 