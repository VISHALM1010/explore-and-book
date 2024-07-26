import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingWidget from './BookingWidget';
import AccountNav from './AccountNav';

const PlacePage = () => {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios.get(`/places/${placeId}`)
      .then((response) => {
        setPlace(response.data);
      })
      .catch((error) => {
        console.error('Error fetching place data:', error);
      });
  }, [placeId]);

  if (!place) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="p-4">
          <h2 className="text-3xl font-bold mb-4">Photos of {place.title}</h2>
          <button
            className="fixed top-4 right-4 flex gap-2 py-2 px-4 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition duration-300"
            onClick={() => setShowAllPhotos(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close photos
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {place.photos?.length > 0 && place.photos.map((photo, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg ">
                <img src={`http://localhost:3001/uploads/${photo}`} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-300 to-indigo-200 p-6'>
      <AccountNav />
      <div className="mt-4 mx-auto max-w-7xl px-4 py-6 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{place.title}</h1>
        <a className="flex gap-1 font-semibold underline mb-4 text-blue-600 hover:text-blue-800" href={`https://maps.google.com/?q=${place.address}`} target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          {place.address}
        </a>
        <div className="rounded-2xl grid gap-4 grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div>
            {place.photos?.[0] && (
              <div className="overflow-hidden rounded-lg shadow-lg mb-4">
                <img className="w-full h-64 object-cover rounded-lg" src={`http://localhost:3001/uploads/${place.photos[0]}`} alt="Main Photo" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              {place.photos?.[1] && (
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img className="w-full h-64 object-cover rounded-lg" src={`http://localhost:3001/uploads/${place.photos[1]}`} alt="Photo 2" />
                </div>
              )}
              {place.photos?.[2] && (
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img className="w-full h-64 object-cover rounded-lg" src={`http://localhost:3001/uploads/${place.photos[2]}`} alt="Photo 3" />
                </div>
              )}
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex gap-2 items-center justify-center rounded-2xl bg-white p-2 mt-4 shadow-md hover:bg-gray-100 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21.75h19.5M12 4.5v15M4.5 12h15" />
              </svg>
              Show more photos
            </button>
          </div>
          <div className="lg:m-4">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Description</h2>
            <p className="mb-4 text-gray-700">{place.description || 'No description available'}</p>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Perks</h2>
            <div className="grid grid-cols-2 gap-2">
              {place.perks?.length > 0 ? place.perks.map((perk, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-md">
                  {perk}
                </div>
              )) : 'No perks available'}
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Check-in Time</h2>
              <p className="mb-4 text-gray-700">{place.checkIn || 'Not specified'}</p>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Check-out Time</h2>
              <p className="mb-4 text-gray-700">{place.checkOut || 'Not specified'}</p>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Price per Night</h2>
              <p className="mb-4 text-gray-700">${place.price || 'Not specified'}</p>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Extra Info</h2>
              <p className="text-gray-700">{place.extraInfo || 'No extra information available'}</p>
            </div>
          </div>
        </div>
        <BookingWidget place={place} />
      </div>
    </div>
  );
};

export default PlacePage;
