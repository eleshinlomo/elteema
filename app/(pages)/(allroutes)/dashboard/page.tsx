'use client'

import { useContext, useState } from "react";
import { GeneralContext } from "../../../../contextProviders/GeneralProvider";
import { MessageCircleIcon, StoreIcon, UserIcon, CreditCardIcon, ShoppingBagIcon, PlusCircleIcon } from "lucide-react";
import { FaRobot } from "react-icons/fa";
import StorePage from "./storepage/page";
import { capitalize } from "../../../../components/utils";
import { testStripe } from "../../../../components/api/payments";

const DashboardPage = () => {
    const {user, userOrders} = useContext(GeneralContext)
    const [alert, setAlert] = useState(false)

    const showAlert = ()=>{
       setAlert(true)
    }

    const hideAlert = ()=>{
       setAlert(false)
    }

    const cardItems = [
        {
            title: "Profile Information",
            icon: <UserIcon className="w-6 h-6 text-emerald-600" />,
            href: "/dashboard/profilepage",
            color: "bg-emerald-50 hover:bg-emerald-100",
            textColor: "text-emerald-700"
        },
        {
            title: "Orders",
            icon: <ShoppingBagIcon className="w-6 h-6 text-blue-600" />,
            href: "/dashboard/orders/userorderpage",
            color: "bg-blue-50 hover:bg-blue-100",
            textColor: "text-blue-700",
            badge: userOrders?.length || 0
        },
        {
            title: "Payment Methods",
            icon: <CreditCardIcon className="w-6 h-6 text-purple-600" />,
            href: "/dashboard/paymentmethodspage",
            color: "bg-purple-50 hover:bg-purple-100",
            textColor: "text-purple-700"
        },
        ...(user?.store ? [{
            title: user?.store?.storeName ? "My Store" : "Create Store",
            icon: <StoreIcon className="w-6 h-6 text-amber-600" />,
            href: user?.store?.storeName ? '/dashboard/storepage' : '/dashboard/createstorepage',
            color: "bg-amber-50 hover:bg-amber-100",
            textColor: "text-amber-700"
        }] : [])
    ]
    
    const handleTest = async ()=>{
        await testStripe()
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Your Dashboard</h2>
                    <p className="text-lg text-gray-600">
                        Hello <span className="font-semibold text-emerald-600">{capitalize(user?.username)}</span>, how&apos;s the market today?
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cardItems.map((item, index) => (
                        <a 
                            key={index}
                            href={item.href}
                            className={`${item.color} ${item.textColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center border border-transparent hover:border-gray-200`}
                        >
                            <div className="bg-white p-3 rounded-full shadow-inner mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                            {item.badge !== undefined && (
                                <span className="mt-2 px-3 py-1 bg-white rounded-full text-sm font-medium shadow-inner">
                                    {item.badge} order{item.badge !== 1 ? 's' : ''}
                                </span>
                            )}
                            <div className="mt-4 text-sm text-gray-500 hover:text-current">
                                View details →
                            </div>
                        </a>
                    ))}
                </div>

                {alert && (
                    <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                        Alert message goes here
                    </div>
                )}
            </div>

           
        </div>
    );
};

export default DashboardPage;