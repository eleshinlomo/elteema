
'use client'
import React, { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import { ProductProps } from "../components/api/product";
import {  fetchCart, updateLocalCart, updateProductSize } from "../components/utils";
import { GeneralContext } from "./GeneralProvider";
import { ProductContext } from "./ProductContext";
import { updateCart } from "../components/api/cart";
import { getLocalUser } from "../components/utils";

interface ContextProps {
  children: React.ReactNode,
}

// export interface CartProps extends ProductProps {
//     size: string;
// }

interface ContextDefaultProps {
    
    cart: ProductProps[];
    setCart: (value: ProductProps[])=>void;
    handleQuantityIncrease: (targetId: string) => void;
    handleQuantityDecrease: (targetId: string) => void;
    addToCart: (targetId: string, size: string) => void;
    removeItem: (targetId: string) => void;
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
    const {user} = useContext(GeneralContext)
    
    

     // This we use to set saved Cart values and also update whenever new item is added to the cart
      const handleFetchCart = ()=>{
            
            const localUser = getLocalUser()
            const localCart = localUser?.cart

            if(user && user.cart?.length > 0){
                setCart(user.cart)
                 
         setTotalItems(user?.cart?.reduce((sum: any, item: any)=> sum + item?.quantity, 0))
        setTotalPrice(user?.cart?.reduce((sum: any, item: any)=> sum + item?.price * item?.quantity, 0))
            }else{
               
                if(localCart?.length > 0) {
                    setCart(localCart)
                    setTotalItems(localCart?.reduce((sum: any, item: any)=> sum + item?.quantity, 0))
                    setTotalPrice(localCart?.reduce((sum: any, item: any)=> sum + item?.price * item?.quantity, 0))
                }else{
              
                    setCart([])
                    setTotalItems(cart?.reduce((sum: any, item: any)=> sum + item?.quantity, 0))
                    setTotalPrice(cart?.reduce((sum: any, item: any)=> sum + item?.price * item?.quantity, 0))
                }
            
            }
            

      }
      useEffect(()=>{
        handleFetchCart()
      }, [])


    const handleQuantityIncrease = async (targetId: string) => {
        
            const updatedCart = cart.map(item =>
                item._id === targetId ? { ...item, quantity: item?.quantity + 1 } : item
            );
            updateLocalCart(updatedCart);
            const updatedTotalItems = updatedCart.reduce((sum, item) => sum + item?.quantity, 0);
            const updatedTotalPrice = Number(updatedCart.reduce((sum, item) => sum + item?.price * item?.quantity, 0).toFixed(2));
            
            setTotalItems(updatedTotalItems);
            setTotalPrice(updatedTotalPrice);
            setCart(updatedCart)

             //  We update the database with updated cart
            if(user && user._id) {
            await updateCart(user._id, updatedCart)
     }
            
         
    };

    const handleQuantityDecrease = async (targetId: string) => {
        
            const updatedCart = cart.map(item =>
                item._id === targetId ? { ...item, quantity: item?.quantity - 1 } : item
            ).filter(item => item.quantity > 0); // Remove items with quantity <= 0
            updateLocalCart(updatedCart);

            const totalItems = updatedCart.reduce((sum, item) => sum + item?.quantity, 0);
            const totalPrice = Number(updatedCart.reduce((sum, item) => sum + item.price * item?.quantity, 0).toFixed(2));
            
            setTotalItems(totalItems);
            setTotalPrice(totalPrice);
            
            setCart(updatedCart)

             //  We update the database with updated cart
     if(user && user._id) {
        await updateCart(user._id, updatedCart)
     }
            
       
    };

   
    const addToCart = async (targetId: string, size: string) => {
    const productExists = cart?.length > 0 && cart.find((product) => product._id === targetId);
    
    if (productExists) {
        return; // No need to return cart since we're using state updates
    }

    const productToAdd = Products.find(product => product._id === targetId); 
    if(!productToAdd) return

            const updatedCart = [...cart, { 
                ...productToAdd, 
                quantity: 1, 
                isAdded: true,
                size: size 
            }];
            
           
            
            // Calculate totals
            const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = Number(updatedCart.reduce(
                (sum, item) => sum + item.price * item.quantity, 0
            ).toFixed(2));
            
            setTotalItems(totalItems);
            setTotalPrice(totalPrice);
            
    setCart(updatedCart)
     updateLocalCart(updatedCart);
     
    //  We update the database with updated cart
     if(user && user._id) {
        await updateCart(user._id, updatedCart)
     }
};


    const removeItem = async (targetId: string) => {
    
            const updatedCart = cart.filter(item => item._id !== targetId);
            updateLocalCart(updatedCart);
            const totalPrice = updatedCart.reduce((total, item) => total + item.price * item?.quantity, 0);
            const totalItems = updatedCart.reduce((sum, item) => sum + item?.quantity, 0);
            
            setTotalPrice(totalPrice);
            setTotalItems(totalItems);
         
            setCart(updatedCart)
           

            //  We update the database with new cart
            if(user && user._id) {
            await updateCart(user._id, updatedCart)
         }
           
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