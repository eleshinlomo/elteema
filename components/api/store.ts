import { CartProps } from "./cart";
import { ProductProps } from "./product";


export interface CreateStoreProps {
 userId: number;
 tagline: string;
 storeName: string;
 logo: string;
 phone: string,
 email: string;
}

export interface StoreProps {
 userId: number;
 storeId: string;
 tagline: string;
 storeName: string;
 logo: string;
 phone: string,
 email: string;
}


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


const changeOrderStatus = (cart: CartProps[])=>{
    const updatedItems = cart.map((item)=>{
       const updatedItem = {
        ...item,
         orderStatus: 'processing',
         income: (item.price * item.quantity)
       }
       return updatedItem
    })
    return updatedItems // Array
}



export const updateStoreOrder = async (cart: CartProps[], buyerId: number, eta: string)=>{
    if(cart?.length === 0) return 
        try{
    const items = changeOrderStatus(cart)
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
