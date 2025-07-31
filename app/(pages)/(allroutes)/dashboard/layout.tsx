'use client';

import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../contextProviders/GeneralProvider";
import { useRouter } from "next/navigation";
import DashSideBar from "./dashNavs/dashSidebar";
import DashNavBar from "./dashNavs/dashNavBar";
import LoadingState from "../../../../components/LoadingState";

interface DashboardProps {
    children: React.ReactNode
}

const DashboardLayout = ({children}: DashboardProps) => {
    const { isLoggedIn, user, setUserOrders, isLoading } = useContext(GeneralContext);
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
        if (isLoading) return; // Wait for auth check to finish

        const localUserString = localStorage.getItem('ptlgUser');
        const localUser = localUserString ? JSON.parse(localUserString) : null;

        if (!localUser?.isLoggedIn) {
            router.push('/authpages/notloggedinpage');
        } else {
            setAuthChecked(true);
            if (user?.orders?.length > 0) {
                setUserOrders(user.orders);
            }
        }
    };

    checkAuth();
}, [isLoggedIn, user, isLoading]);


    if (isLoading || !authChecked) {
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