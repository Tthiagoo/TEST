import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, LoginCredentials, User } from '../types'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Replace with actual API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const mockUser: User = {
            id: '1',
            email: credentials.email,
            name: 'John Doe',
          }
          set({ user: mockUser, isAuthenticated: true, isLoading: false })
          return true
        } catch (error) {
          set({ error: 'Invalid credentials', isLoading: false })
          return false
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage
    }
  )
) 