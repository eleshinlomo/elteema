'use client'
import React, { createContext, useState } from "react"

interface GeneralProps {
    children: React.ReactNode
}

export interface GeneralContextInitialProps {
    isLoggedIn: boolean,
    isLoading: boolean;
    sticky: boolean;
    setSticky: (value: boolean)=> void;
    setIsLoading: (value: boolean)=> void;
    setIsLoggedIn: (value: boolean)=> void;
    user: any | null;
    setUser: (value: null)=>void;

}
const initialValues : GeneralContextInitialProps = {
  sticky: false,
  setSticky: ()=>{},
  isLoggedIn: false,
  setIsLoggedIn: ()=>{},
  isLoading: false,
  setIsLoading: ()=>{},
  user: null,
  setUser: ()=>{}
}


export const GeneralContext = createContext(initialValues)
export const GeneralProvider = ({children}: GeneralProps)=>{

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [sticky, setSticky] = useState(false);

    

const values : GeneralContextInitialProps = {
    sticky,
    setSticky,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading,
    user,
    setUser
}
    return (
    <GeneralContext.Provider value={values}>
        {children}
    </GeneralContext.Provider>
    )
}