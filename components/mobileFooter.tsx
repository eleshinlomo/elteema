'use client'
import React, { useContext } from "react";
import { Home, Search, BarChart2, ShoppingBag, LogOutIcon, LogInIcon, MenuIcon } from "lucide-react";
import { GeneralContext } from "../contextProviders/GeneralProvider";
import { CartContext } from "../contextProviders/cartcontext";
import { logout } from "./api/auth";
import { fetchCart } from "./utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cart from "./cart/cart";

const MobileFooter = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const {isLoggedIn,setIsLoggedIn, user, setUser} = useContext(GeneralContext)
   const {cart, setCart, totalItems, totalPrice, setTotalItems, setTotalPrice} = useContext(CartContext)
   const router = useRouter()
  

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

   const handleLogout = async () => {
      setIsLoggedIn(false)
      const response = await logout(user?.email)
      console.log(response)
      const newCart = fetchCart()
      setCart(newCart)
      setTotalItems(0)
      setTotalPrice(0)
      router.push('/authpages/signin')
    }


  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200  py-2 flex justify-around items-center z-50">
   
   
       {/* Search */}
      <button
        onClick={() => handleTabClick("search")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "search" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-xs mt-1">Search</span>
      </button>

      <a href='/dashboard'><button
        onClick={() => handleTabClick("dashboard")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "dashboard" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <BarChart2 className="w-5 h-5" />
        <span className="text-xs mt-1">Dashboard</span>
      </button>
      </a>
      
      <div>
       {!isLoggedIn ?
       <a href='/authpages/signin'><button
        onClick={() => handleTabClick("signin")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "signin" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <LogInIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Sign in</span>
      </button></a>:

      <button
        onClick={handleLogout}
        className={`flex flex-col items-center p-2 ${
          activeTab === "signout" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <LogOutIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Sign out</span>
      </button>}
      </div>

      
      {/* Cart  shows only in mobile mode*/}
      <button
        onClick={() => handleTabClick("cart")}
        className={`flex flex-col items-center p-2 text-xs ${
          activeTab === "cart" ? "text-green-600" : "text-gray-500"
        }`}
      >
      <Cart />
      
      </button>
    </footer>
  );
};

export default MobileFooter;