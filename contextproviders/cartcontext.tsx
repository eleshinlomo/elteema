import React, { createContext, useEffect, useState } from "react";
import { Products } from "../components/product/productsdata";
import { ProductProps } from "../components/product/productsdata";
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
    totalPrice: number;
    quantity: number;
}

const defaultValues: CartContextValue = {
    cart: [],
    isLoggedIn: false,
    handleQuantityIncrease: () => {},
    handleQuantityDecrease: () => {},
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

    // useEffect(() => {
    //     saveCart(cart);
    //     const newCart = fetchCart();
    //     setCart(newCart);
    // }, [quantity, totalItems]);

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

    const addToCart = (targetId: number) => {
        const newProduct = Products.find(item => item.id === targetId);

        if (!newProduct) return;

        const productExistInCart = cart.find(product => product.id === targetId);

        if (productExistInCart) return;

        setCart(prevCart => {
          const updatedCart =  [...prevCart, {...newProduct, isAdded: true}]
          return updatedCart  
        });

        setTotalItems(totalItems + 1);
        setTotalPrice(Number((totalPrice + newProduct.price).toFixed(2)));
    };

    const removeItem = (targetId: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id !== targetId);
            const totalPrice = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0);
            const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
            
            setTotalPrice(totalPrice);
            setTotalItems(totalItems);
            saveCart(updatedCart);
            return updatedCart;
        });
    };

    const value: CartContextValue = {
        cart,
        totalItems,
        addToCart,
        removeItem,
        totalPrice,
        isLoggedIn,
        quantity,
        handleQuantityIncrease,
        handleQuantityDecrease,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};