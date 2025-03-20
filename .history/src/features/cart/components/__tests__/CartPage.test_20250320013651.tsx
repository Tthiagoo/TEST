import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import CartPage from '../CartPage'
import { Trip } from '../../../trips/types'
import { useCartStore } from '../store/cartStore'
import { useTripDetails } from '@features/trips/hooks/useTrips'

const mockTrip: Trip = {
  id: '1',
  origin: 'São Paulo',
  destination: 'Rio de Janeiro',
  departureDate: '2024-03-25T10:00:00',
  price: 150,
  company: 'Express Bus',
  duration: '6h',
  availableSeats: 45
}

// Mock the hooks
vi.mock('../store/cartStore', () => ({
  useCartStore: vi.fn()
}))

vi.mock('@features/trips/hooks/useTrips', () => ({
  useTripDetails: vi.fn()
}))

describe('CartPage', () => {
  beforeEach(() => {
    // Setup default mock implementations
    vi.mocked(useCartStore).mockReturnValue({
      items: [{ tripId: '1', quantity: 2 }],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getTotal: () => 300
    })
    
    vi.mocked(useTripDetails).mockReturnValue({
      data: mockTrip,
      isLoading: false,
      error: null
    })
  })

  it('should display detailed cart information', () => {
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Express Bus')).toBeInTheDocument()
    expect(screen.getByText('São Paulo')).toBeInTheDocument()
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument()
    expect(screen.getByText(/March 25, 2024/)).toBeInTheDocument()
    expect(screen.getByText('6h')).toBeInTheDocument()
    expect(screen.getByText('R$ 300,00')).toBeInTheDocument()
  })

  it('should update quantity when quantity controls are clicked', () => {
    const updateQuantity = vi.fn()
    vi.mocked(useCartStore).mockReturnValue({
      items: [{ tripId: '1', quantity: 2 }],
      removeFromCart: vi.fn(),
      updateQuantity,
      getTotal: () => 300
    })
    
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    )
    
    const increaseButton = screen.getByRole('button', { name: /increase quantity/i })
    fireEvent.click(increaseButton)
    
    expect(updateQuantity).toHaveBeenCalled()
  })

  it('should show empty cart message when no items', () => {
    vi.mocked(useCartStore).mockReturnValue({
      items: [],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getTotal: () => 0
    })
    
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.getByText('Start booking your trips')).toBeInTheDocument()
  })

  it('should navigate to checkout when proceed button is clicked', () => {
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    )
    
    const checkoutButton = screen.getByRole('link', { name: /proceed to checkout/i })
    expect(checkoutButton).toHaveAttribute('href', '/checkout')
  })
}) 