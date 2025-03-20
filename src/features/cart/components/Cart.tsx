import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useTripDetails } from '@features/trips/hooks/useTrips'

const Cart = () => {
  const navigate = useNavigate()
  const { items, removeFromCart, getTotal } = useCartStore()

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Add some trips to get started</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Browse Trips
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <CartItem
          key={item.tripId}
          item={item}
          onRemove={() => removeFromCart(item.tripId)}
        />
      ))}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary-600">
            R$ {getTotal().toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

const CartItem = ({ item, onRemove }: { item: any; onRemove: () => void }) => {
  const { data: trip } = useTripDetails(item.tripId)

  if (!trip) return null

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-1">{trip.company}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {trip.origin} → {trip.destination}
          </p>
          <p className="text-sm text-gray-600">
            {new Date(trip.departureDate).toLocaleDateString('pt-BR', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary-600">
            R$ {(item.price * item.quantity).toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            {item.quantity} {item.quantity === 1 ? 'passenger' : 'passengers'}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default Cart 