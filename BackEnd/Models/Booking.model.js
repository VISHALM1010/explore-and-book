const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  checkIn: Date,
  checkOut: Date,
  name: String,
  email: String,
  phone: String,
  price: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
