'use client'
import React, { useContext } from "react";
import { Home, Search, BarChart2, ShoppingBag, LogOutIcon, LogInIcon, WineIcon, HotelIcon, MenuIcon, PartyPopperIcon } from "lucide-react";
import { GeneralContext } from "../../contextProviders/GeneralProvider";
import { CartContext } from "../../contextProviders/cartcontext";
import { logout } from "../api/auth";
import { fetchCart } from "../utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cart from "../cart/cart";
import PWAInstallButton from "../PWADownloadButton";
import MenuButton from "./menuButton";
import { FaShoppingBag } from "react-icons/fa";

const NavBar = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const {isLoggedIn,setIsLoggedIn, user, setUser, showSearchPage, setShowSearchPage} = useContext(GeneralContext)
   const {cart, setCart, totalItems, totalPrice, setTotalItems, setTotalPrice} = useContext(CartContext)
   const router = useRouter()
  

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

   const handleShowSearch = (tabName: string)=>{
     setActiveTab(tabName);
     setShowSearchPage(true)
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
    <div className=" fixed top-0 left-0 right-0 bg-white md:bg-white/50 border-t border-gray-200  py-2 px-2 md:px-4  z-50">
      
      <div className="flex justify-between">

      {/* Home */}
      <a href='/'><button
        onClick={() => handleTabClick("home")}
        className={`hidden md:flex flex-col items-center p-2 ${
          activeTab === "home" ? "text-green-600" : "text-gray-500"
        }`}
      >
       <div className="relative w-10 h-10 md:mt-1">
        <Image src='/images/logos/elteema_logo.png' alt='logo' fill />
       </div>
        {/* <span className="text-xs mt-1">Home</span> */}
      </button>
      </a>


           {/* Search */}
              <button
                onClick={() => handleShowSearch("search")}
                className={`md:hidden flex  flex-col items-center p-2 ${
                  activeTab === "search" ? "text-green-600" : "text-gray-500"
                }`}
              >
                <Search className="w-5 h-5" />
                <span className="text-xs mt-1">Search</span>
              </button>
      
       
      
       {/* Restaurants */}
          <a href='/restaurantpage'><button
        onClick={() => handleTabClick("restaurants")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "restaurants" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <WineIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Restaurants</span>
      </button>
      </a>


        {/* Events */}
      <a href='/eventpage'><button
        onClick={() => handleTabClick("events")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "events" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <PartyPopperIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Events</span>
      </button>
      </a>


        {/* Dashboard */}
      <a href='/dashboard'><button
        onClick={() => handleTabClick("dashboard")}
        className={`hidden md:flex flex-col items-center p-2 ${
          activeTab === "dashboard" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <BarChart2 className="w-5 h-5" />
        <span className="text-xs mt-1">Dashboard</span>
      </button>
      </a>

         {/* Supermarket */}
        <a href='/supermarketpage'><button
        onClick={() => handleTabClick("supermarket")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "supermarket" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <FaShoppingBag className="w-5 h-5" />
        <span className="text-xs mt-1">Supermarket</span>
      </button>
      </a>
      

      {/* Auth */}
      <div>
       {!isLoggedIn ?
       <a href='/authpages/signin'><button
        onClick={() => handleTabClick("signin")}
        className={`hidden md:flex flex-col items-center p-2 ${
          activeTab === "signin" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <LogInIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Sign in</span>
      </button></a>:

      <button
        onClick={handleLogout}
        className={`hidden md:flex flex-col items-center p-2 ${
          activeTab === "signout" ? "text-green-600" : "text-gray-500"
        }`}
      >
        <LogOutIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Sign out</span>
      </button>}
      </div>
        
        {/* App install desktop mode */}
        <div className="hidden md:flex"><PWAInstallButton /></div>
    
      {/* Cart  shows only in desktop mode*/}
      <div className="hidden md:flex">
      <button
        onClick={() => handleTabClick("cart")}
        className={`hidden md:flex flex-col items-center p-2 text-xs ${
          activeTab === "signout" ? "text-green-600" : "text-gray-500"
        }`}
      >
      <Cart />
      
      </button>
      </div>


      {/* Menu  shows always*/}
      <div className="w-16 flex-shrink-0">
      <button
        onClick={() => handleTabClick("menu")}
        className={`flex flex-col items-center p-2 text-xs ${
          activeTab === "menu" ? "text-green-600" : "text-gray-500"
        }`}
      >
      <MenuButton />
      <span className="text-xs">Menu</span>
      
      </button>
      </div>

      </div>
    </div>
  );
};

export default NavBar;