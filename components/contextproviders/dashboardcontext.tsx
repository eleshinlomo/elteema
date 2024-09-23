
import React, { createContext, useContext, useState, useEffect } from "react";

interface DashbaordProps {
  children: React.ReactNode
}

const defaultValue = {
 testDate: ''
}

export const DashboardContext = createContext(defaultValue)

export const DashboardProvider = ({children}: DashbaordProps)=>{

    const [testDate, setTestDate] = useState('This is your Dashbaord')

    const value = {
      testDate
    }

    return (

        <DashboardContext.Provider value={value}>
          {children}
        </DashboardContext.Provider>
    )

}




