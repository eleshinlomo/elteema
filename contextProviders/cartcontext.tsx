
'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { getProductData} from "../components/data/productsdata";
import { ProductProps } from "../components/data/productsdata";
import {  fetchCart, saveCart } from "../components/utils";
import { GeneralContext } from "./GeneralProvider";


interface CartProps {
    children: React.ReactNode;
}

interface CartContextProps {
    cart: ProductProps[];
    handleQuantityIncrease: (targetId: number) => void;
    handleQuantityDecrease: (targetId: number) => void;
    addToCart: (targetId: number) => void;
    removeItem: (targetId: number) => void;
    totalItems: number;
    setTotalItems: (value: number)=>void;
    totalPrice: number;
    setTotalPrice: (value: number)=>void;
    quantity: number;
    Products: ProductProps[];
}

const defaultValues: CartContextProps = {
    cart: [],
    handleQuantityIncrease: () => {},
    handleQuantityDecrease: () => {},
    setTotalItems: ()=>{},
    setTotalPrice: ()=>{},
    addToCart: () => {},
    removeItem: () => {},
    totalItems: 0,
    totalPrice: 0,
    quantity: 0,
    Products: []
};

export const CartContext = createContext<CartContextProps>(defaultValues);

export const CartProvider: React.FC<CartProps> = ({ children }) => {

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [cart, setCart] = useState<ProductProps[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isAdded, setIsAdded] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(0);
    const [Products, setProducts] = useState<ProductProps[]>([])
    const generalContext: any = useContext(GeneralContext)
    const {user, setUser} = generalContext

     // This we use to set saved Cart values and also update whenever new item is added to the cart
      const getCart = ()=>{
        const updatedCart: ProductProps[] = fetchCart()
        if(updatedCart){
        setCart(updatedCart)
        setTotalItems(updatedCart?.reduce((sum, item)=> sum + item.quantity, 0))
        setTotalPrice(updatedCart?.reduce((sum, item)=> sum + item.price * item.quantity, 0))
        }
        
      }
      useEffect(()=>{
        getCart()
      }, [isAdded, totalItems, totalPrice, quantity])


      const handleGetProducts = async()=>{
        const products = await getProductData()
        if(products){
            console.log('Product', products.products)
            setProducts(products.products)
        }
      }

      useEffect(()=>{
       handleGetProducts()
      }, [])



    const handleQuantityIncrease = (targetId: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item
            );
            saveCart(updatedCart, user);
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
            saveCart(updatedCart, user);

            const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = Number(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
            
            setTotalItems(totalItems);
            setTotalPrice(totalPrice);
            
            
            return updatedCart;
        });
    };

    const addToCart = (targetId: number) => {
        // Check if the product already exists in the cart
        const isProductExists = cart?.find(product => product.id === targetId);
    
        if (isProductExists) {
            // If the product already exists, do nothing
            return cart;
        }
    
        // Find the product in the Products array
        const productToAdd = Products?.find(product => product.id === targetId);
    
        if (productToAdd) {
            setCart(prevCart => {
                // Add the new product to the cart with a default quantity of 1
                const updatedCart = [...prevCart, { ...productToAdd, quantity: 1, isAdded: true }];
                saveCart(updatedCart, user);
    
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
            saveCart(updatedCart, user);
            const totalPrice = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0);
            const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
            
            setTotalPrice(totalPrice);
            setTotalItems(totalItems);
           
            return updatedCart;
        });
    };

    const value: CartContextProps = {
        cart,
        totalItems,
        setTotalItems,
        addToCart,
        removeItem,
        totalPrice,
        quantity,
        handleQuantityIncrease,
        handleQuantityDecrease,
        setTotalPrice,
        Products
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};