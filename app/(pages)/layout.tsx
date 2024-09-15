'use client'
import NavBar from "@/components/header/navbar"
import { useState, useEffect, useContext} from "react"
import { usePathname } from "next/navigation"
import HeaderAlert from "@/components/header/headeralert"
import { CartProvider, CartContext } from "@/components/contextproviders/cartcontext"
import Footer from "@/components/footer"



interface AllRoutesProps {
    children: React.ReactNode
}




const AllroutesLayout = ({children} : AllRoutesProps)=>{
    const pathname = usePathname()
    const [isHome, setIsHome] = useState(pathname === '/' ? true : false)
    const [isHeaderAlert, setIsHeaderAlert] = useState(true)
    

//   useEffect(()=>{
//     if(window.scrollY >= 10)
//     setIsHeaderAlert(false)
//   },[])




    


    return (
            <CartProvider>
            <div>
            {isHeaderAlert ? <HeaderAlert />: null}
            <NavBar isHome={isHome}   />
            {children}
            <Footer />
            </div>
            </CartProvider>
        
    )

}

export default AllroutesLayout