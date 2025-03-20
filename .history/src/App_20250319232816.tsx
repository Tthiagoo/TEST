import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from '@features/auth/components/LoginForm'
import ProtectedRoute from '@features/auth/components/ProtectedRoute'
import Home from '@/pages/Home'
import SearchTrips from '@/pages/SearchTrips'
import TripDetails from '@/pages/TripDetails'
import Checkout from '@/pages/Checkout'
import { useAuthStore } from '@features/auth/store/authStore'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
        } />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/search" element={
          <ProtectedRoute>
            <SearchTrips />
          </ProtectedRoute>
        } />
        
        <Route path="/trip/:id" element={
          <ProtectedRoute>
            <TripDetails />
          </ProtectedRoute>
        } />
        
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />

        {/* Redirect unmatched routes to login if not authenticated, home if authenticated */}
        <Route path="*" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  )
}

export default App 