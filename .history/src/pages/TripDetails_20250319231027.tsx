import { useParams, useNavigate } from 'react-router-dom'

const TripDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-64 bg-gray-300">
          {/* Placeholder for trip image */}
        </div>
        
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">Trip to Paris</h1>
          <p className="text-gray-600 mb-6">
            Experience the magic of Paris with our carefully curated trip package.
            Visit iconic landmarks, enjoy local cuisine, and immerse yourself in French culture.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
              <ul className="space-y-2">
                <li><span className="font-medium">Duration:</span> 7 days</li>
                <li><span className="font-medium">Departure:</span> Paris, France</li>
                <li><span className="font-medium">Group Size:</span> Max 12 people</li>
                <li><span className="font-medium">Price:</span> $599 per person</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Included</h2>
              <ul className="space-y-2">
                <li>✓ Hotel accommodation</li>
                <li>✓ Guided tours</li>
                <li>✓ Local transportation</li>
                <li>✓ Welcome dinner</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => navigate('/checkout')}
              className="bg-primary-600 text-white rounded-lg px-6 py-3 hover:bg-primary-700"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetails 