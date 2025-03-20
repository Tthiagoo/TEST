import { Outlet, Link } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              TripBooker
            </Link>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link to="/search" className="text-gray-600 hover:text-gray-900">
                Find Trips
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About TripBooker</h3>
              <p className="text-gray-600">
                Book your next trip with ease. Find the best routes and prices.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/search" className="text-gray-600 hover:text-gray-900">
                    Search Trips
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-600">
                Email: support@tripbooker.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout 