import { Link } from 'react-router-dom'
import { Trip } from '../../trips/types'

interface CartItem {
  tripId: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  removeFromCart: (tripId: string) => void
  updateQuantity: (tripId: string, quantity: number) => void
}

interface CartPageProps {
  cartStore: CartStore
  getTripDetails: (tripId: string) => Trip | undefined
}

const calculateTotal = (items: CartItem[], getTripDetails: (tripId: string) => Trip | undefined) => {
  return items.reduce((total, item) => {
    const trip = getTripDetails(item.tripId)
    return total + (trip?.price || 0) * item.quantity
  }, 0)
}

const CartPage = ({ cartStore, getTripDetails }: CartPageProps) => {
  const { items, removeFromCart, updateQuantity } = cartStore

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-500">Start booking your trips</p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="divide-y">
          {items.map(item => {
            const trip = getTripDetails(item.tripId)
            if (!trip) return null

            return (
              <div key={item.tripId} className="p-6">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{trip.company}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">
                        From: <span className="font-medium">{trip.origin}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        To: <span className="font-medium">{trip.destination}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Departure: {' '}
                        <span className="font-medium">
                          {new Date(trip.departureDate).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration: <span className="font-medium">{trip.duration}</span>
                      </p>
                    </div>
                  </div>

                  <div className="ml-6">
                    <div className="flex items-center space-x-2">
                      <button
                        data-testid="decrease-quantity"
                        onClick={() => updateQuantity(item.tripId, Math.max(0, item.quantity - 1))}
                        className="p-1 rounded-full hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span data-testid="quantity" className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        data-testid="increase-quantity"
                        onClick={() => updateQuantity(item.tripId, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-4 text-right">
                      <p className="text-lg font-medium">
                        R$ {(trip.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        R$ {trip.price.toFixed(2)} each
                      </p>
                      <button
                        data-testid="remove-item"
                        onClick={() => removeFromCart(item.tripId)}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-6 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">Total</p>
              <p className="text-sm text-gray-500">Including all fees</p>
            </div>
            <div className="text-right">
              <p data-testid="total-price" className="text-2xl font-semibold">
                R$ {calculateTotal(items, getTripDetails).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-6 text-right">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-4"
            >
              Continue Shopping
            </Link>
            <Link
              to="/checkout"
              data-testid="proceed-to-checkout"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage 