const Place = require('../Models/place.model');
const User = require('../Models/user.model');
const jwt = require('jsonwebtoken');

const createPlace = async (req, res) => {
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
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      title,
      description,
      address,
      photos,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      price,
    } = req.body;

    const newPlace = new Place({
      owner: user._id,
      title,
      description,
      address,
      photos,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      price
    });

    const place = await newPlace.save();
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = createPlace;
