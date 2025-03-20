import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from '@features/auth/components/LoginForm'
import ProtectedRoute from '@features/auth/components/ProtectedRoute'
import MainLayout from '@features/layout/components/MainLayout'
import Home from '@/pages/Home'
import SearchTrips from '@/pages/SearchTrips'
import TripDetails from '@/pages/TripDetails'
import Checkout from '@/pages/Checkout'
import { useAuthStore } from '@features/auth/store/authStore'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
      } />
      
      {/* Protected Routes */}
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchTrips />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* Redirect unmatched routes to login if not authenticated, home if authenticated */}
      <Route path="*" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
      } />
    </Routes>
  )
}

export default App 