import { summary } from "framer-motion/client"
import { ProductProps } from "./api/product"
import { UserProps } from "./api/users"

const date = new Date()
export const year = date.getFullYear()

export const capitalize = (text: string)=>{
    if(text){
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
}

export const calculatePercentagePrice = (price: number, percentage: number)=>{
     return price * percentage / 100
}

// Turns 1000s to 1k and 1million to 1m
export function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return num?.toString();
}


// Needs amount and symbol and it will format price toFixed
export const formatCurrency = (symbol:string, amount: number)=>{
  const currency = new Intl.NumberFormat('en-US', {
    currency: symbol,
    style: 'currency'
  }).format(amount)
  return currency
}

export const fetchCart = ()=>{
    if(typeof window !== 'undefined'){
        const existingUser: any = getLocalUser()
        if(existingUser){
            return existingUser.cart 
        }
    }
    return []
}


// Calculate ETA
export const calculateETA = (buyer: UserProps, product: any, locationData: any) => {
 
  const buyerCity = buyer?.city || locationData?.city
  const buyerState = buyer?.state || locationData?.state
  const buyerCountry = buyer?.country || locationData?.country


  let daysToAdd = 0;

  if (buyerCity === product?.storeCity) {
    daysToAdd = 2;
  } else if (buyerState === product?.storeState) {
    daysToAdd = 3;
  } else if (buyerCountry !== 'Nigeria') {
    daysToAdd = 30; // approx. 1 month
  } else {
    daysToAdd = 5;
  }

  // Calculate the ETA date
  const etaDate = new Date();
  etaDate.setDate(etaDate.getDate() + daysToAdd);

  // Function to add ordinal suffix to day
  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const day = etaDate.getDate();
  const suffix = getDaySuffix(day);
  const month = etaDate.toLocaleString('default', { month: 'long' });

  // Return in format: (X days), Month DaySuffix
  return `${month} ${day}${suffix} (in ${daysToAdd} days)`;
};



export const totalPriceForCustomer = (cart: Array<{price: number, quantity: number}>): number => {
    return cart?.reduce((sum: number, item: {price: number, quantity: number}) => sum + (item.price * item.quantity), 0) || 0
 }

export const getSingleProduct = (id: string, Products: ProductProps[])=>{
   const product = Products.find((item)=>item._id === id)
   if(product){
    return product
   }
   return 'Product not found'
}

// Add prices
export const addPrice = (cart: ProductProps[]): any => {
  return cart.reduce((total: any, product) => total + product.price, 0);
}

// Save Searched Items
export const saveSearchedProduct = (itemToSearch: string)=>{
    console.log('Searched item', itemToSearch)
}


export const getLocalUser = (): any | null => {
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('ptlgUser');
    if (userString) {
      return JSON.parse(userString);
    }
  }
  return null;
};



// Must setUser(updatedUser) everytime updateUser fucntion runs
export const updateLocalUser = (updatedUser: UserProps)=>{
    if(!updatedUser) return null
    if(typeof window  !== 'undefined'){
       localStorage.setItem('ptlgUser', JSON.stringify(updatedUser)) 
    }
    return null
}



  

export const updateLocalCart = (newCart: ProductProps[])=>{
   const localUser = getLocalUser()
   if(localUser && localUser.isLoggedIn){
     const updatedUser = {...localUser, cart: newCart}
     updateLocalUser(updatedUser)
   }else if(localUser?.isCookieAccepted || localUser.isCookieAccepted === false){
    
    //  if a user is not logged in, we still allow them to shop using anonymous user
     const updatedUser: any = {...localUser, cart: newCart}
     updateLocalUser(updatedUser)
    
   }else{
    //  if a user is not logged in, we still allow them to shop using anonymous user
     const updatedUser: any = {anonymous: true, cart: newCart}
     updateLocalUser(updatedUser)
     
   }
   
}



export const searchSingleProduct = (item: string, originalItems: any[])=>{
    saveSearchedProduct(item)
    const ItemFound = originalItems.filter((product)=>product.name.toLowerCase().includes(item.toLowerCase()))
    return ItemFound
    
  
}

export const getItemQuantity = (targetid: string, Products: ProductProps[])=>{
   const product = Products.find((item)=> item._id === targetid)
   return product ? product.quantity : 0
   
}







  
  

