'use client'
import {useState, useEffect, useContext} from "react"
import Link from "next/link"
import { logout } from "../api/auth";
import { GeneralContext, GeneralContextInitialProps } from "../../contextProviders/GeneralProvider";
import {useRouter} from 'next/navigation'
import { CartContext } from "../../contextProviders/cartcontext";
import { fetchCart } from "../utils";
import PWAInstallButton from "../PWADownloadButton";
import Cart from "../cart/cart";
import MenuButton from "./menuButton";
import { CookingPot, ShirtIcon } from "lucide-react";

const NavRightSide = () => {

  const {cart, setCart, totalItems, totalPrice, setTotalItems, setTotalPrice} =  useContext(CartContext)
  const {isLoggedIn, setIsLoggedIn, user, setUser}: GeneralContextInitialProps = useContext(GeneralContext)
  
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggedIn(false)
    const response = await logout(user?.email, user?.isCookieAccepted)
    console.log(response)
    const newCart = fetchCart()
    setCart(newCart)
    setTotalItems(0)
    setTotalPrice(0)
    setUser(null)
    router.push('/')
  }

  useEffect(()=>{

  }, [totalItems, totalPrice, cart])

  return (
    <div className=" flex gap-4">
    
    {/* Right side buttons */}
    <div className="hidden md:flex items-center gap-4 pr-12">
      {isLoggedIn && user ? (
        <>
        <Link
            href="/dashboard"
            className="whitespace-nowrap py-2 text-sm font-medium  hover:opacity-70"
          >
            Dashboard
          </Link>

        <button
          className="whitespace-nowrap ease-in-up shadow-btn hover:shadow-btn-hover rounded-md bg-green-600 hover:bg-green-700
          py-1 px-3 text-sm font-medium text-white transition duration-300 hover:bg-opacity-90
          md:py-1.5 md:px-4"
          onClick={handleLogout}
        >
          Logout
        </button>
        </>
      ) : (
        <>
          <Link
            href="/authpages/signin"
            className="whitespace-nowrap py-2 text-sm font-medium  hover:opacity-70"
          >
            Sign In
          </Link>

          <Link href="/authpages/signup"
            
              className="whitespace-nowrap ease-in-up shadow-btn hover:shadow-btn-hover rounded-md bg-green-600 hover:bg-green-700
              py-1 px-3 text-sm font-medium text-white transition duration-300 hover:bg-opacity-90
              md:py-1.5 md:px-4"
            >
              Sign Up
            
          </Link>
        </>
      )}
      </div>
      {/* pwa display */}
      <div className="flex justify-between items-center gap-10 ">

        {/* Shows only on mobile view */}
        <div className="md:hidden flex items-center justify-between gap-10  ">
          <a href={`/categorypage/${'fabrics & textiles'}`}><ShirtIcon /></a>
          <a href={`/categorypage/${'vegetable & spice'}`}><CookingPot /></a>
        </div>
        
        <div className="hidden md:flex"><PWAInstallButton /></div>
       {/* Cart - Always visible */}
              <div className="hidden md:flex"><Cart /></div>
           
        </div>

        
    </div>
  )
}

export default NavRightSide