
import React, { createContext, useEffect, useState } from "react";
import { Products } from "../product/productdata/products";
import { ProductProps } from "../product/productdata/products";
import { addPrice} from "../utils";
import { fetchCart } from "../utils";
import { saveCart } from "../utils";








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
}, [cart, totalItems])


useEffect(()=>{
    const savedCart = fetchCart(cart)
    console.log('Saved Cart',savedCart)
    setTotalItems(savedCart && savedCart.length >= 0 ? savedCart.length : cart.length)
}, [cart])


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
        setTotalItems(totalItems - 1)
        
        setQuantity(newProduct.quantity = 1)
        setTotalPrice(Number((totalPrice + newProduct.price).toFixed(2)))
        saveCart(cart)
        
        }   
        
    }

    // Remove Item
    const removeItem = (targetid: number) => {
        // Find the product to remove
        const productToRemove = cart.find((item) => item.id === targetid);
        
        // If the product is found
        if (productToRemove) {
            // Calculate the new total price excluding the removed product
            const newTotalPrice = cart.reduce((total, product) => {
                if (product.id !== targetid) {
                    return total + product.price;
                }
                return total; // Don't add the removed item's price
            }, 0);
    
            // Update the state
            setCart(cart.filter((item) => item.id !== targetid)); // Remove item from cart
            setTotalPrice(parseFloat(newTotalPrice.toFixed(2))); // Set new total price
            setTotalItems(cart.length); // Update total items count
            setQuantity(productToRemove.quantity - 1)
            saveCart(cart)
            
        }
    };
    

   
    
    
  
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