'use client'
 
import NavBar from "../../components/header/navbar"
import { useState, useEffect, useContext, Suspense} from "react"
import { usePathname } from "next/navigation"
import { CartProvider} from '../../contextProviders/cartcontext'
import Footer from "../../components/footer"
import { GeneralProvider } from "../../contextProviders/GeneralProvider"
import { useSearchParams } from "next/navigation"
import { ProductContextProvider } from "../../contextProviders/ProductContext"




interface PagesRoutesProps {
    children: React.ReactNode
}




const PagesLayout = ({children} : PagesRoutesProps)=>{
    const pathname = usePathname()
  

    

    
    

    return (
            <Suspense>
            <GeneralProvider>
            <ProductContextProvider>
            <CartProvider>
            <NavBar />
            {children}
            <Footer />
            </CartProvider>
            </ProductContextProvider>
            </GeneralProvider>
            </Suspense>
        
    )

}

export default PagesLayout