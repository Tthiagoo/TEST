import { useNavigate } from 'react-router-dom'

const BookingConfirmation = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We've sent the booking details to your email.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Book Another Trip
          </button>
          
          <button
            onClick={() => navigate('/my-bookings')}
            className="w-full px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation 