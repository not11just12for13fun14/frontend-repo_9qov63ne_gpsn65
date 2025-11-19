import { ShoppingCart } from 'lucide-react'

export default function Header({ cartCount, onCartToggle }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-slate-900/70 border-b border-slate-700/50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="EV Parts" className="w-8 h-8" />
          <div>
            <h1 className="text-white font-bold text-xl leading-tight">EV Parts Store</h1>
            <p className="text-xs text-blue-300/70">Chargers, cables, and accessories</p>
          </div>
        </div>
        <button
          onClick={onCartToggle}
          className="relative inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-emerald-500 text-white rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
