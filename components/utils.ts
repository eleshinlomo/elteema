import { summary } from "framer-motion/client"
import { ProductProps } from "./data/productsdata"
import { UserProps, getUser, saveUser } from "./data/userdata"

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

export const getProduct = (id: number, Products: ProductProps[])=>{
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

export const saveCart = (updatedCart: ProductProps[])=>{
    if(window !== null){
        const user: any = getUser()
        if(!user) {
            console.log('No user found')
            return [] // Cart must always return an array to prevent error
        }
        const updatedUserCart: UserProps = {...user, cart: updatedCart}
        saveUser(updatedUserCart)
        console.log('Cart saved')
    }
        return []
}

export const fetchCart = ()=>{
    if(window !== null){
        const user: any = getUser()
        if(!user) {
            console.log('No user found')
            return [] // Cart must always return an array to prevent error
        }
    
       return user.cart

    }
    return []
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


  
  

