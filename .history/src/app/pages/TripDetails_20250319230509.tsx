import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface Trip {
  id: number
  from: string
  to: string
  date: string
  departureTime: string
  arrivalTime: string
  price: number
  type: 'bus' | 'train' | 'plane'
  duration: string
  seats: number
  features: string[]
  stops: string[]
}

const TripDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSeats, setSelectedSeats] = useState(1)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrip({
        id: Number(id),
        from: 'New York',
        to: 'Los Angeles',
        date: '2024-03-20',
        departureTime: '08:00',
        arrivalTime: '16:00',
        price: 199,
        type: 'plane',
        duration: '8h',
        seats: 45,
        features: ['Wi-Fi', 'Power Outlets', 'Air Conditioning', 'Snacks Available'],
        stops: ['Chicago', 'Denver'],
      })
      setLoading(false)
    }, 1000)
  }, [id])

  const handleBooking = () => {
    navigate('/checkout', {
      state: {
        trip,
        seats: selectedSeats,
        totalPrice: (trip?.price || 0) * selectedSeats,
      },
    })
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading trip details...</div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Trip not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Trip Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">Trip Details</h1>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-600">From</div>
                <div className="font-semibold">{trip.from}</div>
              </div>
              <div>
                <div className="text-gray-600">To</div>
                <div className="font-semibold">{trip.to}</div>
              </div>
              <div>
                <div className="text-gray-600">Date</div>
                <div className="font-semibold">{trip.date}</div>
              </div>
              <div>
                <div className="text-gray-600">Duration</div>
                <div className="font-semibold">{trip.duration}</div>
              </div>
              <div>
                <div className="text-gray-600">Departure</div>
                <div className="font-semibold">{trip.departureTime}</div>
              </div>
              <div>
                <div className="text-gray-600">Arrival</div>
                <div className="font-semibold">{trip.arrivalTime}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Route Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Stops</h3>
                <div className="flex items-center space-x-2">
                  {trip.stops.map((stop, index) => (
                    <div key={stop} className="flex items-center">
                      <div className="text-primary-600">{stop}</div>
                      {index < trip.stops.length - 1 && (
                        <span className="text-gray-400 mx-2">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {trip.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Book Your Trip</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Seats
                </label>
                <select
                  value={selectedSeats}
                  onChange={(e) => setSelectedSeats(Number(e.target.value))}
                  className="auth-input"
                >
                  {[...Array(Math.min(5, trip.seats))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'seat' : 'seats'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Price per seat</span>
                  <span>${trip.price}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${trip.price * selectedSeats}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="auth-button"
              >
                Continue to Booking
              </button>

              <p className="text-sm text-gray-600 text-center">
                {trip.seats} seats remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetails 