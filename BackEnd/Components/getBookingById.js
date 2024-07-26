const jwt = require('jsonwebtoken');
const Booking = require('../Models/Booking.model');

const getBookingById = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let userData;
  try {
    userData = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const booking = await Booking.findOne({ _id: id, user: userData._id }).populate('place');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getBookingById;
