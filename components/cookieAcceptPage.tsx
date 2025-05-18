'use client'
import React, { useState, useEffect, useContext } from 'react';
import {saveUser} from './data/userdata'
import { UserProps } from './data/userdata';
import { GeneralContext } from '../contextProviders/GeneralProvider';





const CookiePolicy = () => {
  const [showBanner, setShowBanner] = useState(false);
  const {user, setUser} = useContext(GeneralContext)

   console.log('USER', user)

  useEffect(() => {

  
    if(user){
    const {cookiesAccepted} = user
    if(cookiesAccepted){
        setShowBanner(false)
    }
    }else{
        setShowBanner(true)
    }

    
  }, []);

  const handleAcceptCookies = () => {
    const updatedUser: any = {...user, cookiesAccepted: true};
    saveUser(updatedUser)
    setShowBanner(false);
    
  };

  const handleDeclineCookies = () => {
    // Handle the case where the user declines cookies
    const updatedUser: UserProps = {...user, cookiesAccepted: false};
    saveUser(updatedUser)
    setShowBanner(false);
  };

 

  return (
    <div className="">
      
      {showBanner ?
      <div className='fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row justify-between items-center z-[9999]'>
      <p className="text-sm text-center md:text-left mb-2 md:mb-0">
        We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.{' '}
        <a
          href="/cookie-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 underline hover:text-green-300"
        >
          Learn more
        </a>
      </p>
      <div className="flex space-x-2">
        <button
          onClick={handleAcceptCookies}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Accept
        </button>
        <button
          onClick={handleDeclineCookies}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
        >
          Decline
        </button>
      </div>
      </div>: null}
    </div>
  );
};

export default CookiePolicy;