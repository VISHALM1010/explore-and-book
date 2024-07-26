const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  description: String,
  address: String,
  photos: [String],
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  price: Number
});

module.exports = mongoose.model('Place', placeSchema);
