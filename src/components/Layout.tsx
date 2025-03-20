import { Link } from 'react-router-dom'
import { useAuthStore } from '@features/auth/store/authStore'
import CartIcon from '@features/cart/components/CartIcon'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-semibold text-primary-600">
                TripBooking
              </Link>
            </div>

            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/search"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Search Trips
              </Link>
              {isAuthenticated ? (
                <>
                  <CartIcon />
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default Layout 