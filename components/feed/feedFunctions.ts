import { ProductProps } from "../data/productsdata";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface StoreProps {
   name: string;
   logo: string;
   items: []
}

export interface FeedProps {
   userId: number;
   feedId: number;
   username: string;
   text: string;
   imageUrl: string;
   likes:0;
   comments: string[];
   store: StoreProps
}

export const createFeed = async (userId: number, text: string, imageUrl: string)=>{
    const payload = {
            userId,
            text,
            imageUrl,
        }
     const response = await fetch(`${BASE_URL}/feed/createfeed`, {
        
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


export const getFeeds = async ()=>{
    try{
     const response = await fetch(`${BASE_URL}/feed/getfeeds`, {
        
         mode: 'cors',
         headers: {'Content-Type': 'application/json'},
     })

     if(!response){
        console.log('No response from the server')
     }

     const data = await response.json()
     return data
   }catch(err){
      console.log(err)
   }
}