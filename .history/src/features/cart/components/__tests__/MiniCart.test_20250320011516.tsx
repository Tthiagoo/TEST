import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import MiniCart from '../MiniCart'
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

describe('MiniCart', () => {
  it('should display cart items with basic information', () => {
    const mockCart = {
      items: [{ tripId: '1', quantity: 2 }],
      removeFromCart: vi.fn()
    }
    
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    vi.mocked(useTripDetails).mockReturnValue({ 
      data: mockTrip,
      isLoading: false,
      isError: false,
      error: null,
      isIdle: false,
      isLoadingError: false,
      isSuccess: true,
      isFetching: false,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      isFetched: true,
      isFetchedAfterMount: true,
      status: 'success',
      errorUpdatedAt: 0,
      failureCount: 0,
      errorUpdateCount: 0,
      refetch: vi.fn(),
      remove: vi.fn(),
      dataUpdatedAt: 0,
      isPlaceholderData: false,
      isPreviousData: false
    })
    
    render(
      <BrowserRouter>
        <MiniCart isOpen={true} onClose={() => {}} />
      </BrowserRouter>
    )
    
    expect(screen.getByText('São Paulo')).toBeInTheDocument()
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument()
    expect(screen.getByText('R$ 150,00')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should show empty cart message when no items', () => {
    const mockCart = {
      items: [],
      removeFromCart: vi.fn()
    }
    
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    
    render(
      <BrowserRouter>
        <MiniCart isOpen={true} onClose={() => {}} />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('should call removeFromCart when remove button is clicked', () => {
    const removeFromCart = vi.fn()
    const mockCart = {
      items: [{ tripId: '1', quantity: 2 }],
      removeFromCart
    }
    
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    vi.mocked(useTripDetails).mockReturnValue({ 
      data: mockTrip,
      isLoading: false,
      isError: false,
      error: null,
      isIdle: false,
      isLoadingError: false,
      isSuccess: true,
      isFetching: false,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      isFetched: true,
      isFetchedAfterMount: true,
      status: 'success',
      errorUpdatedAt: 0,
      failureCount: 0,
      errorUpdateCount: 0,
      refetch: vi.fn(),
      remove: vi.fn(),
      dataUpdatedAt: 0,
      isPlaceholderData: false,
      isPreviousData: false
    })
    
    render(
      <BrowserRouter>
        <MiniCart isOpen={true} onClose={() => {}} />
      </BrowserRouter>
    )
    
    const removeButton = screen.getByRole('button', { name: /remove/i })
    fireEvent.click(removeButton)
    
    expect(removeFromCart).toHaveBeenCalledWith('1')
  })

  it('should navigate to cart page when "View Cart" is clicked', () => {
    const mockCart = {
      items: [{ tripId: '1', quantity: 2 }],
      removeFromCart: vi.fn()
    }
    
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    vi.mocked(useTripDetails).mockReturnValue({ 
      data: mockTrip,
      isLoading: false,
      isError: false,
      error: null,
      isIdle: false,
      isLoadingError: false,
      isSuccess: true,
      isFetching: false,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      isFetched: true,
      isFetchedAfterMount: true,
      status: 'success',
      errorUpdatedAt: 0,
      failureCount: 0,
      errorUpdateCount: 0,
      refetch: vi.fn(),
      remove: vi.fn(),
      dataUpdatedAt: 0,
      isPlaceholderData: false,
      isPreviousData: false
    })
    
    render(
      <BrowserRouter>
        <MiniCart isOpen={true} onClose={() => {}} />
      </BrowserRouter>
    )
    
    const viewCartButton = screen.getByRole('link', { name: /view cart/i })
    expect(viewCartButton).toHaveAttribute('href', '/cart')
  })
}) 