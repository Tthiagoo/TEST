export interface Trip {
  id: string
  origin: string
  destination: string
  departureDate: string
  returnDate?: string
  price: number
  availableSeats: number
  duration: string
  company: string
}

export interface CartItem {
  tripId: string
  quantity: number
  price: number
  passengers: Passenger[]
}

export interface Passenger {
  firstName: string
  lastName: string
  documentType: 'id' | 'passport'
  documentNumber: string
  email?: string
  phone?: string
}

export interface SearchParams {
  origin: string
  destination: string
  departureDate: string
  returnDate?: string
  passengers?: number
}

export interface PaymentInfo {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
}

export interface BookingDetails {
  tripId: string
  passengers: Passenger[]
  paymentInfo: PaymentInfo
  totalAmount: number
} 