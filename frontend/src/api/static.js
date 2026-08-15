// Browser-side mirror of the FastAPI routes. This is what makes the demo run
// with no server and no database — same shapes, same field names.
import data from '../content/content.json'

let counter = 1041
const nextRef = (p) => `${p}-${counter++}`

export const staticApi = {
  info: async () => data.info,

  offers: async () => data.offers,

  menu: async () => ({ categories: data.categories, items: data.menu }),

  reviews: async () => {
    const list = data.reviews
    const avg = list.reduce((s, r) => s + r.rating, 0) / list.length
    return { average: Math.round(avg * 10) / 10, count: list.length, reviews: list }
  },

  placeOrder: async (payload) => {
    const subtotal = payload.items.reduce((s, l) => s + l.price * l.qty, 0)
    const d = data.info.delivery
    const fee = payload.mode === 'takeaway' || subtotal >= d.free_above ? 0 : d.fee
    const orderId = nextRef('SJ')
    const lines = payload.items
      .map((l) => `${l.qty} x ${l.name}${l.portion === 'half' ? ' (half)' : ''}`)
      .join('%0A')
    return {
      order_id: orderId,
      status: 'placed',
      subtotal,
      delivery_fee: fee,
      total: subtotal + fee,
      eta_minutes: payload.mode === 'delivery' ? d.avg_minutes : 20,
      whatsapp_text: `Hi Spice Junction, order ${orderId}%0A${lines}%0ATotal Rs ${subtotal + fee} — ${payload.mode}`,
    }
  },

  bookTable: async (p) => ({
    booking_id: nextRef('TB'),
    status: 'held',
    message: `Table for ${p.guests} held on ${p.date} at ${p.slot}. We hold it for 15 minutes past the slot.`,
  }),

  bookParty: async (p) => {
    const base = { buffet: 449, party: 649, corporate: 549 }[p.kind] ?? 449
    let plate = base
    if (p.veg_only) plate -= 50
    if (p.guests >= 100) plate -= 30
    return {
      booking_id: nextRef('PB'),
      status: 'quoted',
      message: `Estimate for ${p.guests} guests at Rs ${plate} per plate. Our manager confirms the final menu on call.`,
      estimate: plate * p.guests,
    }
  },
}
