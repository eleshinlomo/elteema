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
    <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm py-2 px-2 md:px-4 z-50">
      <div className="flex justify-between items-center">
        {/* Home - Adjusted to match other icons */}
        <a href='/'>
          <button
            onClick={() => handleTabClick("home")}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "home" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div className="relative w-6 h-6"> 
              <Image 
                src='/images/logos/elteema_logo.png' 
                alt='logo' 
                fill 
                className="object-contain" 
                sizes="24px" // Added sizes attribute for optimization
              />
            </div>
            <span className="text-xs mt-1">Home</span> 
          </button>
        </a>

        {/* Restaurants */}
        <a href='/restaurantpage'>
          <button
            onClick={() => handleTabClick("restaurants")}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "restaurants" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <WineIcon className="w-6 h-6" /> {/* Changed from w-5 h-5 for consistency */}
            <span className="text-xs mt-1">Restaurants</span>
          </button>
        </a>

        {/* Events */}
        <a href='/eventpage'>
          <button
            onClick={() => handleTabClick("events")}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "events" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <PartyPopperIcon className="w-6 h-6" /> {/* Changed from w-5 h-5 */}
            <span className="text-xs mt-1">Events</span>
          </button>
        </a>

        {/* Dashboard */}
        <a href='/dashboard'>
          <button
            onClick={() => handleTabClick("dashboard")}
            className={`hidden md:flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "dashboard" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <BarChart2 className="w-6 h-6" /> {/* Changed from w-5 h-5 */}
            <span className="text-xs mt-1">Dashboard</span>
          </button>
        </a>

        {/* Supermarket */}
        <a href='/supermarketpage'>
          <button
            onClick={() => handleTabClick("supermarket")}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "supermarket" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FaShoppingBag className="w-6 h-6" /> {/* Changed from w-5 h-5 */}
            <span className="text-xs mt-1">Supermarket</span>
          </button>
        </a>

        {/* Auth */}
        <div>
          {!isLoggedIn ?
            <a href='/authpages/signin'>
              <button
                onClick={() => handleTabClick("signin")}
                className={`hidden md:flex flex-col items-center p-2 transition-colors duration-200 ${
                  activeTab === "signin" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <LogInIcon className="w-6 h-6" /> {/* Changed from w-5 h-5 */}
                <span className="text-xs mt-1">Sign in</span>
              </button>
            </a> :
            <button
              onClick={handleLogout}
              className={`hidden md:flex flex-col items-center p-2 transition-colors duration-200 ${
                activeTab === "signout" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LogOutIcon className="w-6 h-6" /> {/* Changed from w-5 h-5 */}
              <span className="text-xs mt-1">Sign out</span>
            </button>
          }
        </div>
        
        {/* App install desktop mode */}
        <div className="hidden md:flex">
          <PWAInstallButton />
        </div>
    
        {/* Cart - shows only in desktop mode */}
        <div className="hidden md:flex">
          <button
            onClick={() => handleTabClick("cart")}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "cart" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Cart />
          </button>
        </div>

        {/* Menu - shows always */}
        <div className="w-16 flex-shrink-0">
          <button
            onClick={() => handleTabClick("menu")}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "menu" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
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