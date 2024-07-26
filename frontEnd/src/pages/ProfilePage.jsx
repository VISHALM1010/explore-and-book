import React, { useContext } from 'react';
import { UserContext } from '../userContext/userContext';
import { Navigate, useParams } from 'react-router-dom';
import PlacesPage from './PlacesPage';
import AccountPage from './AccountPage';
import AccountNav from './AccountNav';
import BookingsPage from './BookingsPage';

const ProfilePage = () => {
  const { user, loading } = useContext(UserContext);
  let { subpage } = useParams();

  if (!subpage) {
    subpage = 'profile';
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-200 to-green-500">
      <AccountNav />
      {subpage === 'profile' && <AccountPage />}
      {subpage === 'bookings' && <BookingsPage />}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
