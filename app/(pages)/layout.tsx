'use client'
 
import NavBar from "../../components/header/navbar"
import { useState, useEffect, useContext, Suspense} from "react"
import { usePathname } from "next/navigation"
import { CartProvider} from '../../contextProviders/cartcontext'
import Footer from "../../components/footer"
import { GeneralProvider } from "../../contextProviders/GeneralProvider"
import { GeneralContext } from "../../contextProviders/GeneralProvider"
import { useSearchParams } from "next/navigation"



interface PagesRoutesProps {
    children: React.ReactNode
}




const PagesLayout = ({children} : PagesRoutesProps)=>{
    const pathname = usePathname()
  

    

    
    

    return (
            <Suspense>
            <GeneralProvider>
            <CartProvider>
            <NavBar />
            {children}
            <Footer />
            </CartProvider>
            </GeneralProvider>
            </Suspense>
        
    )

}

export default PagesLayout