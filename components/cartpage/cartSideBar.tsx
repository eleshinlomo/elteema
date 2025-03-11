'use client'
import React, { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { CartContext } from '@/contextproviders/cartcontext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductProps } from '@/components/product/productsdata';
import CartBasket from './cartbasket';
import Image from 'next/image';
import HeaderAlert from '@/components/header/headeralert';

const CartSideBar = () => {
  const {
    totalItems,
    cart,
    removeItem,
    totalPrice,
    isLoggedIn,
    handleQuantityIncrease,
    handleQuantityDecrease,
  } = useContext(CartContext);

  const [message, setMessage] = useState('You have nothing in your cart.');
  const [checkoutText, setCheckoutText] = useState<string | React.ReactNode>('CHECK OUT');

  const notLoggedInMessage = (
    <div>
      Please <a href='/authpages/signin' className='text-green-500 font-extrabold hover:underline'>Sign in</a> to checkout
    </div>
  );

  const handleNoItem = () => {
    if (totalItems === 0) {
      setMessage('You cannot checkout 0 item.');
      return;
    }

    if (!isLoggedIn) {
      setCheckoutText(notLoggedInMessage);
      return;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <CartBasket />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-green-50 lg:max-w-screen-sm overflow-y-scroll max-h-screen z-[9999]">
        <SheetHeader>
          <SheetTitle className="bg-black w-full p-4 rounded-t-lg">
            <HeaderAlert />
          </SheetTitle>
          <SheetDescription className='text-center mt-4'>
            <div className='flex flex-col justify-center items-center space-y-4'>
              <Button
                className="bg-green-700 hover:bg-green-800 text-white rounded-2xl px-8 py-2 transition-all duration-300"
                onClick={handleNoItem}
              >
                {checkoutText}
              </Button>
              <p className='text-green-600'>
                Total Price: <span className='font-extrabold text-lg'>${totalPrice}</span>
              </p>
              {cart.length <= 1 ?
                <h2>There is <span className='text-green-800 font-extrabold text-lg'>{totalItems}</span> item in your cart.</h2> :
                <h2>There are <span className='text-green-800 font-extrabold text-lg'>{totalItems}</span> items in your cart.</h2>
              }
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-center items-center mt-6">
          {cart.length > 0 ?
            <div className="w-full">
              {cart.map((item: ProductProps) => (
                <div className='text-center my-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300' key={item.id}>
                  <div className='flex gap-6 flex-1 items-center justify-center'>
                    <Button
                      size='icon'
                      className='text-3xl font-extrabold bg-green-100 hover:bg-green-200 text-green-700'
                      onClick={() => handleQuantityDecrease(item.id)}
                    >
                      -
                    </Button>
                    <span className='mt-3 text-lg font-semibold'>{item.name} ({item.quantity})</span>
                    <Button
                      size='icon'
                      className='text-3xl font-extrabold mt-1 bg-green-100 hover:bg-green-200 text-green-700'
                      onClick={() => handleQuantityIncrease(item.id)}
                    >
                      +
                    </Button>
                  </div>
                  <div className='mt-4'>
                    <button
                      className='bg-green-600 hover:bg-green-700 rounded-2xl text-white px-4 py-2 transition-all duration-300'
                      onClick={() => removeItem(item.id)}
                    >
                      Remove item
                    </button>
                  </div>
                </div>
              ))}
            </div> :
            <div className='text-center'>
              <p className='font-extrabold text-red-500'>{message}</p>
            </div>
          }
        </div>
        <SheetFooter>
          {/* Add any footer content here */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSideBar;