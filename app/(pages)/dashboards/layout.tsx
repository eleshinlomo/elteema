'use client'
import {DashboardProvider} from "@/components/contextproviders/dashboardcontext"
import { useState, useEffect, useContext} from "react"
import { PagesContext } from "@/components/contextproviders/pagescontext"
import { Button } from "@/components/ui/button"
import Link from "next/link"



interface DashboardProps {
    children: React.ReactNode
}


const DashboardLayout = ({children} : DashboardProps)=>{
  const pagesContext = useContext(PagesContext)

  const {isLoggedIn} = pagesContext
  console.log('Is LoggedIn dashboard layout', isLoggedIn)

    return (
           
         <div>
            {isLoggedIn && isLoggedIn === true ?
            <DashboardProvider>
            {children}
            </DashboardProvider> :
            <div className="text-center pt-[200px] flex flex-col justify-center items-center pb-6 px-2">

                <p>You need to be loggedin to view the dashboard</p>
                <Link href='/authpages/signin'><Button className="bg-green-500 hover:bg-green-500 text-white rounded-2xl mt-4">Please sign</Button></Link>
            </div>
            }
        </div>
         
        
    )

}

export default DashboardLayout