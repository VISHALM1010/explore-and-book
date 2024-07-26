import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AccountNav from './AccountNav';

const BookingPlace = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/account/bookings/${id}`)
        .then((res) => {
          setBooking(res.data);
        })
        .catch((err) => {
          console.error('Error fetching booking:', err);
        });
    }
  }, [id]);

  if (!booking) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-white min-w-full min-h-screen z-50 overflow-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Photos of {booking.place.title}</h2>
        <button
          className="fixed top-4 right-4 flex gap-2 py-2 px-4 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition duration-300"
          onClick={() => setShowAllPhotos(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Close photos
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {booking.place.photos?.length > 0 && booking.place.photos.map((photo, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md">
              <img src={`http://localhost:3001/uploads/${photo}`} alt={`Photo ${index + 1}`} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <AccountNav />
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Booking Details</h1>
        <div className="space-y-2">
          <p><strong>Place:</strong> {booking.place.title || 'N/A'}</p>
          <p><strong>Check-in:</strong> {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Check-out:</strong> {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Price:</strong> {booking.price !== null ? `$${booking.price.toFixed(2)}` : 'N/A'}</p>
          <p><strong>Phone:</strong> {booking.phone || 'N/A'}</p>
        </div>
        <div className="rounded-2xl grid gap-4 grid-cols-1 lg:grid-cols-1">
          {booking.place.photos?.[0] && (
            <div className="overflow-hidden rounded-lg shadow-md mb-4">
              <img className="w-full h-96 object-cover rounded-lg" src={`http://localhost:3001/uploads/${booking.place.photos[0]}`} alt="Main Photo" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            {booking.place.photos?.[1] && (
              <div className="overflow-hidden rounded-lg shadow-md">
                <img className="w-full h-48 object-cover rounded-lg" src={`http://localhost:3001/uploads/${booking.place.photos[1]}`} alt="Photo 2" />
              </div>
            )}
            {booking.place.photos?.[2] && (
              <div className="overflow-hidden rounded-lg shadow-md">
                <img className="w-full h-48 object-cover rounded-lg" src={`http://localhost:3001/uploads/${booking.place.photos[2]}`} alt="Photo 3" />
              </div>
            )}
          </div>
          {booking.place.photos?.length > 3 && (
            <div className="text-center mt-4">
              <button onClick={() => setShowAllPhotos(true)} className="flex gap-2 items-center justify-center rounded-2xl bg-white p-2 shadow-md hover:bg-gray-100 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75L7.409 10.591a2.25 2.25 0 0 1 3.182 0L16.25 16.25m1.5-1.5L19.159 13.34a2.25 2.25 0 0 1 3.182 0L25.25 16.25m-23 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Show more photos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPlace;
