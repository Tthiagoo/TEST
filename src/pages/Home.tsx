import TripSearchForm from '@features/trips/components/TripSearchForm'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-12">
      <div className="py-12">
        <TripSearchForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/popular-destinations" className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Destinations</h2>
          <p className="text-gray-600">Discover our most booked destinations</p>
        </Link>
        <Link to="/special-offers" className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Special Offers</h2>
          <p className="text-gray-600">Check out our latest deals and discounts</p>
        </Link>
        <Link to="/travel-tips" className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Travel Tips</h2>
          <p className="text-gray-600">Expert advice for your next adventure</p>
        </Link>
      </div>
    </div>
  )
}

export default Home