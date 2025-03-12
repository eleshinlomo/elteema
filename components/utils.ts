import { ProductProps } from "./product/productsdata"
import { Products } from "./product/productsdata"



export const getProduct = (id: number)=>{
   const product = Products.find((item)=>item.id === id)
   if(product){
    return product
   }
   return 'Product not found'
}

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

export const saveCart = (cart: ProductProps[])=>{
    if(window !== null){
        localStorage.setItem('cart', JSON.stringify(cart))
        console.log('Cart saved')
        }

        return 
    
}

export const fetchCart = (cart: ProductProps[])=>{
    if(window !== null){
    const savedCart = localStorage.getItem('cart')
    if(savedCart){
        return JSON.parse(savedCart)
    }

    return cart

    }
}

export const searchSingleProduct = (item: string, originalItems: any[])=>{
    saveSearchedProduct(item)
    const ItemFound = originalItems.filter((product)=>product.name.toLowerCase().includes(item.toLowerCase()))
    return ItemFound
    
  
}

export const getItemQuantity = (targetid: number)=>{
   const product = Products.find((item)=> item.id === targetid)
   return product ? product.quantity : 0
   
}


  
  

