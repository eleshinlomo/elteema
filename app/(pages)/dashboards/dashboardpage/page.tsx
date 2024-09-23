'use client'
import { useContext, useState, useEffect } from "react"
import { DashboardContext } from "@/components/contextproviders/dashboardcontext"



const DashboardPage = ()=>{

  const dashboardContext = useContext(DashboardContext)

    const {testDate} = dashboardContext

    return (
        <div className="flex flex-col justify-center items-center pt-24 pb-8">
          {testDate}
        </div>
    )
}

export default DashboardPage