
'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductProps } from "../components/api/product";
import {  fetchCart, updateCart, updateProductSize } from "../components/utils";
import { GeneralContext } from "./GeneralProvider";
import { ProductContext } from "./ProductContext";

interface ContextProps {
  children: React.ReactNode,
}

// export interface CartProps extends ProductProps {
//     size: string;
// }

interface ContextDefaultProps {
    
    cart: ProductProps[];
    setCart: (value: ProductProps[])=>void;
    handleQuantityIncrease: (targetId: number) => void;
    handleQuantityDecrease: (targetId: number) => void;
    addToCart: (targetId: number, cart: ProductProps[], size: string) => void;
    removeItem: (targetId: number) => void;
    totalItems: number;
    setTotalItems: (value: number)=>void;
    totalPrice: number;
    setTotalPrice: (value: number)=>void;
    quantity: number;
    
}

const defaultValues: ContextDefaultProps = {
    cart: [],
    handleQuantityIncrease: () => {},
    handleQuantityDecrease: () => {},
    setTotalItems: ()=>{},
    setTotalPrice: ()=>{},
    setCart: ()=>{},
    addToCart: () => {},
    removeItem: () => {},
    totalItems: 0,
    totalPrice: 0,
    quantity: 0,

};

export const CartContext = createContext<ContextDefaultProps>(defaultValues);

export const CartProvider = ({ children }: ContextProps) => {

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [cart, setCart] = useState<ProductProps[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isAdded, setIsAdded] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(0);
    // Contexts
    const {Products} = useContext(ProductContext)
    const generalContext: any = useContext(GeneralContext)
    

     // This we use to set saved Cart values and also update whenever new item is added to the cart
      const handleFetchCart = ()=>{
        const existingCart: ProductProps[] = fetchCart()
        if(existingCart && existingCart.length > 0){
        setCart(existingCart)
        console.log('CART', cart)
        setTotalItems(existingCart?.reduce((sum, item)=> sum + item?.quantity, 0))
        setTotalPrice(existingCart?.reduce((sum, item)=> sum + item?.price * item?.quantity, 0))
        }
        
      }
      useEffect(()=>{
        handleFetchCart()
      }, [])


    const handleQuantityIncrease = (targetId: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.productId === targetId ? { ...item, quantity: item?.quantity + 1 } : item
            );
            updateCart(updatedCart);
            const updatedTotalItems = updatedCart.reduce((sum, item) => sum + item?.quantity, 0);
            const updatedTotalPrice = Number(updatedCart.reduce((sum, item) => sum + item?.price * item?.quantity, 0).toFixed(2));
            
            setTotalItems(updatedTotalItems);
            setTotalPrice(updatedTotalPrice);
            
            
            return updatedCart;
        });
    };

    const handleQuantityDecrease = (targetId: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.productId === targetId ? { ...item, quantity: item?.quantity - 1 } : item
            ).filter(item => item.quantity > 0); // Remove items with quantity <= 0
            updateCart(updatedCart);

            const totalItems = updatedCart.reduce((sum, item) => sum + item?.quantity, 0);
            const totalPrice = Number(updatedCart.reduce((sum, item) => sum + item.price * item?.quantity, 0).toFixed(2));
            
            setTotalItems(totalItems);
            setTotalPrice(totalPrice);
            
            
            return updatedCart;
        });
    };

   
    const addToCart = (targetId: number, cart: ProductProps[], size: string) => {
    const isProductExists = cart.find((product) => product.productId === targetId);
    
    if (isProductExists) {
        return; // No need to return cart since you're using state updates
    }

    const productToAdd = Products.find(product => product.productId === targetId);
    
    if (productToAdd) {
        setCart(prevCart => {
            const updatedCart = [...prevCart, { 
                ...productToAdd, 
                quantity: 1, 
                isAdded: true,
                size: size 
            }];
            
            updateCart(updatedCart);
            
            // Calculate totals
            const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = Number(updatedCart.reduce(
                (sum, item) => sum + item.price * item.quantity, 0
            ).toFixed(2));
            
            setTotalItems(totalItems);
            setTotalPrice(totalPrice);
            
            return updatedCart;
        });
    }
};


    const removeItem = (targetId: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.productId !== targetId);
            updateCart(updatedCart);
            const totalPrice = updatedCart.reduce((total, item) => total + item.price * item?.quantity, 0);
            const totalItems = updatedCart.reduce((sum, item) => sum + item?.quantity, 0);
            
            setTotalPrice(totalPrice);
            setTotalItems(totalItems);
           
            return updatedCart;
        });
    };

    const value: ContextDefaultProps = {
        cart,
        setCart,
        totalItems,
        setTotalItems,
        addToCart,
        removeItem,
        totalPrice,
        quantity,
        handleQuantityIncrease,
        handleQuantityDecrease,
        setTotalPrice,
    
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};