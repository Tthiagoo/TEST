import { useSearchParams } from 'react-router-dom'
import { useSearchTrips } from '@features/trips/hooks/useTrips'
import { useCartStore } from '@features/cart/store/cartStore'
import TripCard from '@features/trips/components/TripCard'

const SearchTrips = () => {
  const [searchParams] = useSearchParams()
  const { addToCart } = useCartStore()

  const searchQuery = {
    origin: searchParams.get('origin') || '',
    destination: searchParams.get('destination') || '',
    departureDate: searchParams.get('departureDate') || '',
    returnDate: searchParams.get('returnDate') || undefined,
    passengers: Number(searchParams.get('passengers')) || 1
  }

  const { data: trips, isLoading, error } = useSearchTrips(searchQuery)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error loading trips. Please try again later.
      </div>
    )
  }

  if (!trips?.length) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">nenhuma viagem encontrada</h2>
        <p className="text-gray-600">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Trips from {searchQuery.origin} to {searchQuery.destination}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onAddToCart={() => {
              addToCart({
                tripId: trip.id,
                quantity: searchQuery.passengers,
                price: trip.price,
                passengers: searchQuery.passengers
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchTrips