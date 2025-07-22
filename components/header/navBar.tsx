'use client'
import React, { useContext, useEffect, useState } from "react";
import { Home, Search, BarChart2, ShoppingBag, LogOutIcon, LogInIcon, WineIcon, HotelIcon, MenuIcon, PartyPopperIcon, HomeIcon, ForkKnifeCrossedIcon, SplineIcon, CookingPotIcon, ShirtIcon } from "lucide-react";
import { GeneralContext } from "../../contextProviders/GeneralProvider";
import { CartContext } from "../../contextProviders/cartcontext";
import { logout } from "../api/auth";
import { fetchCart } from "../utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cart from "../cart/cart";
import MenuButton from "./menuButton";
import { FaShoppingBag } from "react-icons/fa";

const NavBar = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const {isLoggedIn,setIsLoggedIn, user, setUser, showSearchPage, setShowSearchPage} = useContext(GeneralContext)
  const {cart, setCart, totalItems, totalPrice, setTotalItems, setTotalPrice} = useContext(CartContext)
  const router = useRouter()
  const store = user?.store
  const storeOrders = user?.store?.orders

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleLogout = async () => {
    setIsLoggedIn(false)
    const response = await logout(user?.email, user?.isCookieAccepted)
    console.log(response)
    const newCart = fetchCart()
    setCart(newCart)
    setTotalItems(0)
    setTotalPrice(0)
    router.push('/authpages/signin')
  }

  



  return (
    <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm py-2  md:px-4 z-50">
      <div className="flex justify-between items-center">

        {/* Home */}
        <a href='/'>
          <button
            onClick={() => handleTabClick("home")}
            className={`hidden md:flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "home" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <HomeIcon className="w-6 h-6" /> {/* Changed from w-5 h-5 for consistency */}
            <span className="text-xs mt-1">Home</span>
          </button>
        </a>

        {/* Fabrics */}
        <a href={`/categorypage/${'fabrics & textiles'}`}>
          <button
            onClick={() => handleTabClick("fabric")}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "fabric" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <ShirtIcon className="w-6 h-6" /> {/* Changed from w-5 h-5 for consistency */}
            <span className="text-xs mt-1">Fabric</span>
          </button>
        </a>

        {/* Spices */}
        <a href={`/categorypage/${'vegetable & spice'}`}>
          <button
            onClick={() => handleTabClick("spices")}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "spices" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <CookingPotIcon className="w-6 h-6" /> {/* Changed from w-5 h-5 */}
            <span className="text-xs mt-1">Spices</span>
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

        {/* Store */}
        <a href='/dashboard/storepage'
         className="relative"
        >
          <button
            onClick={() => handleTabClick("createstorelandingpage")}
            className={`absolute top-[-28px] right-[-25px] flex flex-col items-center p-2 transition-colors duration-200 ${
              activeTab === "createstorelandingpage" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FaShoppingBag className="w-6 h-6" /> {/* Changed from w-5 h-5 */}
            <span className="text-xs mt-1">{user?.store ? 'Store' : 'Sell'}</span>
          </button>
          <p className="absolute bg-green-600 text-white rounded-2xl px-2 left-[8px] top-[-26px]">
            {storeOrders?.currentOrders.length > 0 ? storeOrders?.currentOrders?.length : null}</p>
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
        {/* <div className="hidden md:flex">
          <PWAInstallButton />
        </div>
     */}
     
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