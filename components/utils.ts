import { ProductProps } from "./product/productdata/products"
import { Products } from "./product/productdata/products"


// Add prices
export const addPrice = (cart: ProductProps[]): any => {
  return cart.reduce((total: any, curr) => {
      const price = Number(curr.price); // Ensure price is a number
       return total + price || 0; // Add to total, default to 0 if NaN
  }, 0);
}

// Save Searched Items
export const saveSearchedProduct = (itemToSearch: string)=>{
    console.log('Searched item', itemToSearch)
}

export const searchSingleProduct = (item: string, originalItems: ProductProps[])=>{
    saveSearchedProduct(item)
    const ItemFound = originalItems.filter((product)=>product.name.toLowerCase().includes(item.toLowerCase()))
    return ItemFound
    
  
}

export const getItemQuantity = (targetid: number)=>{
   const product = Products.find((item)=> item.id === targetid)
   return product ? product.quantity : 0
   
}


  
  

