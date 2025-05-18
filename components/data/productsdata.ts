



export interface ProductProps {
    id: number;
    name: string;
    price: number;
    src: any;
    quantity: number;
    star: number;
    totalVotes: number;
    numOfItemsSold: number;
    isAdded: boolean;
    size: string;
    orderStatus: string[];
    category: string[];
    description: string;
    stock: number;
    productPageVisits: number;
}


const BASE_URL  = process.env.NEXT_PUBLIC_BASE_URL

export const getProductData = async ()=>{

    try{
    const response = await fetch(`${BASE_URL}/products/allproducts`, {
       mode: 'cors'
    })
    if(!response) return
    const data: any = await response.json()
    
    if(data.ok) {
        return data
    }
    console.log('Unable to fetch')
    return
}catch(err){
    console.log(err)
}
    
}


