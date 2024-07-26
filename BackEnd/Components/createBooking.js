const Booking = require('../Models/Booking.model');
const jwt = require('jsonwebtoken');

const createBooking = async (req, res) => {
  const { checkin, checkout, name, email, phone, price, placeId } = req.body;
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let userData;
  try {
    userData = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const booking = new Booking({
      place: placeId,
      user: userData._id,
      checkIn: checkin,
      checkOut: checkout,
      name,
      email,
      phone,
      price
    });
    await booking.save();
    res.json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = createBooking;
