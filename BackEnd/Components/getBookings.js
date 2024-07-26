const Booking = require('../Models/Booking.model');
const jwt = require('jsonwebtoken');

const getBookings = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const bookings = await Booking.find({ user: userData._id }).populate('place');
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getBookings;
