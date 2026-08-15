// One switch decides where data comes from.
//   VITE_USE_API=false (default) -> src/api/static.js, no server needed
//   VITE_USE_API=true            -> the FastAPI app on :8000 via the vite proxy
import { staticApi } from './static'

const USE_API = import.meta.env.VITE_USE_API === 'true'
const BASE = import.meta.env.VITE_API_BASE ?? '/api'

async function req(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || `Request failed (${res.status})`)
  }
  return res.json()
}

export const api = USE_API
  ? {
      info: () => req('/info'),
      offers: () => req('/offers'),
      menu: () => req('/menu'),
      reviews: () => req('/reviews'),
      placeOrder: (b) => req('/orders', { method: 'POST', body: JSON.stringify(b) }),
      bookTable: (b) => req('/bookings/table', { method: 'POST', body: JSON.stringify(b) }),
      bookParty: (b) => req('/bookings/party', { method: 'POST', body: JSON.stringify(b) }),
    }
  : staticApi

export const usingApi = USE_API
