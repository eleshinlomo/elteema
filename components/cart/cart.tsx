'use client'
import HeaderAlert from "../header/headeralert"
import { SheetDescription } from "../ui/sheet"
import React, { useState, useContext, useEffect } from 'react';
import { Button } from '../ui/button';
import { CartContext } from '../../contextProviders/cartcontext';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartBasket from './cartbasket';
import Image from 'next/image';
import { ProductProps } from '../data/productsdata';
import { fetchCart } from '../utils';


const Cart = ()=>{

  const {
    cart,
    totalItems,
    setTotalItems,
    setTotalPrice,
    removeItem,
    totalPrice,
    isLoggedIn,
    handleQuantityIncrease,
    handleQuantityDecrease,
  } = useContext(CartContext);

  const [message, setMessage] = useState('You have nothing in your cart.');
  const [checkoutText, setCheckoutText] = useState<string | React.ReactNode>('CHECK OUT');
  const [savedCart, setSavedCart] = useState<ProductProps[]>([])

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
    <div>

<div>
      <span className=" absolute top-2 left-[10px] bg-red-500 text-white text-xs rounded-full py-3 px-4">
          {totalItems}  
        </span>
        <div>
       
          <div className="bg-black w-full p-4 rounded-t-lg">
            <HeaderAlert />
          </div>
          <div className='text-center mt-4'>
            <div className='flex flex-col justify-center items-center space-y-4'>
              <Button
                className="bg-green-700 hover:bg-green-800 text-white rounded-2xl px-8 py-2 transition-all duration-300"
                onClick={handleNoItem}
              >
                {checkoutText}
              </Button>
              <p className='text-green-600 flex font-extrabold text-lg'>
                <span>Subtotal</span>
                <span>({totalItems}):</span>
                <span className='pl-3'> N{totalPrice}</span>
              </p>
             
            </div>
          </div>
        </div>
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
                    <div className='flex flex-col'>
                    <span className='mt-1 text-md font-semibold'>Price: {item.price}</span>
                    <span className='mt-1 text-md font-semibold'>{item.name} ({item.quantity})</span>
                    </div>
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
                      className='bg-green-600 hover:bg-green-700 rounded-2xl text-white px-4 py-1 transition-all duration-300'
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
     
        </div>

    </div>
  )
}

export default Cart