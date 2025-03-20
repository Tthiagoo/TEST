const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border rounded-lg px-4 py-2"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="border rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="border rounded-lg px-4 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Trip to Paris</span>
                <span>$599</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>$59.90</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>$658.90</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-primary-600 text-white rounded-lg px-6 py-3 mt-6 hover:bg-primary-700">
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout 