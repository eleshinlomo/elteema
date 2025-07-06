import { StoreProps } from "./store";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// For sellers
export interface CreateProductProps {
    userId: number | any;
    addedBy: string;
    productName: string;
    imageFiles: File[];
    price: number; // Needed to keep this as string to prevent 0 getting appended to new price in the form
    colors: string[];
    condition: string;
    deliveryMethod: string;
    quantity: number;
    sizes: string[];
    category: string;
    description: string;
          
}

// For sellers
export interface UpdateProductProps {
    productId: number;
    userId: number | any;
    addedBy: string;
    productName: string;
    imageFiles: File[];
    price: number; // Needed to keep this as string to prevent 0 getting appended to new price in the form
    colors: string[];
    condition: string;
    deliveryMethod: string;
    quantity: number;
    sizes: string[];
    category: string;
    description: string;
          
}

// For buyers
export interface ProductProps {
    userId: number;
    productId: number;
    addedBy: string;
    eta: string;
    src: string;
    productName: string;
    price: number;
    colors: string[]; 
    condition: string;
    deliveryMethod: string;
    images: string[]; // Image array received from server
    quantity: number;
    sizes: string[];
    category: string;
    description: string;
    store: StoreProps;  
    storeName: string; 
    storeCity: string; 
    storeState: string; 
    storePhone: number;     
    star: number;
    totalVotes: number;
    totalSales: number;
    numOfItemsSold: number;
    isAdded: boolean;
    orderStatus: string[];
    productPageVisits: 256
}



export const createProduct = async (formData: any, userId: number)=>{
    try{
        const response = await fetch(`${BASE_URL}/product/createproduct`, {
          method: 'POST',
          body: formData,
          headers: {
            'userId': userId.toString() //Used for the middleware on backend
          }
        })

        if(!response){
            return 'No response from server'
        }
    
        const data = await response.json()
        return data
    }catch(err){
       console.log(err)
       return err
    }
}


// Update Product
export const updateProduct = async (formData: any, userId: number)=>{

     try{
        const response = await fetch(`${BASE_URL}/product/updateproduct`, {
          method: 'PUT',
          body: formData,
          headers: {
            'userId': userId.toString() //Used for the middleware on backend
          }
        })

        if(!response){
            return 'No response from server'
        }
    
        const data = await response.json()
        return data
    }catch(err){
       console.log(err)
       return err
    }

}



// All products
export const getAllProducts = async ()=>{

    try{
    const response = await fetch(`${BASE_URL}/product/allproducts`, {
       mode: 'cors'
    })
    if(!response) return
    const data: any = await response.json()
    return data
}catch(err){
    console.log(err)
}
    
}

//Delete products
export const deleteProduct = async (userId: number, productId: number)=>{
    
    try{
    const response = await fetch(`${BASE_URL}/product/deleteproduct`, {
       mode: 'cors',
       method: 'DELETE',
       headers: {
        'Content-Type': 'application/json',
        'userId': userId.toString()

       },
       body: JSON.stringify({userId, productId})
    })
    if(!response) return 'No response from server'
    const data: any = await response.json()
    return data
    
}catch(err){
    console.log(err)
}
    
}