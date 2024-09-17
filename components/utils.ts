import { ProductProps } from "./product/data/products"
import { Products } from "./product/data/products"


export const addPrice = (cart: ProductProps[]): number => {
  // Implement your logic to calculate price
  return cart.reduce((total, item) => {
    const product = Products.find(p => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
};

export const saveSearchedProduct = (itemToSearch: string)=>{
    console.log('Searched item', itemToSearch)
}

export const searchSingleProduct = (item: string)=>{
    saveSearchedProduct(item)
    const foundItem = Products.filter((product)=>product.name.toLowerCase().includes(item.toLowerCase()))
    return foundItem
}

export const getItemQuantity = (targetid: number)=>{
   const product = Products.find((item)=> item.id === targetid)
   return product ? product.quantity : 0
   
}

export const increaseItemQuantity = (targetid: number, cart: any[])=>{
  const index = cart.findIndex((item)=>item.id === targetid)
  if (index === -1) return cart
  const modifiedCart = [...cart]
  return modifiedCart[index].quantity += 1
  
}

export const decreaseItemQuantity = (targetid: number, cart: any[])=>{
  const index = cart.findIndex((item)=>item.id === targetid)
  if (index === -1) return cart
  const modifiedCart = [...cart]
  if (modifiedCart[index].quantity === 0){
    return modifiedCart.splice(index)
  }else{
    return modifiedCart[index].quantity -= 1 
  }
  
  
}
