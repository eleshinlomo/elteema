
import React, { createContext, useState } from "react";
import { Products } from "../product/productdata/products";
import { ProductProps } from "../product/productdata/products";
import { addPrice} from "../utils";







interface CartContextProps {
    children: React.ReactNode
}

interface CartProps {
    cart: ProductProps[]
}

const defaultValues = {
        
    handleQuantityIncrease: (targetid: number)=>{},
    handleQuantityDecrease: (targetid: number)=>{},
    addToCart: (targetid: number)=>{},
    cartButtonText: '',
    removeItem: (targetid: number)=>{},
    totalItems: 0
}


export const CartContext = createContext(defaultValues)


export const CartProvider = ({children} : CartContextProps)=>{
    
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [cart, setCart] = useState<any[]>([])
    const [totalItems, setTotalItems] = useState<number>(0)
    const [cartButtonText, setCartButtonText] = useState('ADD TO CART')
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [quantity, setQuantity] = useState<number>(0)
  


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
        
        setQuantity(newProduct.quantity = 1)
        setTotalPrice(Number((totalPrice + newProduct.price).toFixed(2)))
        
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
            setTotalItems(totalItems - 1); // Update total items count
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