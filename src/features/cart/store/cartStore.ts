import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@features/trips/types'

interface CartState {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (tripId: string) => void
  updatePassengers: (tripId: string, passengers: CartItem['passengers']) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.tripId === item.tripId)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.tripId === item.tripId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },
      
      removeFromCart: (tripId) => {
        set((state) => ({
          items: state.items.filter((item) => item.tripId !== tripId),
        }))
      },
      
      updatePassengers: (tripId, passengers) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.tripId === tripId ? { ...item, passengers } : item
          ),
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
) 