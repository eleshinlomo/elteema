
import React, { createContext, useState } from "react";
import { Products } from "../product/data/products";
import { ProductProps } from "../product/data/products";
import { addPrice } from "../utils";






interface CartContextProps {
    children: React.ReactNode
}

const defaultValues = {
        
        cart: [],
        totalItems: 0,
        addToCart: (targetid: number)=>{},
        cartButtonText: '',
        removeItem: (targetid: number)=>{},
        totalPrice: 0,
        isLoggedIn: false

}


export const CartContext = createContext(defaultValues)


export const CartProvider = ({children} : CartContextProps)=>{
    
    const [cart, setCart] = useState<any>([])
    const [totalItems, setTotalItems] = useState<number>(0)
    const [cartButtonText, setCartButtonText] = useState('ADD TO CART')
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    const handleTotalPrice =()=>{
        const price = addPrice(cart)
        setTotalPrice(price)
    }

    const addToCart = (targetid: number)=>{
        const newProduct = Products.find((product)=>product.id === targetid)
        if(newProduct){
        const productExists = cart.find((product: any)=>product.id === newProduct.id)

        if(productExists){
            return cart
        }
        setCart((prevItems: any)=>[...prevItems, newProduct])
        setTotalItems(totalItems + 1)
        const price = addPrice(cart) 
        setTotalPrice(Math.floor(price))
        }       
    }

    const removeItem = (targetid: number)=>{
        if(cart.length == 0) return cart
        setCart(cart.filter((item: any)=>item.id !== targetid))
        setTotalItems(totalItems - 1)
        const price = addPrice(cart) 
        setTotalPrice(price)

    }

   
    
    
  
    const value = {
        cart,
        totalItems,
        addToCart,
        cartButtonText,
        removeItem,
        totalPrice,
        isLoggedIn
        
    }

 return (
    <CartContext.Provider value={value}>
     {children}
    </CartContext.Provider>
 )
}