import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import CartPage from '../CartPage'
import { useCartStore } from '../../store/cartStore'
import { useTripDetails } from '../../../trips/hooks/useTrips'

// Mock the hooks
vi.mock('../../store/cartStore', () => ({
  useCartStore: vi.fn()
}))

vi.mock('../../../trips/hooks/useTrips', () => ({
  useTripDetails: vi.fn()
}))

const mockTrip = {
  id: '1',
  origin: 'São Paulo',
  destination: 'Rio de Janeiro',
  departureDate: '2024-03-25T10:00:00',
  price: 150,
  company: 'Express Bus',
  duration: '6h',
  availableSeats: 45
}

describe('CartPage', () => {
  it('should display detailed cart information', () => {
    const mockCart = {
      items: [{ tripId: '1', quantity: 2 }],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn()
    }
    
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    vi.mocked(useTripDetails).mockReturnValue({ 
      data: mockTrip, 
      isLoading: false 
    })
    
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    )
    
    // Check if all trip details are displayed
    expect(screen.getByText('Express Bus')).toBeInTheDocument()
    expect(screen.getByText('São Paulo')).toBeInTheDocument()
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument()
    expect(screen.getByText(/March 25, 2024/)).toBeInTheDocument()
    expect(screen.getByText('6h')).toBeInTheDocument()
    expect(screen.getByText('R$ 300,00')).toBeInTheDocument() // Total price for 2 tickets
  })

  it('should update quantity when quantity controls are clicked', () => {
    const updateQuantity = vi.fn()
    const mockCart = {
      items: [{ tripId: '1', quantity: 2 }],
      removeFromCart: vi.fn(),
      updateQuantity
    }
    
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    vi.mocked(useTripDetails).mockReturnValue({ 
      data: mockTrip, 
      isLoading: false 
    })
    
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    )
    
    const increaseButton = screen.getByRole('button', { name: /increase quantity/i })
    fireEvent.click(increaseButton)
    
    expect(updateQuantity).toHaveBeenCalledWith('1', 3)
  })

  it('should show empty cart message when no items', () => {
    const mockCart = {
      items: [],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn()
    }
    
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.getByText('Start booking your trips')).toBeInTheDocument()
  })

  it('should navigate to checkout when proceed button is clicked', () => {
    const mockCart = {
      items: [{ tripId: '1', quantity: 2 }],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn()
    }
    
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    vi.mocked(useTripDetails).mockReturnValue({ 
      data: mockTrip, 
      isLoading: false 
    })
    
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    )
    
    const checkoutButton = screen.getByRole('link', { name: /proceed to checkout/i })
    expect(checkoutButton).toHaveAttribute('href', '/checkout')
  })
}) 