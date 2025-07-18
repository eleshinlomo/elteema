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

const NavRightSide = () => {
  const cartContext = useContext(CartContext)
  const {cart, setCart, totalItems, totalPrice, setTotalItems, setTotalPrice} = cartContext
  const generalContext = useContext(GeneralContext)
  const {isLoggedIn, setIsLoggedIn, user, setUser}: GeneralContextInitialProps = generalContext
  
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
    <div className="hidden md:flex items-center gap-4">
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
      <div className="mt-6"><PWAInstallButton /></div>
       {/* Cart - Always visible */}
              <Cart />
    </div>
  )
}

export default NavRightSide