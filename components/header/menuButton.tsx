'use client'

import React, { useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { CartContext } from '../../contextProviders/cartcontext';
import { GeneralContext } from "../../contextProviders/GeneralProvider";
import { MenuIcon, ShieldCloseIcon, SidebarClose, SidebarCloseIcon } from "lucide-react";
import { formatCurrency } from '../utils';
import MenuContent from './menuContent';

const MenuButton = () => {
  const {
    cart,
    setCart,
    totalItems,
    totalPrice,
    removeItem,
    handleQuantityIncrease,
    handleQuantityDecrease,
  } = useContext(CartContext);

  const { isLoggedIn, sticky } = useContext(GeneralContext);
  const router = useRouter();

  const [message, setMessage] = useState('You have nothing in your cart.');
  const [checkoutText, setCheckoutText] = useState('CHECK OUT');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const path = usePathname();

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isDrawerOpen, cart]);

  const sendToCheckout = () => {
    if (!totalItems) {
      setMessage('You cannot checkout 0 item.');
      return;
    }

    if (!isLoggedIn) {
      setCheckoutText('Please sign in to check out');
      setDrawerOpen(false);
      router.push('/authpages/signin');
    } else {
      router.push('/checkoutpage');
      setDrawerOpen(false);
    }
  };

  useEffect(()=>{

  }, [cart, isLoggedIn, totalItems, totalPrice,])

  return (
    <div className="">
      {/* Menu Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
        suppressHydrationWarning
      >
        <MenuIcon className="w-8 h-8 mt-3 md:mt-6 mx-3" />
      </button>

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100"/>
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-screen w-full max-w-md bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex  justify-between p-4 bg-green-800 text-white">
          <a href='/' className='mt-2 font-extrabold'>ELTEEMA</a>
          <button 
            onClick={() => setDrawerOpen(false)} 
            className="p-1 text-xl h-8 w-8 font-extrabold" 
            aria-label="Close cart"
          >
            X
          </button>
        </div>

      <MenuContent setDrawerOpen={setDrawerOpen} />
      </div>
      
     
    </div>
  );
};

export default MenuButton;