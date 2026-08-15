import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { api } from './api/client'
import CartBar from './components/CartBar'
import { CartProvider } from './components/CartContext'
import CheckoutModal from './components/CheckoutModal'
import Footer from './components/Footer'
import Header from './components/Header'
import MobileActionBar from './components/MobileActionBar'
import TableModal from './components/TableModal'
import WhatsAppFloat from './components/WhatsAppFloat'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Menu from './pages/Menu'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {window.scrollTo(0, 0)}, [pathname])
  return null
}

export default function App() {
  const [data, setData] = useState(null)
  const [failed, setFailed] = useState('')
  const [modal, setModal] = useState(null) // 'cart' | 'table' | null
  const [slow, setSlow] = useState(false)

  // A demo should never sit on a silent blank screen in front of a client.
  useEffect(() => {
    const t = setTimeout(() => setSlow(true), 5000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let alive = true
    Promise.all([api.info(), api.offers(), api.menu(), api.reviews()])
      .then(([info, offers, menu, reviews]) => alive && setData({ info, offers, menu, reviews }))
      .catch((err) => alive && setFailed(err.message))
    return () => { alive = false }
  }, [])

  const openTable = useCallback(() => setModal('table'), [])
  const close = useCallback(() => setModal(null), [])

  if (failed) {
    return (
      <main className="shell section">
        <div className="empty">
          <h3>The menu did not load</h3>
          <p style={{ color: 'var(--muted)' }}>{failed}</p>
          <p style={{ color: 'var(--muted)' }}>
            If VITE_USE_API is true, start the backend: <code>uvicorn main:app --port 8000</code>
          </p>
          <button type="button" className="btn" onClick={() => window.location.reload()}>Try again</button>
        </div>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="shell section" aria-busy="true">
        <p className="eyebrow" style={{ color: 'var(--tomato)' }}>Spice Junction</p>
        <h2 style={{ marginTop: '0.4rem' }}>Loading the menu…</h2>
        <p style={{ color: 'var(--muted)' }}>
          {slow
            ? 'This is taking longer than it should. If VITE_USE_API is true in frontend/.env, the FastAPI server on port 8000 is not answering — set it to false to run the demo static, or start the backend.'
            : 'One moment.'}
        </p>
      </main>
    )
  }

  const { info, offers, menu, reviews } = data

  return (
    <CartProvider>
      <ScrollToTop />
      <Header info={info} />
      <main>
        <Routes>
          <Route path="/" element={
            <Home info={info} offers={offers} menu={menu} reviews={reviews} onBook={openTable} />} />
          <Route path="/menu" element={<Menu info={info} menu={menu} />} />
          <Route path="/contact" element={<Contact info={info} onBook={openTable} />} />
          <Route path="*" element={
            <Home info={info} offers={offers} menu={menu} reviews={reviews} onBook={openTable} />} />
        </Routes>
      </main>
      <Footer info={info} />

      <CartBar onCheckout={() => setModal('cart')} />
      <WhatsAppFloat info={info} />
      <MobileActionBar info={info} onBook={openTable} />

      {modal === 'cart' && <CheckoutModal info={info} onClose={close} />}
      {modal === 'table' && <TableModal info={info} onClose={close} />}
    </CartProvider>
  )
}
