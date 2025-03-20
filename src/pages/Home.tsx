const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to TripBooker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Destinations</h2>
          <p className="text-gray-600">Discover our most booked destinations</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Special Offers</h2>
          <p className="text-gray-600">Check out our latest deals and discounts</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Travel Tips</h2>
          <p className="text-gray-600">Expert advice for your next adventure</p>
        </div>
      </div>
    </div>
  )
}

export default Home 