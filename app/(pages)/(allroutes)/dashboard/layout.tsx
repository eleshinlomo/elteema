'use client';

import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../contextProviders/GeneralProvider";
import { useRouter } from "next/navigation";
import DashSideBar from "./dashNavs/dashSidebar";
import DashNavBar from "./dashNavs/dashNavBar";
import LoadingState from "../../../../components/LoadingState";
import { getLocalUser } from "../../../../components/utils";

interface DashboardProps {
    children: React.ReactNode
}

const DashboardLayout = ({children}: DashboardProps) => {
    const { isLoggedIn, user, setUserOrders, isLoading, setIsLoading } = useContext(GeneralContext);
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);

      



  const checkAuth = ()=>{
          
    setIsLoading(true)
   
    // Check localStorage only once on initial render
        const localUser = getLocalUser()

       if (!localUser?.isLoggedIn || !isLoggedIn) {
            router.push('/authpages/notloggedinpage');
            return
        }

          setAuthChecked(true);
            if (user?.orders?.length > 0) {
                setUserOrders(user.orders);
            }
        
     setIsLoading(false)

  }
            

    useEffect(() => {
    
          checkAuth()
     
    }, [authChecked]); // Only depend on isLoggedIn

    if (isLoading) {
        return <LoadingState />;
    }

   
   
    return (
        <div className="min-h-screen bg-gray-50 pb-24 pt-16">
            <div className="md:flex">
                <div className="hidden md:block md:w-1/4 md:fixed md:h-screen md:overflow-y-auto">
                    <DashSideBar user={user} userOrders={user?.orders || []} />
                </div>
                <div className="w-full md:ml-[25%]">
                    <DashNavBar user={user} userOrders={user?.orders || []} />
                    <main className="p-4 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;