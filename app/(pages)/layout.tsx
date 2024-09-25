'use client'
import NavBar from "@/components/header/navbar"
import { useState, useEffect, useContext} from "react"
import { usePathname } from "next/navigation"
import HeaderAlert from "@/components/header/headeralert"
import { CartProvider, CartContext } from "@/components/contextproviders/cartcontext"
import Footer from "@/components/footer"
import { PagesContext, PagesProvider } from "@/components/contextproviders/pagescontext"



interface AllRoutesProps {
    children: React.ReactNode
}




const AllroutesLayout = ({children} : AllRoutesProps)=>{
    const pathname = usePathname()
    const [isHome, setIsHome] = useState(pathname === '/' ? true : false)
    const [isHeaderAlert, setIsHeaderAlert] = useState(true)
    const pagesContext = useContext(PagesContext)
    const {isLoggedIn} = pagesContext
    console.log('isLoggedin Layout', isLoggedIn)
    

//   useEffect(()=>{
//     if(window.scrollY >= 10)
//     setIsHeaderAlert(false)
//   },[])




    


    return (
            <PagesProvider>
            <CartProvider>
            <div>
            {isHeaderAlert ? <HeaderAlert />: null}
            <NavBar isLoggedIn={isLoggedIn}  />
            {children}
            <Footer />
            </div>
            </CartProvider>
            </PagesProvider>
        
    )

}

export default AllroutesLayout