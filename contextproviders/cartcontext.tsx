import React, { createContext, useEffect, useState } from "react";
import { Products } from "../components/data/productsdata";
import { ProductProps } from "../components/data/productsdata";
import { addPrice, fetchCart, saveCart } from "../components/utils";

interface CartContextProps {
    children: React.ReactNode;
}

interface CartContextValue {
    cart: ProductProps[];
    isLoggedIn: boolean;
    handleQuantityIncrease: (targetId: number) => void;
    handleQuantityDecrease: (targetId: number) => void;
    addToCart: (targetId: number) => void;
    removeItem: (targetId: number) => void;
    totalItems: number;
    setTotalItems: (value: number)=>void;
    totalPrice: number;
    setTotalPrice: (value: number)=>void;
    quantity: number;
}

const defaultValues: CartContextValue = {
    cart: [],
    isLoggedIn: false,
    handleQuantityIncrease: () => {},
    handleQuantityDecrease: () => {},
    setTotalItems: ()=>{},
    setTotalPrice: ()=>{},
    addToCart: () => {},
    removeItem: () => {},
    totalItems: 0,
    totalPrice: 0,
    quantity: 0,
};

export const CartContext = createContext<CartContextValue>(defaultValues);

export const CartProvider: React.FC<CartContextProps> = ({ children }) => {

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [cart, setCart] = useState<ProductProps[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isAdded, setIsAdded] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(0);

     // This we use to set saved Cart values and also update whenever new item is added to the cart
      const getCart = ()=>{
        const updatedCart: ProductProps[] = fetchCart()
        setCart(updatedCart)
        setTotalItems(updatedCart.reduce((sum, item)=> sum + item.quantity, 0))
        setTotalPrice(updatedCart.reduce((sum, item)=> sum + item.price * item.quantity, 0))
      
      }
    
      useEffect(()=>{
        getCart()
      }, [isAdded, totalItems, totalPrice, quantity])



    const handleQuantityIncrease = (targetId: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item
            );
            saveCart(updatedCart);
            const updatedTotalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
            const updatedTotalPrice = Number(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
            
            setTotalItems(updatedTotalItems);
            setTotalPrice(updatedTotalPrice);
            
            
            return updatedCart;
        });
    };

    const handleQuantityDecrease = (targetId: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.id === targetId ? { ...item, quantity: item.quantity - 1 } : item
            ).filter(item => item.quantity > 0); // Remove items with quantity <= 0
            saveCart(updatedCart);

            const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = Number(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
            
            setTotalItems(totalItems);
            setTotalPrice(totalPrice);
            
            
            return updatedCart;
        });
    };

    const addToCart = (targetId: number) => {
        // Check if the product already exists in the cart
        const isProductExists = cart.find(product => product.id === targetId);
    
        if (isProductExists) {
            // If the product already exists, do nothing
            return;
        }
    
        // Find the product in the Products array
        const productToAdd = Products.find(product => product.id === targetId);
    
        if (productToAdd) {
            setCart(prevCart => {
                // Add the new product to the cart with a default quantity of 1
                const updatedCart = [...prevCart, { ...productToAdd, quantity: 1, isAdded: true }];
                saveCart(updatedCart);
    
                // Update total items and total price
                const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
                const totalPrice = Number(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
    
                setTotalItems(totalItems);
                setTotalPrice(totalPrice);
                
    
                return updatedCart;
            });
        }
    };
    const removeItem = (targetId: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id !== targetId);
            saveCart(updatedCart);
            const totalPrice = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0);
            const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
            
            setTotalPrice(totalPrice);
            setTotalItems(totalItems);
           
            return updatedCart;
        });
    };

    const value: CartContextValue = {
        cart,
        totalItems,
        setTotalItems,
        addToCart,
        removeItem,
        totalPrice,
        isLoggedIn,
        quantity,
        handleQuantityIncrease,
        handleQuantityDecrease,
        setTotalPrice
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};