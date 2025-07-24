'use client';

import { useContext, useEffect } from "react"
import { GeneralContext } from "../../../../contextProviders/GeneralProvider"
import { useRouter } from "next/navigation"
import NotLoggedInPage from "../authpages/notLoggedInpage"
import DashSideBar from "./dashNavs/dashSidebar"
import DashNavBar from "./dashNavs/dashNavBar"
import { ProductProps } from "../../../../components/api/product"

interface DashboardProps {
    children: React.ReactNode
}

const DashboardLayout = ({children}: DashboardProps) => {
    const {isLoggedIn, user, setUserOrders, isLoading} = useContext(GeneralContext)
    const router = useRouter()

    useEffect(() => {
        if(user?.orders?.length > 0){
            setUserOrders(user.orders)
        }
    }, [user])

    if(isLoading){
        return <div className="py-24 text-center w-full">Loading page...</div>
    }

    if(!isLoggedIn){
        return <NotLoggedInPage />
    }
    
    return (
        <div className="min-h-screen bg-gray-50 pb-24 pt-16">
            {/* Mobile first approach */}
            <div className="md:flex">
                {/* Sidebar - hidden on mobile, shown on desktop */}
                <div className="hidden md:block md:w-1/4 md:fixed md:h-screen md:overflow-y-auto">
                    <DashSideBar user={user} userOrders={user?.orders || []} />
                </div>

                {/* Main content area */}
                <div className="w-full md:ml-[25%]">
                    <DashNavBar user={user} userOrders={user?.orders || []} />
                    <main className="p-4 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout