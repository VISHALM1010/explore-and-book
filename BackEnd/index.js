const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const User = require('./Models/user.model');
const Place = require('./Models/place.model');
const registerUser = require('./Components/registerUser');
const loginUser = require('./Components/loginUser');
const createPlace = require('./Components/createPlace');
const { getUserAccount } = require('./Components/getUserAccount');
const createBooking = require('./Components/createBooking');
const Booking = require('./Models/Booking.model');
const getPlaces = require('./Components/getPlaces');
const getBookingById = require('./Components/getBookingById');
const getBookings = require('./Components/getBookings');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'Upload')));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/account', getUserAccount);
app.post('/places', createPlace);
app.post('/account/bookings', createBooking);
app.get('/places', getPlaces);
app.get('/account/bookings/:id', getBookingById);
app.get('/account/bookings', getBookings);

app.get('/Allplaces', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching places', error });
  }
});

app.get('/places/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching place', error });
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, sameSite: 'Strict', maxAge: 0 });
  res.json({ message: 'Logout successful' });
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  try {
    const options = { url: link, dest: path.join(__dirname, 'Upload', `${Date.now()}-image.jpg`) };
    const { filename } = await imageDownloader.image(options);
    const filePath = path.basename(filename);
    res.json(filePath);
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({ error: 'Failed to download image' });
  }
});

const upload = multer({ dest: 'Upload/' });
app.post('/upload', upload.array('file', 100), (req, res) => {
  const uploadedFiles = req.files.map(file => {
    const ext = path.extname(file.originalname);
    const newPath = `${file.path}${ext}`;
    fs.renameSync(file.path, newPath);
    return path.basename(newPath);
  });
  res.json(uploadedFiles);
});

app.use(express.static(path.join(__dirname, '..', 'frontEnd', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontEnd', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
