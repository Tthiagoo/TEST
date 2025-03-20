import { Trip, SearchParams, BookingDetails } from '../types'

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock data
const mockTrips: Trip[] = [
  {
    id: '1',
    origin: 'São Paulo',
    destination: 'Rio de Janeiro',
    departureDate: '2024-03-25T10:00:00',
    price: 150,
    availableSeats: 45,
    duration: '6h',
    company: 'Express Bus'
  },
  {
    id: '2',
    origin: 'São Paulo',
    destination: 'Rio de Janeiro',
    departureDate: '2024-03-25T14:00:00',
    price: 180,
    availableSeats: 32,
    duration: '6h',
    company: 'Luxury Travel'
  },
  {
    id: '3',
    origin: 'Rio de Janeiro',
    destination: 'São Paulo',
    departureDate: '2024-03-25T08:00:00',
    price: 160,
    availableSeats: 38,
    duration: '6h',
    company: 'Express Bus'
  },
  {
    id: '4',
    origin: 'Curitiba',
    destination: 'Florianópolis',
    departureDate: '2024-03-25T09:00:00',
    price: 120,
    availableSeats: 42,
    duration: '4h',
    company: 'South Bus'
  },
  {
    id: '5',
    origin: 'Belo Horizonte',
    destination: 'São Paulo',
    departureDate: '2024-03-25T07:00:00',
    price: 200,
    availableSeats: 35,
    duration: '8h',
    company: 'Luxury Travel'
  }
]

export const tripsService = {
  searchTrips: async (params: SearchParams): Promise<Trip[]> => {
    await delay(1000) // Simulate API call
    
    // Return all trips if no search parameters are provided
    if (!params.origin && !params.destination && !params.departureDate) {
      return mockTrips
    }

    // More lenient search that returns results even with partial matches
    return mockTrips.filter(trip => {
      const originMatch = !params.origin || 
        trip.origin.toLowerCase().includes(params.origin.toLowerCase()) ||
        params.origin.toLowerCase().includes(trip.origin.toLowerCase())
      
      const destinationMatch = !params.destination || 
        trip.destination.toLowerCase().includes(params.destination.toLowerCase()) ||
        params.destination.toLowerCase().includes(trip.destination.toLowerCase())
      
      const dateMatch = !params.departureDate || 
        trip.departureDate.startsWith(params.departureDate)

      return originMatch && destinationMatch && dateMatch
    })
  },

  getTripById: async (id: string): Promise<Trip | null> => {
    await delay(500)
    return mockTrips.find(trip => trip.id === id) || null
  },

  checkAvailability: async (tripId: string, quantity: number): Promise<boolean> => {
    await delay(500)
    const trip = mockTrips.find(t => t.id === tripId)
    return trip ? trip.availableSeats >= quantity : false
  },

  createBooking: async (bookingDetails: BookingDetails): Promise<{ bookingId: string }> => {
    await delay(1500)
    // Simulate booking creation
    return { bookingId: Math.random().toString(36).substring(7) }
  }
} 