import { useQuery, useMutation } from 'react-query'
import { tripsService } from '../services/tripsService'
import { SearchParams, BookingDetails } from '../types'

export const useSearchTrips = (params: SearchParams) => {
  return useQuery(
    ['trips', params],
    () => tripsService.searchTrips(params),
    {
      enabled: Boolean(params.origin && params.destination && params.departureDate),
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )
}

export const useTripDetails = (id: string) => {
  return useQuery(
    ['trip', id],
    () => tripsService.getTripById(id),
    {
      enabled: Boolean(id),
      staleTime: 5 * 60 * 1000,
    }
  )
}

export const useCheckAvailability = () => {
  return useMutation(
    ({ tripId, quantity }: { tripId: string; quantity: number }) =>
      tripsService.checkAvailability(tripId, quantity)
  )
}

export const useCreateBooking = () => {
  return useMutation(
    (bookingDetails: BookingDetails) => tripsService.createBooking(bookingDetails)
  )
} 