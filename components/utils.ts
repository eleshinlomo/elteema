import { ProductProps } from "./product/data/products"
import { Products } from "./product/data/products"


export const addPrice = (products: ProductProps[])=>{
  const sum = products.reduce((total, product)=>total + product.price, 0)
  return sum
}

export const saveSearchedProduct = (itemToSearch: string)=>{
    console.log('Searched item', itemToSearch)
}

export const searchSingleProduct = (item: string)=>{
    saveSearchedProduct(item)
    const foundItem = Products.filter((product)=>product.name.toLowerCase().includes(item.toLowerCase()))
    return foundItem
}

