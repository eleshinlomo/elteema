import { CreateStoreProps, StoreProps } from "../../../../../components/api/store"





const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createStore = async (payload : CreateStoreProps)=>{
     console.log('PAYLOAD', payload)
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