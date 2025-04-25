'use client'

import { useContext, useEffect } from "react"
import { GeneralContext } from "../../../../contextProviders/GeneralProvider"
import { useRouter } from "next/navigation"
import SigninPage from "../authpages/signin/page"
import Image from 'next/image'


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
        <div>
          {/* <Image src='../../' /> */}
          <div>
          </div>Unauthorized access prevented.
          </div>}
        
    </div>
  )
}

export default DashboardLayout