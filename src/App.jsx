import { useEffect, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        // ensure products seeded at least once
        await fetch(`${BASE_URL}/seed`, { method: 'POST' })
      } catch {}
      try {
        const res = await fetch(`${BASE_URL}/products`)
        const data = await res.json()
        setProducts(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === p.id)
      if (existing) {
        return prev.map((i) => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...p, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const incQty = (id) => setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
  const decQty = (id) => setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))

  const checkout = async () => {
    try {
      const payload = {
        items: cart.map((c) => ({ product_id: c.id, quantity: c.quantity })),
        customer_name: 'Guest Buyer',
        email: 'guest@example.com',
        address: '123 Electric Ave, Grid City'
      }
      const res = await fetch(`${BASE_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Checkout failed')
      setMessage(`Order placed! Total $${data.total}. Order ID: ${data.order_id}`)
      setCart([])
    } catch (e) {
      setMessage(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      <Header cartCount={cart.reduce((s,i)=>s+i.quantity,0)} onCartToggle={() => setCartOpen(true)} />

      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center py-10">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Power your EV journey</h2>
          <p className="text-blue-200/80 mt-3">Shop chargers, cables, and must-have accessories for electric vehicles.</p>
        </div>

        {message && (
          <div className="mb-6 bg-emerald-600/20 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded">
            {message}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-800/60 border border-slate-700/50 rounded-xl h-72" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onCheckout={checkout}
        onInc={incQty}
        onDec={decQty}
      />

      <footer className="mt-16 text-center text-blue-300/60 text-sm">
        <p>Eco-friendly parts. Fast shipping. Reliable support.</p>
      </footer>
    </div>
  )
}

export default App
