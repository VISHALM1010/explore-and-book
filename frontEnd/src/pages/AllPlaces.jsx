import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/Allplaces')
      .then(response => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {places.length > 0 && places.map(place => (
          <Link 
            to={`/account/places/${place._id}`} 
            key={place._id}
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              {place.photos?.[0] && (
                <div className="mb-4 overflow-hidden rounded-2xl">
                  <img 
                    className="w-full h-48 object-cover rounded-2xl transform transition-transform duration-300 hover:scale-110" 
                    src={`http://localhost:3001/uploads/${place.photos[0]}`} 
                    alt={place.title} 
                  />
                </div>
              )}
              <div className="truncate">
                <h2 className="font-bold text-lg mb-2 truncate">{place.address}</h2>
                <h3 className="text-sm text-gray-600 truncate">{place.title}</h3>
                <h3 className="mt-2 font-bold text-lg">${place.price} per night</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllPlaces;
