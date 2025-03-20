describe('Cart Functionality', () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit('/')
    
    // Mock the trips API response
    cy.intercept('GET', '/api/trips/search*', {
      statusCode: 200,
      body: [
        {
          id: '1',
          origin: 'São Paulo',
          destination: 'Rio de Janeiro',
          departureDate: '2024-03-25T10:00:00',
          price: 150,
          company: 'Express Bus',
          duration: '6h',
          availableSeats: 45
        }
      ]
    }).as('searchTrips')
  })

  it('should add a trip to cart and show in mini cart', () => {
    // Search for a trip
    cy.get('[data-testid="origin-input"]').type('São Paulo')
    cy.get('[data-testid="destination-input"]').type('Rio de Janeiro')
    cy.get('[data-testid="departure-date"]').type('2024-03-25')
    cy.get('[data-testid="search-button"]').click()

    // Wait for search results
    cy.wait('@searchTrips')

    // Add trip to cart
    cy.get('[data-testid="add-to-cart-button"]').first().click()

    // Open mini cart
    cy.get('[data-testid="cart-icon"]').click()

    // Verify trip is in mini cart
    cy.get('[data-testid="mini-cart"]').within(() => {
      cy.contains('São Paulo')
      cy.contains('Rio de Janeiro')
      cy.contains('R$ 150,00')
      cy.contains('1') // Quantity
    })
  })

  it('should navigate to cart page and update quantity', () => {
    // Add item to cart first
    cy.get('[data-testid="origin-input"]').type('São Paulo')
    cy.get('[data-testid="destination-input"]').type('Rio de Janeiro')
    cy.get('[data-testid="departure-date"]').type('2024-03-25')
    cy.get('[data-testid="search-button"]').click()
    cy.wait('@searchTrips')
    cy.get('[data-testid="add-to-cart-button"]').first().click()

    // Go to cart page
    cy.get('[data-testid="cart-icon"]').click()
    cy.get('[data-testid="view-cart-button"]').click()

    // Update quantity
    cy.get('[data-testid="increase-quantity"]').click()
    
    // Verify quantity and total price updated
    cy.get('[data-testid="quantity"]').should('have.text', '2')
    cy.get('[data-testid="total-price"]').should('contain', 'R$ 300,00')
  })

  it('should proceed to checkout from cart page', () => {
    // Add item to cart first
    cy.get('[data-testid="origin-input"]').type('São Paulo')
    cy.get('[data-testid="destination-input"]').type('Rio de Janeiro')
    cy.get('[data-testid="departure-date"]').type('2024-03-25')
    cy.get('[data-testid="search-button"]').click()
    cy.wait('@searchTrips')
    cy.get('[data-testid="add-to-cart-button"]').first().click()

    // Go to cart page
    cy.get('[data-testid="cart-icon"]').click()
    cy.get('[data-testid="view-cart-button"]').click()

    // Click proceed to checkout
    cy.get('[data-testid="proceed-to-checkout"]').click()

    // Verify we're on the checkout page
    cy.url().should('include', '/checkout')
  })

  it('should remove item from cart', () => {
    // Add item to cart first
    cy.get('[data-testid="origin-input"]').type('São Paulo')
    cy.get('[data-testid="destination-input"]').type('Rio de Janeiro')
    cy.get('[data-testid="departure-date"]').type('2024-03-25')
    cy.get('[data-testid="search-button"]').click()
    cy.wait('@searchTrips')
    cy.get('[data-testid="add-to-cart-button"]').first().click()

    // Go to cart page
    cy.get('[data-testid="cart-icon"]').click()
    cy.get('[data-testid="view-cart-button"]').click()

    // Remove item
    cy.get('[data-testid="remove-item"]').click()

    // Verify empty cart message
    cy.contains('Your cart is empty')
    cy.contains('Start booking your trips')
  })
}) 