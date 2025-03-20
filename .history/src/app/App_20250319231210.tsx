import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import SearchTrips from '../pages/SearchTrips'
import TripDetails from '../pages/TripDetails'
import Checkout from '../pages/Checkout'
import LoginForm from '../features/auth/components/LoginForm'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAuthStore } from '../features/auth/store/authStore'

const queryClient = new QueryClient()

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginForm />} />
          
          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchTrips />} />
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* Redirect all other routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App 