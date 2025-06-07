'use client'
import React, { useState, useEffect, useContext } from 'react';
import { updateLocalUser } from './data/userdata';
import { GeneralContext } from '../contextProviders/GeneralProvider';

const CookiePolicy = () => {
  const { user, setUser } = useContext(GeneralContext);
  const [showBanner, setShowBanner] = useState<boolean | null>(null);

  console.log('USER', user);

  useEffect(() => {
    if (user) {
      setShowBanner(user.cookiesAccepted || user.cookiesAccepted === false ? false : true);
    }else{
      setShowBanner(true)
    }
  }, [user]);

  const handleCookieChoice = (accepted: boolean) => {
    let updatedUser;
    
    if (user) {
      updatedUser = { ...user, cookiesAccepted: accepted };
    } else {
      updatedUser = { anonymous: true, cookiesAccepted: accepted };
    }

    updateLocalUser(updatedUser);
    setUser(updatedUser);
    setShowBanner(false);
  };

  const handleAcceptCookies = () => handleCookieChoice(true);
  const handleDeclineCookies = () => handleCookieChoice(false);

  if (showBanner === null || !showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row justify-between items-center z-[9999]">
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
    </div>
  );
};

export default CookiePolicy;