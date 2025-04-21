'use client'
import React, { createContext, useState } from "react"

interface GeneralProps {
    children: React.ReactNode
}

export interface GeneralContextInitialProps {
    isLoggedIn: boolean,
    setIsLoggedIn: (value: boolean)=> void
}
const initialValues : GeneralContextInitialProps = {
  isLoggedIn: false,
  setIsLoggedIn: ()=>{}
}

export const GeneralContext = createContext(initialValues)
export const GeneralProvider = ({children}: GeneralProps)=>{

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

const values : GeneralContextInitialProps = {
    isLoggedIn,
    setIsLoggedIn
}
    return (
    <GeneralContext.Provider value={values}>
        {children}
    </GeneralContext.Provider>
    )
}