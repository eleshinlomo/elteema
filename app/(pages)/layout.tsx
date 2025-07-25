'use client'
 

import { useState, useEffect, useContext, Suspense} from "react"
import { usePathname } from "next/navigation"
import { CartProvider} from '../../contextProviders/cartcontext'
import { GeneralProvider } from "../../contextProviders/GeneralProvider"
import { useSearchParams } from "next/navigation"
import { ProductContextProvider } from "../../contextProviders/ProductContext"
import GoogleAnalytics from "../../components/google/googleAnalytics"




interface PagesRoutesProps {
    children: React.ReactNode
}




const PagesLayout = ({children} : PagesRoutesProps)=>{
    const pathname = usePathname()
  

    

    
    

    return (
            <Suspense fallback='loading...'>
            <GoogleAnalytics />
            <GeneralProvider>
            <ProductContextProvider>
            <CartProvider>
            {children}
            </CartProvider>
            </ProductContextProvider>
            </GeneralProvider>
            </Suspense>
        
    )

}

export default PagesLayout