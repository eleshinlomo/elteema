import { summary } from "framer-motion/client"
import { ProductProps } from "./data/productsdata"
import { UserProps, getLocalUser, saveUser } from "./data/userdata"
import ProductCategory from "./product/productCategory"
import { CartProps } from "../contextProviders/cartcontext"

const date = new Date()
export const year = date.getFullYear()

export const capitalize = (text: string)=>{
    if(text){
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
}

export const totalPriceForCustomer = (cart: Array<{price: number, quantity: number}>): number => {
    return cart?.reduce((sum: number, item: {price: number, quantity: number}) => sum + (item.price * item.quantity), 0) || 0
 }

export const getSingleProduct = (id: number, Products: ProductProps[])=>{
   const product = Products.find((item)=>item.id === id)
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
        const userString: any = localStorage.getItem('ptlgUser')
        if(userString){
            let user = JSON.parse(userString)
            
            return user.cart 
        }

    }
    return []
}


  

export const updateCart = (newCart: CartProps[])=>{
   const user = getLocalUser()
   if(user && user.isLoggedIn){
     const updatedUser = {...user, cart: newCart}
     saveUser(updatedUser)
   }else{
     const anonymousUser = {anonymous: true, cart: []}
     const updatedUser: any = {...anonymousUser, cart: newCart}
     saveUser(updatedUser)
     
   }
   
}

// Runs after cart has been updated
export const updateProductSize = (targetid: number, cart: ProductProps[], newSize: string)=>{
   if(!newSize || !targetid || !cart) {
    console.log('Missing values for: cart, targetId, and size')
    return
   }
   
   const itemIndex = cart.findIndex((item)=>item.id === targetid)
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
   const product = Products.find((item)=> item.id === targetid)
   return product ? product.quantity : 0
   
}

export const formatCurrency = (symbol:string, amount: number)=>{
  const currency = new Intl.NumberFormat('en-US', {
    currency: symbol,
    style: 'currency'
  }).format(amount)
  return currency
}


  
  

