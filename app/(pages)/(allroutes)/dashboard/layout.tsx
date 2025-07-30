'use client';

import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../contextProviders/GeneralProvider";
import { useRouter } from "next/navigation";
import DashSideBar from "./dashNavs/dashSidebar";
import DashNavBar from "./dashNavs/dashNavBar";
import { ProductProps } from "../../../../components/api/product";
import LoadingState from "../../../../components/LoadingState";


interface DashboardProps {
    children: React.ReactNode
}

const DashboardLayout = ({children}: DashboardProps) => {
    const {isLoggedIn, user, setUserOrders, isLoading, setIsLoading} = useContext(GeneralContext);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter()

   
    
  useEffect(()=>{
    const localUserString: any = localStorage.getItem('ptlgUser')
    const parsedUser = JSON.parse(localUserString)
    if(parsedUser?.isLoggedIn){
        setAuthChecked(true)
    }else{
        router.push('/authpages/notloggedinpage')
    }
  }, [authChecked])


    useEffect(() => {
        if (user?.orders?.length > 0) {
            setUserOrders(user.orders);
        }
    }, [user]);

  

 

   

    return (
        <div className="min-h-screen bg-gray-50 pb-24 pt-16">
            {authChecked ? (
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
            ) : (
                <LoadingState />
            )}
        </div>
    );
};

export default DashboardLayout;