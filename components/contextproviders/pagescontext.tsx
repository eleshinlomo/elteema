
import React, { createContext, useContext, useState, useEffect } from "react";

interface PageContextProps {
  children: React.ReactNode
  
}

const defaultValue = {
 isLoggedIn: false,
 username: "Guest"
}

export const PagesContext = createContext(defaultValue)

export const PagesProvider = ({children}: PageContextProps)=>{

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('Guest')

    const value = {
      isLoggedIn,
      username
    }

    return (

        <PagesContext.Provider value={value}>
          {children}
        </PagesContext.Provider>
    )

}




