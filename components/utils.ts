import { summary } from "framer-motion/client"
import { ProductProps } from "./api/product"
import { getLocalUser, updateLocalUser } from "./data/userdata"
import { clotheCategoryWithSize, shoeCategoryWithSize } from "./data/categories"

const date = new Date()
export const year = date.getFullYear()

export const capitalize = (text: string)=>{
    if(text){
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
}

export const calculatePercentagePrice = (price: number, percentage: number)=>{
     return price * percentage / 100
}

// Turns 1000s to 1k and 1million to 1m
export function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return num?.toString();
}


export const formatCurrency = (symbol:string, amount: number)=>{
  const currency = new Intl.NumberFormat('en-US', {
    currency: symbol,
    style: 'currency'
  }).format(amount)
  return currency
}

export const totalPriceForCustomer = (cart: Array<{price: number, quantity: number}>): number => {
    return cart?.reduce((sum: number, item: {price: number, quantity: number}) => sum + (item.price * item.quantity), 0) || 0
 }

export const getSingleProduct = (id: number, Products: ProductProps[])=>{
   const product = Products.find((item)=>item.productId === id)
   if(product){
    return product
   }
   return 'Product not found'
}

// Add prices
export const addPrice = (cart: ProductProps[]): any => {
  return cart.reduce((total: any, product) => total + product.price, 0);
}

// Save Searched Items
export const saveSearchedProduct = (itemToSearch: string)=>{
    console.log('Searched item', itemToSearch)
}


export const fetchCart = ()=>{
    if(typeof window !== 'undefined'){
        const existingUser: any = getLocalUser()
        if(existingUser){
            return existingUser.cart 
        }
    }
    return []
}


  

export const updateCart = (newCart: ProductProps[])=>{
   const user = getLocalUser()
   if(user && user.isLoggedIn){
     const updatedUser = {...user, cart: newCart}
     updateLocalUser(updatedUser)
   }else{
    //  if a user is not logged in, we still allow them to shop using anonymous user
     const updatedUser: any = {...user, anonymous: true, cart: newCart}
     updateLocalUser(updatedUser)
     
   }
   
}

// Runs after cart has been updated
export const updateProductSize = (targetid: number, cart: ProductProps[], newSize: string)=>{
   if(!newSize || !targetid || !cart) {
    console.log('Missing values for: cart, targetId, and size')
    return
   }
   
   const itemIndex = cart.findIndex((item)=>item.productId === targetid)
   if(itemIndex !== -1){
    const updatedCart = [...cart, {...cart[itemIndex], size: newSize}]
    updateCart(updatedCart)
   }
    
    return 
}

export const searchSingleProduct = (item: string, originalItems: any[])=>{
    saveSearchedProduct(item)
    const ItemFound = originalItems.filter((product)=>product.name.toLowerCase().includes(item.toLowerCase()))
    return ItemFound
    
  
}

export const getItemQuantity = (targetid: number, Products: ProductProps[])=>{
   const product = Products.find((item)=> item.productId === targetid)
   return product ? product.quantity : 0
   
}




export const checkCategoryWithClothSize = (id: number, Products: ProductProps[]) => {
  let hasSize = false
  if (!id || !Products || Products.length === 0) return false;
  const product = Products.find((item)=>item.productId === id)
  if(product){
  hasSize = clotheCategoryWithSize.includes(product?.category)
  }
  
  return hasSize;
}

export const checkCategoryWithShoeSize = (id: number, Products: ProductProps[]) => {
   if (!id || !Products || Products.length === 0) return false;
   let hasSize = false;
  const product = Products.find((item)=>item.productId === id)
  if(product){

  hasSize = shoeCategoryWithSize.includes(product?.category.toLowerCase())
  }
  
  return hasSize;
}



  
  

