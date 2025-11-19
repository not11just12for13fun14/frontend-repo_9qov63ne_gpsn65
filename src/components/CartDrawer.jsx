import { X } from 'lucide-react'

export default function CartDrawer({ open, items, onClose, onCheckout, onInc, onDec }) {
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  return (
    <div className={`fixed inset-0 z-30 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-slate-900 border-l border-slate-700/50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h2 className="text-white font-semibold text-lg">Your Cart</h2>
          <button className="text-slate-300 hover:text-white" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-180px)]">
          {items.length === 0 ? (
            <p className="text-slate-400">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/50 rounded-lg p-3">
                <img src={it.image} alt={it.title} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1">
                  <p className="text-white font-medium leading-tight">{it.title}</p>
                  <p className="text-slate-400 text-sm">${it.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => onDec(it.id)} className="px-2 rounded bg-slate-700 text-white">-</button>
                    <span className="text-white">{it.quantity}</span>
                    <button onClick={() => onInc(it.id)} className="px-2 rounded bg-slate-700 text-white">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">${(it.price * it.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-300">Total</span>
            <span className="text-white font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}
