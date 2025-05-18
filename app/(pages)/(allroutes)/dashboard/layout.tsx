'use client'

import { useContext, useEffect } from "react"
import { GeneralContext } from "../../../../contextProviders/GeneralProvider"
import { useRouter } from "next/navigation"
import SigninPage from "../authpages/signin/page"
import Image from 'next/image'
import NotLoggedInPage from "../authpages/notLoggedInpage"


interface DashboardProps {
    children: React.ReactNode
}



const DashboardLayout = ({children}: DashboardProps)=>{

  const generalContext = useContext(GeneralContext)
  const {isLoggedIn} = generalContext
  const router = useRouter()

 
    
  return (
    <div>
        
        {isLoggedIn ?
        <div>
        {children}
        </div>: 
          <NotLoggedInPage />
          }
        
    </div>
  )
}

export default DashboardLayout