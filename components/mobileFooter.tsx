'use client'
import React, { useContext } from "react";
import { Home, Search, BarChart2, ShoppingBag, LogOutIcon } from "lucide-react";
import { GeneralContext } from "../contextProviders/GeneralProvider";
import { CartContext } from "../contextProviders/cartcontext";
import { logout } from "./api/auth";
import { fetchCart } from "./utils";
import { useRouter } from "next/navigation";

const MobileFooter = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const {isLoggedIn,setIsLoggedIn, user, setUser} = useContext(GeneralContext)
   const {cart, setCart, totalItems, totalPrice, setTotalItems, setTotalPrice} = useContext(CartContext)
   const router = useRouter()
  

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    // Add navigation logic here
  };

   const handleLogout = async () => {
      setIsLoggedIn(false)
      const response = await logout(user?.email)
      console.log(response)
      const newCart = fetchCart()
      setCart(newCart)
      setTotalItems(0)
      setTotalPrice(0)
      router.push('/')
    }


  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200  py-2 flex justify-around items-center z-50">
      <a href='/'><button
        onClick={() => handleTabClick("home")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "home" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-xs mt-1">Home</span>
      </button>
      </a>

      <button
        onClick={() => handleTabClick("search")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "search" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-xs mt-1">Search</span>
      </button>

      <a href='/dashboard'><button
        // onClick={() => handleTabClick("dashboard")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "dashboard" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <BarChart2 className="w-5 h-5" />
        <span className="text-xs mt-1">Dashboard</span>
      </button>
      </a>
      
      <div>
       {!isLoggedIn ?
       <a href='/authpages/signin'><button
        onClick={() => handleTabClick("marketplace")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "marketplace" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <LogOutIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Sign in</span>
      </button></a>:

      <button
        onClick={handleLogout}
        className={`flex flex-col items-center p-2 ${
          activeTab === "marketplace" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <LogOutIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Sign out</span>
      </button>}
      </div>
    </footer>
  );
};

export default MobileFooter;