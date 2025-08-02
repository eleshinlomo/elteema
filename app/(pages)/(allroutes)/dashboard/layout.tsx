'use client';

import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../../contextProviders/GeneralProvider";
import { useRouter } from "next/navigation";
import DashSideBar from "./dashNavs/dashSidebar";
import DashNavBar from "./dashNavs/dashNavBar";
import LoadingState from "../../../../components/LoadingState";
import { getLocalUser } from "../../../../components/utils";

interface DashboardProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardProps) => {
    const { isLoggedIn, user, isLoading } = useContext(GeneralContext);
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const localUser = getLocalUser();
            if (!localUser || !localUser?.isLoggedIn) {
                router.push('/authpages/notloggedinpage');
            } else {
                setAuthChecked(true);
            }
        };

        if (!isLoading) {
            checkAuth();
        }
    }, [isLoading]);

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
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
