


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
    totalSales: number;
    numOfItemsSold: number;
    isAdded: boolean;
    orderStatus: string[];
    productPageVisits: 256
}




// All products
export const getAllProducts = async ()=>{

    try{
    const response = await fetch(`${BASE_URL}/store/allstores`, {
       mode: 'cors'
    })
    if(!response) return
    const data: any = await response.json()
    
    if(data.ok) {
        console.log(data)
        return data
    }
    console.log('Unable to fetch')
    return
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