'use client'
import {useState, useEffect, useContext} from 'react'
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
import { Products } from '@/components/product/data/products'
import { ProductProps } from '@/components/product/data/products'
import CartBasket from './cartbasket'
import Image from 'next/image'




const Cart = ()=> {

 const {totalItems, cart, removeItem, totalPrice, isLoggedIn} = useContext(CartContext)
 const [message, setMessage] = useState('You have nothing in your cart.')
 const [checkoutText, setCheckoutText] = useState<string>('CHECK OUT')
 
const handleNoItem = ()=>{
  if(totalItems === 0){
    setMessage('You cannot checkout 0 item.')
    return
  }

  if(!isLoggedIn){
    setCheckoutText('Please Sign in to checkout')
    return
  }
}
 

  return (

    <Sheet >
      <SheetTrigger asChild>
      <button><CartBasket /></button>
      </SheetTrigger>
      <SheetContent className="bg-white ">
        <SheetHeader className='mt-16'>
          <SheetTitle className="bg-black"><div className="mt-10 w-full text-white text-center  font-extrabold">
             <h3><span className="text-green-400">FREE DELIVERY</span> in Lagos for all orders above N30,000 or more. T&Cs Apply</h3>
            </div>
          </SheetTitle>
          <SheetDescription className='text-center'>
            <div>
            <Button  className="bg-black hover:bg-black text-white w-full" onClick={handleNoItem}>{checkoutText}</Button>
            <p>Total Price: ${totalPrice}</p>
            {cart.length <= 1 ?
            <h2>There is <span className='text-green-800 font-extrabold text-lg'>{totalItems}</span> item in your cart.</h2>:
            <h2>There are <span className='text-green-800 font-extrabold text-lg'>{totalItems}</span> items in your cart.</h2>
            }
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center overflow-y-scroll">
         {cart.length > 0 ? 
         <div>
          {cart.map((item: ProductProps)=>
          <div className='text-center my-4' key={item.id}>
         
          <p>{item.name}</p>

          <div className='flex '>
          <Button size='icon' className='text-3xl font-extrabold'>+</Button>
          <button className='bg-green-600 hover:bg-green-600 rounded-2xl text-white px-2 h-8' 
          onClick={()=>removeItem(item.id)}>Remove item</button>
          <Button size='icon' className='text-3xl font-extrabold'>-</Button>
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
