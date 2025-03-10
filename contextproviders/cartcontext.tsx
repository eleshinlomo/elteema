
import React, { createContext, useEffect, useState } from "react";
import { Products } from "@/components/product/productsdata";
import { ProductProps } from "@/components/product/productsdata";
import { addPrice } from "@/components/utils";
import { fetchCart } from "@/components/utils";
import { saveCart } from "@/components/utils";








interface CartContextProps {
    children: React.ReactNode
}

interface CartProps {
    cart: ProductProps[]
}



const defaultValues = {
    cart:Products,
    isLoggedIn: false,
    handleQuantityIncrease: (targetid: number)=>{},
    handleQuantityDecrease: (targetid: number)=>{},
    addToCart: (targetid: number)=>{},
    cartButtonText: '',
    removeItem: (targetid: number)=>{},
    totalItems: 0,
    totalPrice: 0,
    quantity: 0
}


export const CartContext = createContext(defaultValues)


export const CartProvider = ({children} : CartContextProps)=>{
    
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [cart, setCart] = useState<any[]>([])
    const [totalItems, setTotalItems] = useState<number>(0)
    const [cartButtonText, setCartButtonText] = useState('ADD TO CART')
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [quantity, setQuantity] = useState<number>(0)
  

useEffect(()=>{
    saveCart(cart)
    const newCart = fetchCart(cart)
    setCart(newCart)
}, [quantity, totalItems])


useEffect(()=>{
    const savedCart = fetchCart(cart)
    console.log('Saved Cart',savedCart)
    setTotalItems(savedCart && savedCart.length >= 0 ? savedCart.length : cart.length)
    setCart(savedCart)
}, [quantity, totalItems])


  const handleQuantityIncrease = (targetid: number)=>{
    const product = cart.find((item)=>item.id === targetid)
    if(product)
    setQuantity(product.quantity += 1)
    setTotalPrice(Number((addPrice(cart) * product.quantity).toFixed(2)))
    
  }

  const handleQuantityDecrease = (targetid: number)=>{
    const product = cart.find((item)=>item.id === targetid)
    if(product)
    if(product.quantity === 1)return 1
    setQuantity(product.quantity -= 1)
    setTotalPrice(Number((addPrice(cart) * product.quantity).toFixed(2)))
    saveCart(cart)
  }
    
//    Add new item to cart
    const addToCart = (targetid: number)=>{
        const newProduct: any = Products.find((product)=>product.id === targetid)
        if(newProduct){
        const productExists = cart.find((product: any)=>product.id === newProduct.id)

        if(productExists){
            return cart
        }
        setCart((prevItems: any)=>[...prevItems, newProduct])
        setTotalItems(totalItems + 1)
        
       
        setTotalPrice(Number((totalPrice + newProduct.price).toFixed(2)))
        saveCart(cart)
        
        }   
        
    }

    const removeItem = (targetid: number) => {
        const updatedCart = cart.filter(item => item.id !== targetid);
        const newTotalPrice = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0);

        setCart(updatedCart);
        setTotalPrice(newTotalPrice);
        setTotalItems(updatedCart.length);
        saveCart(updatedCart)
    };

    // // Remove Item
    // const removeItem = (targetid: number) => {
    //     // Find the product to remove
    //     const productToRemove = cart.find((item) => item.id === targetid);
        
    //     // If the product is found
    //     if (productToRemove) {
    //         // Calculate the new total price excluding the removed product
    //         const newTotalPrice = cart.reduce((total, product) => {
    //             if (product.id !== targetid) {
    //                 return total + product.price;
    //             }
    //             return total; // Don't add the removed item's price
    //         }, 0);
    
    //         // Remove the item from the cart
    //         const updatedCart = cart.filter((item) => item.id !== targetid);
    //         // Save updated cart to localStorage
    //         saveCart(updatedCart);
            
    //         // Update the state
    //         setCart(updatedCart); // Set new cart
    //         setTotalPrice(parseFloat(newTotalPrice.toFixed(2))); // Set new total price
    //         setQuantity(productToRemove.quantity - 1)
            
    //         // Update total items count based on the new cart length
    //         setTotalItems(updatedCart.length); 
    
            
    //     }
    // };
    
    

   
    
    
  
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