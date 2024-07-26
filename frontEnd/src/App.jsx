import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPages';
import HomePage from './components/HomePage';
import PlaceForm from './pages/PlaceForm';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPlace from './pages/BookingPlace';
import Layout from './components/Layout';
import axios from 'axios';
import { UserContextProvider } from './userContext/userContext';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
  
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="account/:subpage?" element={<ProfilePage />} />
            <Route path="account/places" element={<PlacesPage />} />
            <Route path="account/places/new" element={<PlaceForm />} />
            <Route path="account/places/:placeId" element={<PlacePage />} /> 
            <Route path="account/bookings" element={<BookingsPage />} /> 
            <Route path="account/bookings/:id" element={<BookingPlace />} /> 
          </Route>
        </Routes>

    </UserContextProvider>
  );
}

export default App;
