'use client'
import React, { useState, useContext, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartBasket from './cartbasket';
import Cart from './cart';

const CartSideBar = () => {
 

 

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="">
          <CartBasket />  
        </div>
      </SheetTrigger>
      <SheetContent className="  bg-green-50 lg:max-w-screen-sm overflow-y-scroll max-h-screen z-[9999]">
       <Cart />
      </SheetContent>
      
    </Sheet>
  );
};

export default CartSideBar;