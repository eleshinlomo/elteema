import { data } from "framer-motion/client";
import { StoreProps } from "./store";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export interface CreateFeedProps {
   userId: number;
   text: string;
   imageUrl: string;
   
}

export interface FeedProps {
   userId: number;
   feedId: number;
   postedBy: string;
   text: string;
   imageUrl: string;
   likes:0;
   comments: string[];
   images: string[];
   createdAt: Date;
   store: StoreProps;
   totalSales: number;
}




export const createFeed = async (formData: any, userId: number) => {

      for (const [key, value] of formData.entries()) {
      console.log('PAYLOAD DATA', key, value);
    }

  try {
    const response = await fetch(`${BASE_URL}/feed/createfeed`, {
      method: 'POST',
      mode: 'cors',
      body: formData,
      headers: {'userId': userId.toString()}
    
      // No headers - browser will set Content-Type automatically
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { ok: false, error: errorData.message || 'Failed to create feed' };
    }

    const data = await response.json();
    return { ok: true, ...data };
    
  } catch (error) {
    console.error('Error creating feed:', error);
    return { ok: false, error: 'Network error occurred' };
  }
};


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

export const updateFeed = async (feedId: number, updatedData: Partial<FeedProps>): Promise<FeedProps> => {
    const response = await fetch(`/api/feeds/${feedId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    });
    if (!response.ok) throw new Error('Failed to update feed');
    return response.json();
}

export const deleteFeed = async (feedId: number): Promise<void> => {
    const response = await fetch(`/api/feeds/${feedId}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete feed');
}