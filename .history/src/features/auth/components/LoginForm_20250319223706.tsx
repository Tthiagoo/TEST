import { useState } from 'react'
import useAuthStore from '../store/authStore'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
      </div>
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}

export default LoginForm 