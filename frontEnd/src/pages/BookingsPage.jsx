import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from './AccountNav';
import axios from 'axios';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/account/bookings').then((res) => {
      setBookings(res.data);
    }).catch((err) => {
      console.error('Error fetching bookings:', err);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <AccountNav />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.length > 0 && bookings.map((booking) => (
          <Link
            key={booking._id}
            to={`/account/bookings/${booking._id}`}
            className="overflow-hidden flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {booking.place.photos?.[0] && (
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  className="object-cover w-full h-48 transition-transform duration-500 hover:scale-110"
                  src={`http://localhost:3001/uploads/${booking.place.photos[0]}`}
                  alt="Main Photo"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-lg font-bold">View Details</span>
                </div>
              </div>
            )}
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{booking.place.title}</h2>
                <div className="mt-2 flex items-center gap-2 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))} nights</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 8.25a3.75 3.75 0 114.5 3.456V15a.75.75 0 01-1.5 0v-3.118A3.75 3.75 0 0115.75 8.25zM5.25 8.25a3.75 3.75 0 114.5 3.456V15a.75.75 0 01-1.5 0v-3.118A3.75 3.75 0 015.25 8.25zM16.5 15a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0V15zM5.25 15a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0V15zM12 15a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0V15z" />
                  </svg>
                  <span> Total Amount: ${booking.place.price} </span>
                </div>
                <div className="text-2xl font-bold">
                  ${booking.place.price * Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
