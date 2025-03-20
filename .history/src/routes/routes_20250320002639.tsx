import { RouteObject } from 'react-router-dom'
import MainLayout from '@features/layout/components/MainLayout'
import LoginForm from '@features/auth/components/LoginForm'
import ProtectedRoute from '@features/auth/components/ProtectedRoute'
import Home from '@/pages/Home'
import SearchTrips from '@/pages/SearchTrips'
import TripDetails from '@/pages/TripDetails'
import Checkout from '@/pages/Checkout'
import Cart from '@features/cart/components/Cart'
import BookingConfirmation from '@/pages/BookingConfirmation'

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginForm />
  }
]

export const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/search',
        element: <SearchTrips />
      },
      {
        path: '/trip/:id',
        element: <TripDetails />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/booking-confirmation',
        element: <BookingConfirmation />
      }
    ]
  }
] 