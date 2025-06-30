'use client'

import { useContext, useEffect } from "react"
import { GeneralContext } from "../../../../contextProviders/GeneralProvider"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import NotLoggedInPage from "../authpages/notLoggedInpage"
import DashSideBar from "./dashSidebar"
import DashNavBar from "./dashNavBar"



interface DashboardProps {
    children: React.ReactNode
}



const DashboardLayout = ({children}: DashboardProps)=>{


  const {isLoggedIn, user} = useContext(GeneralContext)
  const router = useRouter()
 
   
 
  useEffect(()=>{

}, [user, user?.orders])

  if(!isLoggedIn){
     return <NotLoggedInPage />
  }


 
    
  return (
    <div>
        
        
        <div>
            <div className="flex ">
                <div className="hidden md:block h-screen  w-1/4 ">
                    <DashSideBar user={user} />
                </div>

                 <div className="px-4 py-16">
                    <DashNavBar user={user} />
                    {children}
                </div>
            </div>
        
        
        </div>
          
          
        
    </div>
  )
}

export default DashboardLayout