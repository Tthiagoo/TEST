import { Link } from 'react-router-dom'
import { useAuthStore } from '@features/auth/store/authStore'

const Navbar = () => {
  const { logout } = useAuthStore()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-primary-600">
              TripBooker
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link to="/search" className="text-gray-600 hover:text-gray-900">
                Search Trips
              </Link>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 