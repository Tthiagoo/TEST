import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login({ email, password })
    if (success) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-sky-200 to-sky-100">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-primary-600 rounded-xl mb-4 mx-auto flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome to TripBooker</h2>
          <p className="mt-2 text-gray-600">
            Sign in to book your next adventure
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          
          <div className="text-right">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Forgot password?
            </a>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="auth-button"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/80 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button type="button" className="social-button">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              </button>
              <button type="button" className="social-button">
                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
              </button>
              <button type="button" className="social-button">
                <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm 