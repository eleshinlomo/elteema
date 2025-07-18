'use client'
import React, { useState, useEffect, useContext } from 'react';
import { getLocalUser, updateLocalUser } from './utils';
import { GeneralContext } from '../contextProviders/GeneralProvider';
import { updateUserCookie } from './api/users';

const CookiePolicyPage = () => {
  const { user, setUser } = useContext(GeneralContext);
  const [showBanner, setShowBanner] = useState<boolean>(true);
   const [guestUser, setGuestUser] = useState<any | null>(null)

  

  useEffect(() => {
    if (user && user.isCookieAccepted === true || user && user.isCookieAccepted === false) {
      setShowBanner(false);
    }else if(guestUser && guestUser.isCookieAccepted === true || guestUser && guestUser.isCookieAccepted === false){
     setShowBanner(false)
    }else{
      setShowBanner(true)
    }
  }, [user, guestUser ]);



  useEffect(() => {
  const localUser = getLocalUser();
  if (localUser) {
    setGuestUser(localUser); // ⬅️ Initialize state from localStorage
  }
}, []);


  const handleCookieChoice = (accepted: boolean) => {
    
    
    if (!user) {
      const localUser = getLocalUser()
      if(localUser){
        const updatedUser = {...localUser, isCookieAccepted: accepted}
        setGuestUser(updatedUser)
        updateLocalUser(updatedUser);
        
      }else{
      const updatedUser = {...guestUser, anonymous: true, isCookieAccepted: accepted };
       setGuestUser(updatedUser)
       updateLocalUser(updatedUser);
        
      }
    }
  };

  const handleAcceptCookies = async () => {
    const accepted = true
    handleCookieChoice(accepted)
    if(user){
    const updatedUser = await updateUserCookie(user._id, accepted)
    updateLocalUser(updatedUser)
    setUser(user)
  }
  }

  const handleDeclineCookies = async () => {
    const accepted = false
    handleCookieChoice(false)
    if(user){
      const updatedUser = await updateUserCookie(user._id, accepted)
      updateLocalUser(updatedUser)
      setUser(user)
    }
  }



  return (
    <div>
    {showBanner ? 
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row justify-between items-center z-[9999]">
      <p className="text-sm text-center md:text-left mb-2 md:mb-0">
        We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.{' '}
        <a
          href="/policies/cookiepolicy"
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

export default CookiePolicyPage;