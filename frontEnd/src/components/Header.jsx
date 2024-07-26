import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext/userContext';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="bg-sky-200 shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 transform rotate-90 text-blue-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        <span className="font-bold text-2xl text-gray-800">BookHere</span>
      </Link>

      <div className="flex items-center gap-4 ">
        <div className="flex gap-2 text-sm text-gray-700">
          <div>Anywhere</div>
          <div className="border-l border-gray-300 h-5"></div>
          <div>Any week</div>
          <div className="border-l border-gray-300 h-5"></div>
          <div>Add guests</div>
        </div>
        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 hover:shadow-md transition-shadow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className="bg-gray-500 text-white rounded-full p-1 flex items-center justify-center w-8 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097C5.025 17.325 5.979 15 7.5 13.5c1.521-1.5 3.641-2.25 6-2.25s4.479.75 6 2.25c1.521 1.5 2.475 3.825 2.185 5.597ZM12 15.75c1.52 0 2.906.542 4 1.423A7.5 7.5 0 0 0 12 4.5a7.5 7.5 0 0 0-4 12.673 5.938 5.938 0 0 1 4-1.423Z" clipRule="evenodd" />
            </svg>
          </div>
          {!!user && <div className="ml-2 text-gray-800">{user.name}</div>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
