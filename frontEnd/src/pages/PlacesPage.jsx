import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PlaceForm from './PlaceForm';
import axios from 'axios';
import AccountNav from './AccountNav';

const PlacesPage = () => {
    const { action } = useParams();
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleAddMorePlaces = () => {
        navigate('/account/places/new');
    };

    useEffect(() => {
        axios.get('/places').then((response) => {
            setPlaces(response.data);
            setLoading(false);
        }).catch((error) => {
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
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
            <AccountNav />
            <div className="flex justify-center items-center mb-8">
                <button
                    type="button"
                    onClick={handleAddMorePlaces}
                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Add More Places
                </button>
            </div>

            {action === 'new' ? (
                <PlaceForm handleCancel={() => navigate('/account/places')} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {places.length > 0 && places.map((place) => (
                        <Link 
                            to={`/account/places/${place._id}`} 
                            key={place._id} 
                            className="flex flex-col items-start bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
                        >
                            <div className="w-full h-48 bg-gray-200 mb-4 overflow-hidden rounded-md">
                                {place.photos.length > 0 && (
                                    <img 
                                        src={`http://localhost:3001/uploads/${place.photos[0]}`} 
                                        alt={place.title} 
                                        className="object-cover w-full h-full rounded-md transition-transform duration-300 transform hover:scale-105"
                                    />
                                )}
                            </div>
                            <h1 className="text-xl font-bold text-gray-800 mb-2 truncate">{place.title}</h1>
                            <p className="text-sm text-gray-600 mb-2 truncate">{place.address}</p>
                            <p className="text-sm text-gray-600 font-semibold">${place.price} per night</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlacesPage;
