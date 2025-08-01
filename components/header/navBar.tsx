'use client';

import React, { useContext } from "react";
import { BarChart2, LogOutIcon, LogInIcon, HomeIcon, CookingPotIcon, ShirtIcon } from "lucide-react";
import { FaShoppingBag } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { GeneralContext } from "../../contextProviders/GeneralProvider";
import { CartContext } from "../../contextProviders/cartcontext";
import { logout } from "../api/auth";
import { fetchCart } from "../utils";
import Cart from "../cart/cart";
import MenuButton from "./menuButton";
import PWAInstallButton from "../PWADownloadButton";

const NavBar = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const { isLoggedIn, setIsLoggedIn, user } = useContext(GeneralContext);
  const { setCart, setTotalItems, setTotalPrice } = useContext(CartContext);
  const router = useRouter();
  const storeOrders = user?.store?.orders;

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    await logout(user?.email, user?.isCookieAccepted);
    setCart(fetchCart());
    setTotalItems(0);
    setTotalPrice(0);
    router.push('/authpages/signin');
  };

  const NavButton = ({
    href,
    tabName,
    icon: Icon,
    label,
    showBadge,
    badgeCount
  }: {
    href: string;
    tabName: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    showBadge?: boolean;
    badgeCount?: number;
  }) => (
    <div className="w-[70px] text-center shrink-0">
      <a href={href} className="block w-full">
        <button
          onClick={() => handleTabClick(tabName)}
          className={`flex flex-col items-center justify-center w-full p-2 transition-colors duration-200 text-xs ${
            activeTab === tabName ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <div className="relative">
            <Icon className="w-6 h-6 mx-auto shrink-0" />
            <span
              className={`absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-opacity duration-200 ${
                showBadge && badgeCount ? "opacity-100" : "opacity-0"
              }`}
            >
              {badgeCount || 0}
            </span>
          </div>
          <span className="mt-1">{label}</span>
        </button>
      </a>
    </div>
  );

  return (
    <div className="fixed w-full top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm py-2 md:px-4 z-100">
      <div className="flex items-center justify-between overflow-x-hidden flex-nowrap">
        {/* Home - hidden on mobile */}
        <div className="hidden md:block">
          <NavButton href="/" tabName="home" icon={HomeIcon} label="Home" />
        </div>

        {/* Fabrics */}
        <NavButton
          href={`/categorypage/${encodeURIComponent('fabrics & textiles')}`}
          tabName="fabric"
          icon={ShirtIcon}
          label="Fabric"
        />

        {/* Spices */}
        <NavButton
          href={`/categorypage/${encodeURIComponent('vegetable & spice')}`}
          tabName="spices"
          icon={CookingPotIcon}
          label="Spices"
        />

        {/* Dashboard - hidden on mobile */}
        <div className="hidden md:block">
          <NavButton href="/dashboard" tabName="dashboard" icon={BarChart2} label="Dashboard" />
        </div>

        {/* Store */}
        <NavButton
          href="/dashboard/storepage"
          tabName="store"
          icon={FaShoppingBag}
          label={user?.store ? "Store" : "Sell"}
          showBadge={true}
          badgeCount={storeOrders?.currentOrders.length}
        />

        {/* Auth - hidden on mobile */}
        <div className="hidden md:block w-[70px] text-center shrink-0">
          {!isLoggedIn ? (
            <NavButton
              href="/authpages/signin"
              tabName="signin"
              icon={LogInIcon}
              label="Sign in"
            />
          ) : (
            <button
              onClick={handleLogout}
              className={`flex flex-col items-center justify-center w-full p-2 transition-colors duration-200 text-xs ${
                activeTab === "signout" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LogOutIcon className="w-6 h-6 mx-auto shrink-0" />
              <span className="mt-1">Sign out</span>
            </button>
          )}
        </div>

        {/* App install - hidden on mobile */}
        <div className="hidden md:flex w-[70px] justify-center shrink-0">
          <PWAInstallButton />
        </div>

        {/* Cart - hidden on mobile */}
        <div className="hidden md:flex w-[70px] justify-center shrink-0">
          <button
            onClick={() => handleTabClick("cart")}
            className={`flex flex-col items-center justify-center w-full p-2 transition-colors duration-200 text-xs ${
              activeTab === "cart" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Cart />
          </button>
        </div>

        {/* Menu - always visible */}
        <div className="w-[70px] shrink-0 text-center">
          <button
            onClick={() => handleTabClick("menu")}
            className={`flex flex-col items-center justify-center w-full p-2 transition-colors duration-200 text-xs ${
            activeTab === "menu" ? "text-teal-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
        
          <MenuButton />
{/* 
          <span className="mt-1 block">Menu</span> */}
        </button>
      </div>


      </div>
    </div>
  );
};

export default NavBar;
