import { useRoutes, Navigate } from 'react-router-dom'
import { useAuthStore } from '@features/auth/store/authStore'
import { publicRoutes, protectedRoutes } from './routes'

const RouterProvider = () => {
  const { isAuthenticated } = useAuthStore()

  const routes = [
    // Public routes
    {
      ...publicRoutes[0],
      element: isAuthenticated ? <Navigate to="/" replace /> : publicRoutes[0].element
    },
    // Protected routes
    ...protectedRoutes,
    // Catch all route
    {
      path: '*',
      element: isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
    }
  ]

  return useRoutes(routes)
}

export default RouterProvider 