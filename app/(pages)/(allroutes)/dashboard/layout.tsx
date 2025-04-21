'use client'

import { useContext, useEffect } from "react"
import { GeneralContext } from "../../../../contextProviders/GeneralProvider"
import { useRouter } from "next/navigation"
import SigninPage from "../authpages/signin/page"


interface DashboardProps {
    children: React.ReactNode
}



const DashboardLayout = ({children}: DashboardProps)=>{

  const generalContext = useContext(GeneralContext)
  const {isLoggedIn} = generalContext
  const router = useRouter()

  // useEffect(()=>{
  //   if(!isLoggedIn){
  //     router.push('/authpages/signin')
  //    }
  // }, [isLoggedIn])
  
    
  return (
    <div>
        {isLoggedIn ?
        <div>
        {children}
        </div>: <SigninPage />
        }
    </div>
  )
}

export default DashboardLayout