

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface StoreProps {
   name: string;
   logo: string;
   items: []
}

export interface FeedProps {
   userId: number;
   feedId: number;
   postedBy: string;
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