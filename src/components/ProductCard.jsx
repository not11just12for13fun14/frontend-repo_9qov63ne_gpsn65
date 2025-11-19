export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all">
      <div className="aspect-[4/3] overflow-hidden bg-slate-900">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg">{product.title}</h3>
        <p className="text-slate-300/80 text-sm line-clamp-2 min-h-[40px]">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-blue-400 font-bold text-lg">${product.price?.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
