
import React, { createContext, useContext, useState, useEffect } from "react";

interface PageContextProps {
  children: React.ReactNode
  
}

const defaultValue = {
 isLoggedIn: false,
}

export const PagesContext = createContext(defaultValue)

export const PagesProvider = ({children}: PageContextProps)=>{

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    

   

    const getUser = ()=>{
      const userEmail = localStorage.getItem('email')
      if(userEmail) {
        console.log('Usermail', userEmail)
        setIsLoggedIn(false)
        console.log('IsLoggedIn PageContext', isLoggedIn)
      }else{
        console.log('User email not found')

      }

      
    }
    
    useEffect(()=>{
      getUser()
    }, [isLoggedIn])

    const value = {
      isLoggedIn,

    }

    return (

        <PagesContext.Provider value={value}>
          {children}
        </PagesContext.Provider>
    )

}




