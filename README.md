# 🌶️ Spice Junction --- Restaurant Website

A modern, responsive multi-cuisine restaurant website designed around
one simple goal:

> **Help customers place an order or book a table in under three taps.**

Built with a **React + Vite frontend** and a **FastAPI backend**.\
The project currently uses **in-memory data instead of a database**,
which is intentional for a client-pitch/demo build.

## 🔗 Project

-   **GitHub:** https://github.com/Anshika113/spice-junction-restaurant
-   **Live Demo:** https://spice-junction-restaurant.pages.dev

------------------------------------------------------------------------

## ✨ Features

### Customer Experience

-   🏠 Home, Menu and Contact pages
-   🍽️ Interactive menu with:
    -   Category navigation
    -   Veg / Non-veg / Jain filters
    -   Bestseller filter
    -   Under ₹200 filter
    -   Search
    -   Spice-level indicator
    -   Half/full portion pricing
    -   Add-to-cart functionality
    -   Running cart total
-   🛒 Guest checkout without account creation
-   🚚 Delivery and takeaway ordering
-   📅 Table booking
-   💬 WhatsApp order/booking confirmation
-   📞 Click-to-call functionality
-   📍 Google Maps and directions
-   ⭐ Reviews section with average rating
-   📱 Sticky mobile action bar
-   🔒 Privacy policy page
-   ♿ Visible keyboard focus and reduced-motion support

### UI / Motion

-   Interactive 3D hero plate stack
-   Pointer-based card tilt
-   Scroll parallax
-   Offer flip cards
-   Scroll reveal animations
-   Reduced-motion support
-   Touch-device friendly interactions

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React
-   Vite
-   JavaScript
-   React Router
-   CSS

### Backend

-   Python
-   FastAPI
-   Uvicorn

### Data

-   JSON content file
-   In-memory order and booking storage

### Integrations / Browser Features

-   WhatsApp links
-   Google Maps
-   `tel:` click-to-call
-   REST API

------------------------------------------------------------------------

## 📁 Project Structure

``` text
spice-junction-restaurant/
│
├── backend/
│   ├── app/
│   │   ├── data/
│   │   │   └── content.json
│   │   └── store.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── scripts/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── content/
│   │   └── styles/
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

------------------------------------------------------------------------

# 🚀 Getting Started

## 1. Clone the repository

``` bash
git clone https://github.com/Anshika113/spice-junction-restaurant.git
cd spice-junction-restaurant
```

------------------------------------------------------------------------

## 2. Frontend-only demo

The easiest way to run the project is the static frontend mode.

``` bash
cd frontend
npm install
npm run dev
```

Open:

``` text
http://localhost:5173
```

The static API mirrors the backend routes in the browser, so the
frontend can run without starting FastAPI.

------------------------------------------------------------------------

# ⚙️ Run with FastAPI Backend

From the project root:

``` bash
cd backend
```

### Windows

``` bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### macOS / Linux

``` bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend API:

``` text
http://localhost:8000
```

Interactive API documentation:

``` text
http://localhost:8000/docs
```

------------------------------------------------------------------------

## Frontend API Configuration

Create:

``` text
frontend/.env
```

For backend mode:

``` env
VITE_USE_API=true
VITE_API_BASE=/api
```

Then restart Vite:

``` bash
cd frontend
npm run dev
```

Vite proxies `/api` requests to the FastAPI server on port `8000`.

### Static mode

For a frontend-only demo:

``` env
VITE_USE_API=false
```

No backend server is required.

------------------------------------------------------------------------

# 🔌 Backend API

  Method   Route                   Purpose
  -------- ----------------------- --------------------------------------------------
  GET      `/api/info`             Restaurant information, hours and delivery rules
  GET      `/api/menu`             Menu data with category/search support
  GET      `/api/offers`           Current restaurant offers
  GET      `/api/reviews`          Reviews and computed average
  POST     `/api/orders`           Creates an order
  GET      `/api/orders`           Order/admin view
  POST     `/api/bookings/table`   Books/holds a table
  POST     `/api/bookings/party`   Party booking estimate
  GET      `/api/bookings`         Booking/admin view

------------------------------------------------------------------------

# 📝 Editing Restaurant Content

Most customer-facing content is controlled from:

``` text
backend/app/data/content.json
```

This includes:

-   Restaurant name
-   Address
-   Phone
-   WhatsApp
-   UPI
-   Opening hours
-   Delivery rules
-   Menu items
-   Prices
-   Offers
-   Reviews
-   Map query

The frontend sync script copies the content into the frontend during
development/build.

For a real client, replace the demo information with the client's
actual:

``` text
name
address
phone
WhatsApp
UPI
map location
prices
reviews
photos
```

------------------------------------------------------------------------

# 🖼️ Images

The project uses generated placeholder artwork for the demo.

Placeholder images are created automatically by:

``` text
scripts/make-placeholders.mjs
```

To replace them with real restaurant photographs:

1.  Export dish images as WebP.
2.  Use approximately `800x800` for square dish images.
3.  Use `16:9` for offer/banner images.
4.  Name images according to the IDs used in `content.json`.
5.  Place them inside:

``` text
frontend/public/img/
```

6.  Update the image extension in:

``` text
frontend/src/media.js
```

The image component has a fallback so missing individual photos do not
break the menu grid.

------------------------------------------------------------------------

# 🎨 Design System

### Color Palette

  Color        Hex
  ------------ -----------
  Tomato       `#E23A2E`
  Spinach      `#1F6B4A`
  Mustard      `#F5A623`
  Warm White   `#FFF7F0`
  Char         `#191512`

### Typography

-   **Archivo Black** --- display headings
-   **Inter** --- body text
-   Tabular figures for prices

------------------------------------------------------------------------

# 🧊 2D / 3D Effects

The project uses a combination of hard-offset shadows and real CSS
perspective effects.

  Effect             Implementation
  ------------------ -------------------------
  Hero plate stack   `components/Hero.jsx`
  Scroll parallax    `hooks/useParallax.js`
  Offer flip cards   `components/Offers.jsx`
  Card tilt          `hooks/useTilt.js`
  Scroll reveal      `hooks/useReveal.js`

Motion is disabled/respected for users who prefer reduced motion, and
pointer tilt is skipped for touch interactions.

------------------------------------------------------------------------

# 📦 Production Build

Create the frontend production build:

``` bash
cd frontend
npm run build
```

The generated production files are placed in:

``` text
frontend/dist/
```

These files can be deployed to a static hosting platform such as
Cloudflare Pages.

------------------------------------------------------------------------

# 🐛 Troubleshooting

## Blank page

First install dependencies:

``` bash
cd frontend
npm install
```

Then restart Vite with a clean dependency cache:

``` bash
npm run dev -- --force
```

Hard-refresh the browser:

``` text
Ctrl + Shift + R
```

Then open DevTools:

``` text
F12 → Console
```

Check the first red error because it normally identifies the failing
file.

### Backend mode is stuck on loading

If:

``` env
VITE_USE_API=true
```

make sure FastAPI is running:

``` bash
uvicorn main:app --reload --port 8000
```

Alternatively switch to:

``` env
VITE_USE_API=false
```

for the static demo.

------------------------------------------------------------------------

# 🧪 Demo / Architecture Notes

This project intentionally does **not** use a persistent database.

Orders and bookings are stored in an in-memory list and are cleared when
the backend restarts.

For a production version, the storage layer can be replaced with a real
database without changing the overall customer-facing flow.

Potential production upgrades include:

-   PostgreSQL
-   Authentication/admin dashboard
-   Persistent order history
-   Payment gateway
-   Real-time order status
-   Restaurant admin panel
-   Image CDN
-   Analytics
-   Email/SMS notifications

------------------------------------------------------------------------

# 📌 Current Status

**Project Type:** Restaurant website + ordering/booking demo\
**Frontend:** React + Vite\
**Backend:** FastAPI\
**Database:** Not connected; in-memory demo storage\
**Deployment:** Frontend production build supported\
**Repository:** https://github.com/Anshika113/spice-junction-restaurant

------------------------------------------------------------------------

## 👩‍💻 Author

**Anshika Mishra**

GitHub:\
https://github.com/Anshika113

------------------------------------------------------------------------

## 📄 License

This project is intended as a demonstration project.
