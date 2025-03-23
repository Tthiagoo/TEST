export interface Trip {
  id: string
  origin: string
  destination: string
  departureDate: string
  price: number
  company: string
  duration: string
  availableSeats: number
}

export interface SearchParams {
  origin: string
  destination: string
  departureDate: string
}

export interface BookingDetails {
  tripId: string
  quantity: number
  passengerDetails: {
    name: string
    email: string
    phone: string
  }
} 