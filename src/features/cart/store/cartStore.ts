import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// Define CartItem locally if not exported from '@features/trips/types'
interface CartItem {
  tripId: string
  quantity: number
  price: number
  passengers: number
}

interface CartState {
  items: CartItem[]
  discountStrategy: DiscountStrategy // Add this line
  addToCart: (item: { tripId: string, quantity: number, price: number, passengers: number }) => void
  removeFromCart: (tripId: string) => void
  updateQuantity: (tripId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  setDiscountStrategy: (strategy: DiscountStrategy) => void
}

interface DiscountStrategy {
  calculate(total: number): number;
}

class NoDiscount implements DiscountStrategy {
  calculate(total: number): number {
    return total;
  }
}

class PercentageDiscount implements DiscountStrategy {
  constructor(private percentage: number) {}
  calculate(total: number): number {
    return total - total * (this.percentage / 100);
  }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      discountStrategy: new NoDiscount(), // Default strategy

      addToCart: ({ tripId, quantity, price, passengers }) =>
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
            items: [...state.items, { tripId, quantity, price, passengers }],
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

      setDiscountStrategy: (strategy: DiscountStrategy) =>
        set((state) => ({ ...state, discountStrategy: strategy })),

      getTotal: () => {
        const state = get();
        const total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return state.discountStrategy.calculate(total);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)