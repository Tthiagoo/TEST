import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/search?from=${from}&to=${to}&date=${date}`)
  }

  const featuredTrips = [
    {
      id: 1,
      from: 'New York',
      to: 'Los Angeles',
      price: 199,
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3',
    },
    {
      id: 2,
      from: 'Chicago',
      to: 'Miami',
      price: 149,
      image: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-4.0.3',
    },
    {
      id: 3,
      from: 'Seattle',
      to: 'San Francisco',
      price: 99,
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-24">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Find Your Perfect Trip
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl">
              Book tickets for buses, trains, and planes at the best prices.
            </p>
          </div>

          {/* Search Form */}
          <div className="mt-10 max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="grid gap-4 p-6 bg-white rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="auth-input"
                  required
                />
                <input
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="auth-input"
                  required
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
              <button type="submit" className="auth-button">
                Search Trips
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Featured Trips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/trip/${trip.id}`)}
              role="button"
              tabIndex={0}
            >
              <img
                src={trip.image}
                alt={`${trip.from} to ${trip.to}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {trip.from} to {trip.to}
                </h3>
                <p className="text-gray-600">Starting from</p>
                <p className="text-2xl font-bold text-primary-600">${trip.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage 