'use client'
import React, { createContext, useState } from "react"

interface GeneralProps {
    children: React.ReactNode
}

export interface GeneralContextInitialProps {
    isLoggedIn: boolean,
    setIsLoggedIn: (value: boolean)=> void,
    user: any | null,
    setUser: (value: null)=>void

}
const initialValues : GeneralContextInitialProps = {
  isLoggedIn: false,
  setIsLoggedIn: ()=>{},
  user: null,
  setUser: ()=>{}
}


export const GeneralContext = createContext(initialValues)
export const GeneralProvider = ({children}: GeneralProps)=>{

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<any | null>(null)

    

const values : GeneralContextInitialProps = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser
}
    return (
    <GeneralContext.Provider value={values}>
        {children}
    </GeneralContext.Provider>
    )
}