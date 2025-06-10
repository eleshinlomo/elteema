


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export interface ProductProps {
    userId: number;
    addedBy: string;
    productName: string;
    price: number;
    condition: string;
    deliveryMethod: string;
    images: string[];
    quantity: number;
    size: string;
    category: string[];
    description: string;
    store: null
}

  
export const createProduct = async (product: ProductProps)=>{


 try{
  const response = await fetch(`${BASE_URL}/product/createproduct`, {
   mode: 'cors',
   method: 'POST',
   headers: {"Content-Type": "application/json"},
   body: JSON.stringify(product)
  })

  if(!response) return 'No response from server'
   const data = await response.json()
   return data
}catch(err){
    console.error(err)
    return err
}
}