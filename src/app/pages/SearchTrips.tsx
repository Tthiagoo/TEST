import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

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
}

const SearchTrips = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<number>(500)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrips([
        {
          id: 1,
          from: searchParams.get('from') || 'New York',
          to: searchParams.get('to') || 'Los Angeles',
          date: searchParams.get('date') || '2024-03-20',
          departureTime: '08:00',
          arrivalTime: '16:00',
          price: 199,
          type: 'plane',
          duration: '8h',
          seats: 45,
        },
        {
          id: 2,
          from: searchParams.get('from') || 'New York',
          to: searchParams.get('to') || 'Los Angeles',
          date: searchParams.get('date') || '2024-03-20',
          departureTime: '09:30',
          arrivalTime: '18:30',
          price: 89,
          type: 'bus',
          duration: '9h',
          seats: 12,
        },
        {
          id: 3,
          from: searchParams.get('from') || 'New York',
          to: searchParams.get('to') || 'Los Angeles',
          date: searchParams.get('date') || '2024-03-20',
          departureTime: '10:00',
          arrivalTime: '17:00',
          price: 149,
          type: 'train',
          duration: '7h',
          seats: 28,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [searchParams])

  const filteredTrips = trips.filter(
    (trip) =>
      (selectedType === 'all' || trip.type === selectedType) &&
      trip.price <= priceRange
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transport Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="auth-input"
              >
                <option value="all">All Types</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="plane">Plane</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: ${priceRange}
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-3">
          <h1 className="text-2xl font-bold mb-6">
            {searchParams.get('from')} to {searchParams.get('to')}
          </h1>

          {loading ? (
            <div className="text-center py-8">Loading trips...</div>
          ) : (
            <div className="space-y-4">
              {filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/trip/${trip.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold">{trip.departureTime}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-lg font-semibold">{trip.arrivalTime}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Duration: {trip.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        ${trip.price}
                      </div>
                      <div className="text-sm text-gray-600">{trip.seats} seats left</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-600 capitalize">
                      Transport type: {trip.type}
                    </div>
                    <button
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/trip/${trip.id}`)
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}

              {filteredTrips.length === 0 && (
                <div className="text-center py-8 text-gray-600">
                  No trips found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchTrips 