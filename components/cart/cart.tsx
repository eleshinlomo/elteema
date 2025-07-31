'use client'

import React, { useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { CartContext } from '../../contextProviders/cartcontext';
import { GeneralContext } from "../../contextProviders/GeneralProvider";
import HeaderAlert from "../header/headeralert";
import CartBasket from "./cartbasket";
import { ShieldCloseIcon, SidebarClose, SidebarCloseIcon } from "lucide-react";
import { formatCurrency } from '../utils';

const Cart = () => {
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
      router.push('/dashboard/checkoutpage');
      setDrawerOpen(false);
    }
  };



  return (
    <div className="">
      {/* Cart Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        aria-label="Open cart"
        suppressHydrationWarning
      >
        <CartBasket />
      </button>

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100" />
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

        {/* Subtotal Section */}
        <div className="p-4  bg-green-100 border-b border-green-200">
          <div className='flex gap-2'>
          <p className="text-green-800 font-bold text-lg">
            Subtotal ({totalItems ?? 0}): {formatCurrency('NGN', totalPrice) ?? 0}
          </p>
          <a href='/'><button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white'>
            Conitnue shopping</button></a>
          </div>
          <button
            onClick={sendToCheckout}
            className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg shadow-md transition"
          >
            {checkoutText}
          </button>
         
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <a href={`/productpage/${item._id}`}>
                      <h3 className="font-semibold text-gray-800">{item.productName}</h3>
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityDecrease(item._id)}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-green-900">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityIncrease(item._id)}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <a href={`/productpage/${item._id}`}>
                    <p className="text-green-800 font-medium">
                    {formatCurrency('NGN', item.price )}
                    </p>
                  </a>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-700 bg-red-100 hover:bg-red-200 rounded-lg px-3 py-1 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600 font-semibold">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;