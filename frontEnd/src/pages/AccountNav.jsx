import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../userContext/userContext';

const AccountNav = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const subpage = location.pathname.split('/').pop();

  const linkClasses = (type) => {
    let classes = 'py-2 px-4 flex items-center gap-2 inline-flex';
    if (type === subpage) {
      classes += ' bg-green-600 text-white rounded-full ';
    } else {
      classes += ' bg-gray-100 text-gray-700 rounded-full hover:bg-green-300 transition';
    }
    return classes;
  };

  return (
    <nav className="w-full flex justify-center mt-20 gap-4 mb-5" aria-label="Profile navigation">
      <Link
        className={linkClasses('account')}
        to="/account"
        aria-current={subpage === 'account' ? 'page' : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
        My Profile
      </Link>
      <Link
        className={linkClasses('bookings')}
        to="/account/bookings"
        aria-current={subpage === 'bookings' ? 'page' : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z"
          />
          <path
            fillRule="evenodd"
            d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75-.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z"
            clipRule="evenodd"
          />
        </svg>
        My Bookings
      </Link>
      <Link
        className={linkClasses('places')}
        to="/account/places"
        aria-current={subpage === 'places' ? 'page' : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            d="M12 2a9.917 9.917 0 00-9.931 9.931c0 2.21.703 4.271 2.025 6.05 1.478 1.963 3.598 3.627 5.897 4.871a1.563 1.563 0 001.988 0c2.299-1.244 4.419-2.908 5.897-4.871a9.924 9.924 0 002.025-6.05A9.917 9.917 0 0012 2z"
          />
        </svg>
        My Accommodations
      </Link>
    </nav>
  );
};

export default AccountNav;
