'use client'
import { useContext, useState, useEffect } from "react"
import { DashboardContext } from "@/components/contextproviders/dashboardcontext"



const CustomersDash = ()=>{
    const dashboardContext = useContext(DashboardContext)
    
    const {testDate} = dashboardContext

    return (
        <div>
          {testDate}
        </div>
    )
}

export default CustomersDash