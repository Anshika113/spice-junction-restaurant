import { Whatsapp } from './Icons'

export default function WhatsAppFloat({ info, text = 'Hi, I want to place an order' }) {
  const href = `https://wa.me/${info.whatsapp}?text=${encodeURIComponent(text)}`
  return (
    <a className="wa" href={href} target="_blank" rel="noreferrer" aria-label="Order on WhatsApp">
      <Whatsapp />
    </a>
  )
}
