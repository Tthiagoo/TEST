import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CartIcon from '../CartIcon'
import { useCartStore } from '../../store/cartStore'

// Mock the cart store
vi.mock('../../store/cartStore', () => ({
  useCartStore: vi.fn()
}))

describe('CartIcon', () => {
  it('should display the correct number of items in cart', () => {
    const mockCart = {
      items: [
        { tripId: '1', quantity: 2 },
        { tripId: '2', quantity: 1 }
      ]
    }
    
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    
    render(<CartIcon />)
    
    const badge = screen.getByTestId('cart-badge')
    expect(badge).toHaveTextContent('3')
  })

  it('should open mini cart when clicked', () => {
    const mockCart = { items: [] }
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    
    render(<CartIcon />)
    
    const cartButton = screen.getByRole('button')
    fireEvent.click(cartButton)
    
    // MiniCart should be visible
    expect(screen.getByTestId('mini-cart')).toBeInTheDocument()
  })

  it('should not show badge when cart is empty', () => {
    const mockCart = { items: [] }
    vi.mocked(useCartStore).mockReturnValue(mockCart)
    
    render(<CartIcon />)
    
    const badge = screen.queryByTestId('cart-badge')
    expect(badge).not.toBeInTheDocument()
  })
}) 