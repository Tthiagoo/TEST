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
  }
]

export const tripsService = {
  searchTrips: async (params: SearchParams): Promise<Trip[]> => {
    await delay(1000) // Simulate API call
    
    // Filter trips based on search params
    return mockTrips.filter(trip => 
      trip.origin.toLowerCase().includes(params.origin.toLowerCase()) &&
      trip.destination.toLowerCase().includes(params.destination.toLowerCase()) &&
      trip.departureDate.startsWith(params.departureDate)
    )
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