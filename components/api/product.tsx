


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL



export interface ProductProps {
    userId: number;
    productId: number;
    addedBy: string;
    src: string;
    productName: string;
    price: number;
    colors: string[];
    condition: string;
    deliveryMethod: string;
    imageFiles: File[]; //Image array sent to the server
    images: string[]; // Image array received from server
    quantity: number;
    size: string;
    category: string;
    description: string;
    store: null;         
    star: number;
    totalVotes: number;
    numOfItemsSold: number;
    isAdded: boolean;
    orderStatus: string[];
    productPageVisits: 256
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