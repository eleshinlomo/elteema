import { CartProps } from "./cart";
import { ProductProps } from "./product";


export interface CreateStoreProps {
 userId: number;
 tagline: string;
 storeName: string;
 logo: string;
 phone: string,
 email: string;
 industry: string;
 city: string;
 state: string;
}

export interface StoreProps {
 userId: number;
 storeId: string;
 tagline: string;
 storeName: string;
 logo: string;
 phone: string,
 email: string;
 industry: string;
 city: string;
 state: string;
 items: []
}


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Create Store
export const createStore = async (payload : CreateStoreProps)=>{
     const response = await fetch(`${BASE_URL}/store/createstore`, {
        
         mode: 'cors',
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(payload)
     })

     if(!response){
        console.log('No response from the server')
     }

     const data = await response.json()
     return data
}


// Update Store
export const updateStore = async (payload : CreateStoreProps)=>{
     console.log('PAYLOAD', payload)
     const response = await fetch(`${BASE_URL}/store/updatestore`, {
        
         mode: 'cors',
         method: 'PUT',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(payload)
     })

     if(!response){
        console.log('No response from the server')
     }

     const data = await response.json()
     return data
}



export const changeOrderStatus = (cart: CartProps[], newStatus: string)=>{
    const updatedItems = cart.map((item)=>{
       const updatedItem = {
        ...item,
         orderStatus: newStatus,
         income: (item.price * item.quantity)
       }
       return updatedItem
    })
    return updatedItems // Array
}



export const updateStoreOrder = async (cart: CartProps[], buyerId: number, eta: string, newStatus: string)=>{
    if(cart?.length === 0) return 
        try{
    const items = changeOrderStatus(cart, newStatus)
    if(items?.length === 0) return 
    console.log('ITEMS TO ADD', items)
    const response = await fetch(`${BASE_URL}/store/updateorder`, {
       mode: 'cors',
       method: 'PUT',
       headers: {
        'Content-Type': 'application/json',

       },
       body: JSON.stringify({items, buyerId, eta})
    })
    if(!response) return 'No response from server'
    const data: any = await response.json()
    return data
    
}catch(err){
    console.log(err)
}
}


// Function gets single store
export const getStore = async (storeName: string)=>{

      const response = await fetch(`${BASE_URL}/store/getstore`, {
       mode: 'cors',
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',

       },
       body: JSON.stringify({storeName})
    })
    if(!response) return 'No response from server'
    
    const data = await response.json()
    return data

}
