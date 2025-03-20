import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  user: null | { email: string }
  isLoading: boolean
  error: string | null
  login: (credentials: { email: string; password: string }) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))
          
          // For demo purposes, accept any email/password
          set({
            isAuthenticated: true,
            user: { email: credentials.email },
            isLoading: false,
            error: null
          })
          return true
        } catch (error) {
          set({
            isLoading: false,
            error: 'Invalid credentials'
          })
          return false
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          error: null
        })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)