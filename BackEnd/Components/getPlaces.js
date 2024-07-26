const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');
const Place = require('../Models/place.model');

const getPlaces = async (req, res) => {
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

    const places = await Place.find({ owner: user._id });
    res.json(places);
  } catch (err) {
    console.error('Error fetching places:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getPlaces;
