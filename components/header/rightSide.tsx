'use client'
import {useState, useEffect, useContext} from "react"
import CartSideBar from "../cart/cartSideBar"
import Link from "next/link"
import { Button } from "../ui/button";
import { getUser } from "../data/userdata";
import { logout } from "../auth";
import { GeneralContext, GeneralContextInitialProps } from "../../contextProviders/GeneralProvider";
import {useRouter} from 'next/navigation'




const NavRightSide = ()=>{

  const generalContext = useContext(GeneralContext)
  const {isLoggedIn, setIsLoggedIn, user}: GeneralContextInitialProps = generalContext
  
  const router = useRouter()
 
  useEffect(()=>{


}, [isLoggedIn])

const handleLogout = async ()=>{
  setIsLoggedIn(false)
  const response = await logout(user?.email)
  console.log(response)
  router.push('/authpages/signin')
}

    return (
        <div>
              <div className="md:flex items-center gap-5 justify-end pr-16 lg:pr-0">


{/* IsLogged in*/}
{ isLoggedIn && user ? 

<div className="flex gap-4 mt-5">
<a href={`/dashboard/` + user.type}><button className="mt-2">Dashboard</button></a>
<Button
  className="ease-in-up shadow-btn hover:shadow-btn-hover  rounded-sm bg-green-600 hover:bg-green-600
  px-3  text-base font-medium text-white transition duration-300 hover:bg-opacity-90 
  md:block md:px-9 lg:px-6 xl:px-9 rounded-2xl"
  onClick={handleLogout}
  >

  Sign Out
  </Button>
</div> :
<div className="md:flex md:gap-4">
<Link
  href="/authpages/signin"
  className=" px-7 my-3 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
>
  Sign In
</Link>

{/* Sign up */}

<Link
href="/authpages/signup">
<Button
className="ease-in-up mt-6 shadow-btn hover:shadow-btn-hover  rounded-sm bg-green-600 hover:bg-green-600
px-8  text-base font-medium text-white transition duration-300 hover:bg-opacity-90 
md:block md:px-9 lg:px-6 xl:px-9 rounded-2xl">
Sign Up
</Button>
</Link>



</div>
}
</div>
</div>
        
    )
}

export default NavRightSide