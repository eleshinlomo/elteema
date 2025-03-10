'use client'
import React, {useState, useEffect, useContext} from 'react'
import { Button } from "@/components/ui/button"
import { CartContext } from '@/components/contextproviders/cartcontext'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingBasketIcon } from "lucide-react"
import Link from "next/link"
import { Products } from '@/components/product/productsdata'
import { ProductProps } from '@/components/product/productsdata'
import CartBasket from './cartbasket'
import Image from 'next/image'
import HeaderAlert from '@/components/header/headeralert'






const Cart = ()=> {

 const {totalItems, 
  cart, removeItem, 
  totalPrice, isLoggedIn, 
  handleQuantityIncrease, 
  handleQuantityDecrease
} = useContext(CartContext)

 const [message, setMessage] = useState('You have nothing in your cart.')
 const [checkoutText, setCheckoutText] = useState<string | React.ReactNode>('CHECK OUT')

 const notLoggedInMessage = (<div>Please <a href='/authpages/signin' className='text-green-500 font-extrabold'>Sign in</a> to checkout</div>)
 
 
const handleNoItem = ()=>{
  if(totalItems === 0){
    setMessage('You cannot checkout 0 item.')
    return
  }

  if(!isLoggedIn){
    setCheckoutText(notLoggedInMessage)
    return
  }
}


 

  return (

    <Sheet>
      <SheetTrigger asChild>
      <button><CartBasket /></button>
      </SheetTrigger>
      <SheetContent className="bg-green-100 lg:max-w-screen-sm overflow-y-scroll max-h-screen z-[9999]">
        <SheetHeader className='mt-16'>
          <SheetTitle className="bg-black w-full"><div className="mt-10">
             <HeaderAlert />
            </div>
          </SheetTitle>
          <SheetDescription className='text-center'>
            <div className='flex flex-col justify-center items-center'>
            <Button  className="bg-green-700 hover:bg-green-700 text-white rounded-2xl " onClick={handleNoItem}>{checkoutText}</Button>
            <p className='text-green-600'>Total Price:<span className='font-extrabold text-lg'> ${totalPrice}</span></p>
            {cart.length <= 1 ?
            <h2>There is <span className='text-green-800 font-extrabold text-lg'>{totalItems}</span> item in your cart.</h2>:
            <h2>There are <span className='text-green-800 font-extrabold text-lg'>{totalItems}</span> items in your cart.</h2>
            }
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-center items-center ">
         {cart.length > 0 ? 
         <div>
          {cart.map((item: ProductProps)=>
          <div className='text-center my-4' key={item.id}>
         
          <p>{item.name}<span>({item.quantity})</span></p>

          <div className='flex '>
          <Button size='icon' className='text-3xl font-extrabold' onClick={()=>handleQuantityIncrease(item.id)} >+</Button>
          <button className='bg-green-600 hover:bg-green-600 rounded-2xl text-white px-2 h-8' 
          onClick={()=>removeItem(item.id)}>Remove item</button>
          <Button size='icon' className='text-3xl font-extrabold' onClick={()=>handleQuantityDecrease(item.id)}>-</Button>
          </div>

          </div>
          )}
         </div>:
         <div className='text-center'>
          <p className='font-extrabold text-red-500'>{message}</p>
          
         </div>

         }
        </div>
        <SheetFooter>
         
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Cart
