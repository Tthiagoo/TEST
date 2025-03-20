import { create } from 'zustand'
import { AuthState, LoginCredentials, User } from '../types'

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Implement actual API call
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
      }
      set({ user: mockUser, isAuthenticated: true })
    } catch (error) {
      set({ error: 'Login failed' })
    } finally {
      set({ isLoading: false })
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
}))

export default useAuthStore 