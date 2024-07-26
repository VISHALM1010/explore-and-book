import React from 'react';

import AllPlaces from '../pages/AllPlaces';

const HomePage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
     
      <div className="p-4 flex-grow">
        <AllPlaces /> 
      </div>
    </div>
  );
};

export default HomePage;
