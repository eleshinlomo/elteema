
import React, { createContext, useState } from "react";
import { Products } from "../product/data/products";
import { ProductProps } from "../product/data/products";
import { addPrice, decreaseItemQuantity, getItemQuantity, increaseItemQuantity } from "../utils";







interface CartContextProps {
    children: React.ReactNode
}

interface CartProps {
    cart: ProductProps[]
}

const defaultValues = {
        
        cart: [],
        handleQuantityIncrease: (targetid: number)=>{},
        handleQuantityDecrease: (targetid: number)=>{},
        totalItems: 0,
        addToCart: (targetid: number)=>{},
        cartButtonText: '',
        removeItem: (targetid: number)=>{},
        totalPrice: 0,
        isLoggedIn: false,
        quantity: 0,
       
        

}


export const CartContext = createContext(defaultValues)


export const CartProvider = ({children} : CartContextProps)=>{
    
    const [cart, setCart] = useState<any | null>([])
    const [totalItems, setTotalItems] = useState<number>(0)
    const [cartButtonText, setCartButtonText] = useState('ADD TO CART')
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [quantity, setQuantity] = useState<number | any>(0)
  


  const handleQuantityIncrease = (targetid: number)=>{

    setQuantity(increaseItemQuantity(targetid, cart))
    setTotalPrice(addPrice(cart))
  }

  const handleQuantityDecrease = (targetid: number)=>{
    const updatedCart = decreaseItemQuantity(targetid, cart)
    setQuantity(updatedCart)
    setTotalPrice(addPrice(cart))
  }
    
//    Add new item to cart
    const addToCart = (targetid: number)=>{
        const newProduct: any = Products.find((product)=>product.id === targetid)
        if(newProduct){
        const productExists = cart?.find((product: any)=>product.id === newProduct.id)

        if(productExists){
            return cart
        }
        setCart((prevItems: any)=>[...prevItems, newProduct])
        setTotalItems(totalItems + 1)
        const quantity = getItemQuantity(targetid)
        setQuantity(quantity + 1)
        const price = addPrice(cart) 
        setTotalPrice((price))
        
        }   
        
    }

    // Remove Item
    const removeItem = (targetid: number)=>{
        const index = cart.findIndex((item: any)=>item.id === targetid)
        console.log(index)
        
        setCart(cart[index].quantity = 0)
        cart[index].price = 0
        const price = addPrice(cart) 
        setTotalPrice(price)
        setCart(cart.filter((item: any)=>item.id !== cart[index].id))
        setTotalItems(totalItems - 1)
    }


   
    
    
  
    const value = {
        cart,
        totalItems,
        addToCart,
        cartButtonText,
        removeItem,
        totalPrice,
        isLoggedIn,
        quantity,
        handleQuantityIncrease,
        handleQuantityDecrease
        
    }

 return (
    <CartContext.Provider value={value}>
     {children}
    </CartContext.Provider>
 )
}