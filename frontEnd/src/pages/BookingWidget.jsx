import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../userContext/userContext';

const BookingWidget = ({ place }) => {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const numberOfNights = () => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const difference = checkoutDate.getTime() - checkinDate.getTime();
    const nights = difference / (1000 * 60 * 60 * 24);
    return nights;
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [checkin, checkout]);

  const calculateTotalAmount = () => {
    const nights = numberOfNights();
    const total = nights * place.price;
    setTotalAmount(total);
  };

  const handleBookNow = async () => {
    const data = { checkin, checkout, phone, name, email, price: totalAmount, placeId: place._id };
    try {
      const response = await axios.post('/account/bookings', data);
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md mt-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-2">Check-in Time</h2>
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Check-out Time</h2>
          <input
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="col-span-2">
          <h2 className="text-lg font-bold mb-2">Price per Night: ${place.price}</h2>
        </div>
        <div className="col-span-2">
          {numberOfNights() > 0 && (
            <span className="text-sm ml-2">
              for {numberOfNights()} nights
            </span>
          )}
          <span className="text-sm ml-2">
            Total Amount: ${totalAmount}
          </span>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-1">Your Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg mb-2"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-1">Your Email ID:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg mb-2"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-1">Your Phone Number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg mb-2"
          />
        </div>
        <div className="col-span-2 text-center">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
