'use client';

import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../contextProviders/GeneralProvider";
import { useRouter } from "next/navigation";
import NotLoggedInPage from "../authpages/notLoggedInpage";
import DashSideBar from "./dashNavs/dashSidebar";
import DashNavBar from "./dashNavs/dashNavBar";
import { ProductProps } from "../../../../components/api/product";
import LoadingState from "../../../../components/LoadingState";

interface DashboardProps {
    children: React.ReactNode
}

const DashboardLayout = ({children}: DashboardProps) => {
    const {isLoggedIn, user, setUserOrders, isLoading} = useContext(GeneralContext);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        if (user?.orders?.length > 0) {
            setUserOrders(user.orders);
        }
    }, [user]);

    useEffect(() => {
        // This effect will run when isLoggedIn changes from undefined to true/false
        if (isLoggedIn !== undefined) {
            setAuthChecked(true);
        }
    }, [isLoggedIn]);

    // Show loading state until auth is confirmed
    if (!authChecked || isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <LoadingState />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 pt-16">
            {isLoggedIn ? (
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
                <NotLoggedInPage />
            )}
        </div>
    );
};

export default DashboardLayout;