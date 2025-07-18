'use client'

import { useContext, useEffect, useState } from "react"
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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)


    useEffect(() => {
        // Simulate auth check delay (replace with actual auth check if needed)
        const timer = setTimeout(() => {
            setIsCheckingAuth(false)
        }, 50)

        return () => clearTimeout(timer)
    }, [isLoggedIn, user])
 
   
    if(isCheckingAuth){
      return <div className="py-24 text-center w-full">Loading page...</div>
    }
 

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

                 <div className=" py-24">
                    <DashNavBar user={user} />
                    {children}
                </div>
            </div>
        
        
        </div>
          
          
        
    </div>
  )
}

export default DashboardLayout