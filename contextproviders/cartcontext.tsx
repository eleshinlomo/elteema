
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





const handleQuantityIncrease = (targetId: number) => {
    setCart(prevCart => {
        const updatedCart = prevCart.map(item =>
            item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item
        );
        const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = Number(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
        
        setTotalItems(totalItems);
        setTotalPrice(totalPrice);
        saveCart(updatedCart);
        
        return updatedCart;
    });
};

const handleQuantityDecrease = (targetId: number) => {
    setCart(prevCart => {
        const updatedCart = prevCart.map(item =>
            item.id === targetId ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0); // Remove items with quantity <= 0

        const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = Number(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
        
        setTotalItems(totalItems);
        setTotalPrice(totalPrice);
        saveCart(updatedCart);
        
        return updatedCart;
    });
};
    
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
        const newQuantity = updatedCart.length
        const newTotalPrice = updatedCart.reduce((total, item) => total + item.price * newQuantity, 0);

        setCart(updatedCart);
        setTotalPrice(newTotalPrice);
        setTotalItems(newQuantity);
        saveCart(updatedCart)
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