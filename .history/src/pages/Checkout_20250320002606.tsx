import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@features/cart/store/cartStore'
import { useCreateBooking } from '@features/trips/hooks/useTrips'
import { Passenger, PaymentInfo } from '@features/trips/types'

const Checkout = () => {
  const navigate = useNavigate()
  const { items, getTotal, clearCart } = useCartStore()
  const createBooking = useCreateBooking()
  
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const updatedPassengers = [...passengers]
    if (!updatedPassengers[index]) {
      updatedPassengers[index] = {
        firstName: '',
        lastName: '',
        documentType: 'id',
        documentNumber: '',
        email: '',
        phone: ''
      }
    }
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    }
    setPassengers(updatedPassengers)
  }

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Create a booking for each trip in the cart
      for (const item of items) {
        await createBooking.mutateAsync({
          tripId: item.tripId,
          passengers: passengers.slice(0, item.quantity),
          paymentInfo,
          totalAmount: item.price * item.quantity
        })
      }

      clearCart()
      navigate('/booking-confirmation')
    } catch (error) {
      console.error('Failed to create booking:', error)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Browse Trips
        </button>
      </div>
    )
  }

  const totalPassengers = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>
              
              {Array.from({ length: totalPassengers }).map((_, index) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-0">
                  <h3 className="text-lg font-medium mb-4">Passenger {index + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={passengers[index]?.firstName || ''}
                      onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={passengers[index]?.lastName || ''}
                      onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                    <select
                      value={passengers[index]?.documentType || 'id'}
                      onChange={(e) => handlePassengerChange(index, 'documentType', e.target.value as 'id' | 'passport')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="id">ID</option>
                      <option value="passport">Passport</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Document Number"
                      value={passengers[index]?.documentNumber || ''}
                      onChange={(e) => handlePassengerChange(index, 'documentNumber', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={passengers[index]?.email || ''}
                      onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={passengers[index]?.phone || ''}
                      onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  value={paymentInfo.cardHolder}
                  onChange={(e) => handlePaymentChange('cardHolder', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={paymentInfo.cvv}
                    onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={createBooking.isLoading}
              className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {createBooking.isLoading ? 'Processing...' : 'Complete Purchase'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.tripId} className="flex justify-between">
                  <span>{item.quantity} passenger(s)</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout 