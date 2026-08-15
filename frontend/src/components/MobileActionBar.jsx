import { useNavigate } from 'react-router-dom'
import { Bag, Phone, Table } from './Icons'

export default function MobileActionBar({ info, onBook }) {
  const navigate = useNavigate()
  return (
    <nav className="actionbar" aria-label="Quick actions">
      <button type="button" onClick={() => navigate('/menu')}>
        <Bag /> Order
      </button>
      <button type="button" onClick={onBook}>
        <Table /> Book
      </button>
      <a href={`tel:${info.phone_dial}`}>
        <Phone /> Call
      </a>
    </nav>
  )
}
