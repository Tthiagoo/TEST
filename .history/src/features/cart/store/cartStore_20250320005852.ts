import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@features/trips/types'

interface CartState {
  items: CartItem[]
  addToCart: (tripId: string) => void
  removeFromCart: (tripId: string) => void
  updateQuantity: (tripId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (tripId) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.tripId === tripId)
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.tripId === tripId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          
          return {
            items: [...state.items, { tripId, quantity: 1 }],
          }
        }),
      
      removeFromCart: (tripId) =>
        set((state) => ({
          items: state.items.filter((item) => item.tripId !== tripId),
        })),
      
      updateQuantity: (tripId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.tripId !== tripId),
            }
          }
          
          return {
            items: state.items.map((item) =>
              item.tripId === tripId ? { ...item, quantity } : item
            ),
          }
        }),
      
      clearCart: () => set({ items: [] }),
      
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