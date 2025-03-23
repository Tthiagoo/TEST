import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import MiniCart from './MiniCart'

const CartIcon = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeFromCart } = useCartStore()
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
        aria-label="Shopping cart"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        
        {totalItems > 0 && (
          <span
            data-testid="cart-badge"
            className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 z-50">
            <MiniCart 
              isOpen={isOpen} 
              onClose={() => setIsOpen(false)}
              items={items}
              onRemoveItem={removeFromCart}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default CartIcon 