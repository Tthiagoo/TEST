const SearchTrips = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Search Trips</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Where to?"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="date"
            className="border rounded-lg px-4 py-2"
          />
          <button className="bg-primary-600 text-white rounded-lg px-4 py-2 hover:bg-primary-700">
            Search
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for search results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Trip to Paris</h2>
          <p className="text-gray-600 mb-4">Experience the city of love</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">$599</span>
            <button className="bg-primary-600 text-white rounded-lg px-4 py-2 hover:bg-primary-700">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchTrips 