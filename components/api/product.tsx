


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export interface CreateProductProps {
    userId: number;
    addedBy: string;
    productName: string;
    price: number;
    colors: string[];
    condition: string;
    deliveryMethod: string;
    imageFiles: any[];
    quantity: number;
    size: string;
    categories: string[];
    description: string;
    store: null;         
}

export interface ProductProps {
    userId: number;
    productId: number;
    addedBy: string;
    productName: string;
    price: number;
    colors: string[];
    condition: string;
    deliveryMethod: string;
    imageFiles: any[];
    quantity: number;
    size: string;
    categories: string[];
    description: string;
    store: null;         
    star: number;
    totalVotes: number;
    numOfItemsSold: number;
    isAdded: boolean;
    orderStatus: string[];
    productPageVisits: 256
}


// Create products
export const createProduct = async (product: CreateProductProps)=>{


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

// All products
export const getAllProducts = async ()=>{

    try{
    const response = await fetch(`${BASE_URL}/products/allproducts`, {
       mode: 'cors'
    })
    if(!response) return
    const data: any = await response.json()
    
    if(data.ok) {
        console.log(data)
        return data.products
    }
    console.log('Unable to fetch')
    return
}catch(err){
    console.log(err)
}
    
}