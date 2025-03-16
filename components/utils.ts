import { ProductProps } from "./data/productsdata"
import { Products } from "./data/productsdata"
import { UserProps, user, saveUser } from "./data/userdata"



export const getProduct = (id: number)=>{
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
        const updatedUserCart: UserProps = {...user, cart: updatedCart}
        saveUser(updatedUserCart)
        console.log('Cart saved')
        
    }
        return 
}

export const fetchCart = ()=>{
    if(window !== null){
    const userString = localStorage.getItem('user')
    if(userString){
        const userData = JSON.parse(userString)
        const savedCart = userData.cart
        return savedCart
    }
    
    return []

    }
}

export const searchSingleProduct = (item: string, originalItems: any[])=>{
    saveSearchedProduct(item)
    const ItemFound = originalItems.filter((product)=>product.name.toLowerCase().includes(item.toLowerCase()))
    return ItemFound
    
  
}

export const getItemQuantity = (targetid: number)=>{
   const product = Products.find((item)=> item.id === targetid)
   return product ? product.quantity : 0
   
}


  
  

