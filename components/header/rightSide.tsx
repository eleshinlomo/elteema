'use client'
import {useState, useEffect, useContext} from "react"
import Link from "next/link"
import { logout } from "../auth";
import { GeneralContext, GeneralContextInitialProps } from "../../contextProviders/GeneralProvider";
import {useRouter} from 'next/navigation'
import Cart from "../cart/cart";




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
              <div className="md:flex items-center gap-5 justify-end pr-16 lg:pr-0 ">


{/* IsLogged in*/}
{ isLoggedIn && user ? 

<div className="flex flex-col md:flex-row md:mt-4  gap-4 ">
<a href={`/dashboard/` + user.type}><button className="mt-2">Dashboard</button></a>
<button
  className="md:mt-3 ease-in-up shadow-btn hover:shadow-btn-hover  rounded-2xl bg-green-600 hover:bg-green-600
  px-6 py-1  text-base font-medium text-white transition duration-300 hover:bg-opacity-90 
   md:px-9 lg:px-6 xl:px-9 rounded-2xl"
  onClick={handleLogout}
  >

  Sign Out
  </button>
</div> :
<div className="flex flex-col md:flex-row md:mt-3  gap-4">
<Link
  href="/authpages/signin"
  className="  py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
>
  Sign In
</Link>

{/* Sign up */}

<Link
href="/authpages/signup">
<button
className="md:mt-3 ease-in-up shadow-btn hover:shadow-btn-hover  rounded-2xl bg-green-600 hover:bg-green-600
  px-6 py-1  text-base font-medium text-white transition duration-300 hover:bg-opacity-90 
   md:px-9 lg:px-6 xl:px-9 rounded-2xl">
Sign Up
</button>
</Link>



</div>
}

</div>


</div>
        
    )
}

export default NavRightSide