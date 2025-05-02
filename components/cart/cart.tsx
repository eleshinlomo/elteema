'use client'

import React, { useContext, useEffect, useRef, useState,  } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { CartContext } from '../../contextProviders/cartcontext';
import { GeneralContext } from "../../contextProviders/GeneralProvider";
import HeaderAlert from "../header/headeralert";
import CartBasket from "./cartbasket";
import { SidebarCloseIcon } from "lucide-react";
import { formatCurrency } from '../utils';



const Cart = () => {
  const {
    cart,
    totalItems,
    totalPrice,
    removeItem,
    handleQuantityIncrease,
    handleQuantityDecrease,
  } = useContext(CartContext);

  const { isLoggedIn } = useContext(GeneralContext);
  const router = useRouter();

  const [message, setMessage] = useState('You have nothing in your cart.');
  const [checkoutText, setCheckoutText] = useState('CHECK OUT');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const path = usePathname()

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setDrawerOpen(false);
      }
    };
  
    if (isDrawerOpen) {
      document.body.style.overflowY = 'hidden';
      document.body.style.overflowX = 'hidden'; // ⬅️ Prevent horizontal scroll
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'auto';
    }
  
    return () => {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen]);
  

  // Send to checkout
  const sendToCheckout = () => {
    if (!totalItems) {
      setMessage('You cannot checkout 0 item.');
      router.push('/');
      return;
    }

    if (!isLoggedIn) {
      setCheckoutText('Please sign in to check out');
      return;
    }

    router.push('/checkoutpage');
  };

  return (
    <div className="relative z-50">
      {/* Cart Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed top-6 right-6 p-3 z-50 rounded-full  shadow-lg hover:scale-110 transition"
        aria-label="Open cart"
      >
        <CartBasket />
      </button>

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm" />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform
           duration-300 flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-green-800 text-white">
          <HeaderAlert />
          <button onClick={() => setDrawerOpen(false)} className="p-1" aria-label="Close cart">
            <SidebarCloseIcon />
          </button>
        </div>

        {/* Subtotal Section */}
        <div className="p-4 bg-green-100 border-b border-green-200">
          <p className="text-green-800 font-bold text-lg">
            Subtotal ({totalItems ?? 0}): {formatCurrency('NGN', totalPrice) ?? 0}
          </p>
          <button
            onClick={sendToCheckout}
            className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg shadow-md transition"
          >
            {checkoutText}
          </button>
        </div>

        {/* Cart Items - this MUST take remaining height and be scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-green-800">{item.name}</h3>
                    <p className="text-green-600">{formatCurrency('NGN', item.price)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityDecrease(item.id)}
                      className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-700 rounded-full"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityIncrease(item.id)}
                      className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-700 rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-3 w-full text-red-700 bg-red-100 hover:bg-red-200 rounded-lg py-2 transition"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-green-700 font-semibold">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
