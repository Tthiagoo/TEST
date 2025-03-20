import { Link } from 'react-router-dom'
import { Trip } from '../types'

interface TripCardProps {
  trip: Trip
  onAddToCart: () => void
}

const TripCard = ({ trip, onAddToCart }: TripCardProps) => {
  const formattedDate = new Date(trip.departureDate).toLocaleDateString('pt-BR', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{trip.company}</h3>
            <p className="text-sm text-gray-600">{formattedDate}</p>
          </div>
          <span className="text-lg font-bold text-primary-600">
            R$ {trip.price.toFixed(2)}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">From</p>
              <p className="font-medium">{trip.origin}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">To</p>
              <p className="font-medium">{trip.destination}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-medium">{trip.duration}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/trip/${trip.id}`}
            className="flex-1 text-center px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50"
          >
            View Details
          </Link>
          <button
            onClick={onAddToCart}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default TripCard 