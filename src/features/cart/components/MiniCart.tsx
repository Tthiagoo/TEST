import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useTripDetails } from '../../trips/hooks/useTrips'

interface MiniCartProps {
  isOpen: boolean
  onClose: () => void
}

const MiniCart = ({ isOpen, onClose }: MiniCartProps) => {
  const { items, removeFromCart } = useCartStore()

  if (!isOpen) return null

  if (items.length === 0) {
    return (
      <div
        data-testid="mini-cart"
        className="bg-white rounded-lg shadow-lg w-96 p-4"
      >
        <p className="text-center text-gray-500">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div
      data-testid="mini-cart"
      className="bg-white rounded-lg shadow-lg w-96 p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Shopping Cart</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close cart"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="divide-y">
        {items.map(item => {
          const { data: trip } = useTripDetails(item.tripId)
          if (!trip) return null

          return (
            <div key={item.tripId} className="py-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{trip.company}</p>
                  <p className="text-sm text-gray-600">
                    {trip.origin} → {trip.destination}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(trip.departureDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    R$ {(trip.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.tripId)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 space-y-2">
        <Link
          to="/cart"
          data-testid="view-cart-button"
          className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
          onClick={onClose}
        >
          View Cart
        </Link>
        <Link
          to="/checkout"
          className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          onClick={onClose}
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}

export default MiniCart 