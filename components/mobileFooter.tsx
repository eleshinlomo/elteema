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
import PWAInstallButton from "./PWADownloadButton";

const MobileFooter = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const {isLoggedIn,setIsLoggedIn, user, setUser, showSearchPage, setShowSearchPage} = useContext(GeneralContext)
   const {cart, setCart, totalItems, totalPrice, setTotalItems, setTotalPrice} = useContext(CartContext)
   const router = useRouter()
  

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

   const handleHome = (tabName: string)=>{
     setActiveTab(tabName);
     setShowSearchPage(false)
  }

 

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
    
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200  py-2 flex justify-around items-center z-50">
      

        {/* Home */}
            <a href='/'><button
              onClick={() => handleHome("home")}
              className={`md:hidden flex flex-col items-center p-2 ${
                activeTab === "home" ? "text-green-600" : "text-gray-500"
              }`}
            >
             <div className="relative w-10 h-10 md:mt-1">
              <Image src='/images/logos/elteema_logo.png' alt='logo' fill />
             </div>
              {/* <span className="text-xs mt-1">Home</span> */}
            </button>
            </a>

   
    
      
      {/* Dashboard */}
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
      
      {/* Auth */}
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

       <PWAInstallButton />

      
      {/* Cart  shows only in mobile mode*/}
      <button
        onClick={() => handleTabClick("cart")}
        className={`flex flex-col items-center p-2 text-xs ${
          activeTab === "cart" ? "text-green-600" : "text-gray-500"
        }`}
      >
      <Cart />
      
      </button>
    </div>
   
    
  );
};

export default MobileFooter;