import { StoreProps } from "./store";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// For sellers
export interface CreateProductProps {
    userId: number | any;
    addedBy: string;
    productName: string;
    imageFiles: File[];
    imageUrls: string[];
    price: number; // Needed to keep this as string to prevent 0 getting appended to new price in the form
    colors: string[];
    condition: string;
    deliveryMethod: string;
    quantity: number;
    category: string;
    description: string;
    unitCost: number;
     shoeSizes: string[];
    clotheSizes: string[];
          
}

// For sellers
export interface UpdateProductProps {
    productId: string | any;
    userId: string | any;
    addedBy: string;
    productName: string;
    imageFiles: File[];
    imageUrls: string[];
    price: number; // Needed to keep this as string to prevent 0 getting appended to new price in the form
    colors: string[];
    condition: string;
    deliveryMethod: string;
    quantity: number;
     shoeSizes: string[];
    clotheSizes: string[];
    category: string;
    description: string;
    unitCost: number;
          
}

// For buyers
export interface ProductProps {
    userId: number;
    _id: string;
    addedBy: string;
    eta: string;
    src: string;
    productName: string;
    price: number;
    colors: string[]; 
    condition: string;
    deliveryMethod: string;
    imageFiles: File[];
    imageUrls: string[]; // Image array received from server
    quantity: number;
    shoeSizes: string[];
    clotheSizes: string[];
    category: string;
    description: string;
    store: StoreProps;
    storeId: string; 
    storeAddress: string; 
    storeName: string; 
    storeCity: string; 
    storeState: string; 
    storePhone: number;     
    star: number;
    totalVotes: number;
    totalSales: number;
    numOfItemsSold: number;
    isAdded: boolean;
    orderStatus: string;
    productPageVisits: 256
    unitCost: number;
    createdAt: any;
}




export const createProduct = async (formData: FormData, userId: string) => {
  try {
 

    const response = await fetch(`${BASE_URL}/product/createproduct`, {
      method: 'POST',
      body: formData, 
      headers: {
        'userId': userId // Auth header
      }
    });

    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();

  } catch (err) {
    console.error('Product creation error:', err);
    throw err;
  }
};





// export const createProduct = async (formData: FormData, userId: number)=>{
  
//     try{
//         const response = await fetch(`${BASE_URL}/product/createproduct`, {
//           method: 'POST',
//           body: formData,
//           headers: {
//             'userId': userId?.toString() //Used for the middleware on backend
//           }
//         })

//         if(!response){
//             return 'No response from server'
//         }
    
//         const data = await response.json()
//         return data
//     }catch(err){
//        console.log(err)
//        return err
//     }
// }


// Update Product
export const updateProduct = async (formData: any, userId: string)=>{

     try{
        const response = await fetch(`${BASE_URL}/product/updateproduct`, {
          method: 'PUT',
          body: formData,
          headers: {
            'userId': userId //Used for the middleware on backend
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
export const deleteProduct = async (userId: string, productId: string)=>{
    
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