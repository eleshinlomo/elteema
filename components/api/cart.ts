
import { updateLocalCart } from "../utils";
import { ProductProps } from "./product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL



export const updateCart = async (userId: string, updatedCart: ProductProps[]) => {
    
    const payload = {userId, updatedCart}
   try{
    // We need to update the database with the new cart
    const response = await fetch(`${BASE_URL}/users/updatecart`, {
        method: 'PUT',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(!response) return ' Server error. Unable to add cart'
    const data = await response.json()
    if(data.ok){
        console.log(data.message)
    }else{
        console.log(data.error)
    }
    
}catch(err){
    console.log('Add to cart Error', err)
}
    
};
