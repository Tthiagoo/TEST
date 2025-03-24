const PopularDestinations = () => {
  const destinations = [
    { name: 'Paris, France', description: 'The city of lights and love.' },
    { name: 'Tokyo, Japan', description: 'A bustling metropolis with rich culture.' },
    { name: 'New York, USA', description: 'The city that never sleeps.' },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Popular Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold">{destination.name}</h2>
            <p className="text-gray-600">{destination.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
