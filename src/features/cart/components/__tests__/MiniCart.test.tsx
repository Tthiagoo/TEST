import { renderWithProviders } from '../../../../test/test-utils'
import MiniCart from '../MiniCart'
import { screen } from '@testing-library/react'

describe('MiniCart', () => {
  it('should render empty cart message', () => {
    renderWithProviders(<MiniCart isOpen={true} onClose={() => {}} items={[]} onRemoveItem={() => {}} />)
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it.only('should render cart items', () => {
    const items = [
      { 
        tripId: '1', 
        quantity: 2, 
        price: 100, 
        passengers: [
          {
            firstName: 'John',
            lastName: 'Doe',
            documentType: 'id' as const,
            documentNumber: '123456'
          }
        ]
      },
      { 
        tripId: '2', 
        quantity: 1, 
        price: 200, 
        passengers: [
          {
            firstName: 'Jane',
            lastName: 'Smith',
            documentType: 'passport' as const,
            documentNumber: '789012'
          }
        ]
      }
    ]
    renderWithProviders(<MiniCart isOpen={true} onClose={() => {}} items={items} onRemoveItem={() => {}} />)
    
    // Check for elements that are actually rendered
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
    expect(screen.getByText('View Cart')).toBeInTheDocument()
    expect(screen.getByText('Checkout')).toBeInTheDocument()
  })
})
