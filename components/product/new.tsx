'use client'
import React, {useState, useEffect} from 'react'
import AddToCartButton from "../cart/addtocartbtn"
import { Products, ProductProps } from "./productsdata"
import Image from 'next/image'
import { searchSingleProduct } from '../utils'
import ContactSeller from './productdetails'
import { SkeletonPage } from '../skeletonPage'
import ProductDetails from './productdetails'
import AllProductDisplay from './allProductDisplay'



const New = ()=>{
    
    const [newItems, setNewItems] = useState<ProductProps[]>([])
    const [itemToSearch, setItemToSearch ] = useState('')
    const originalItems = Products.filter((item)=>item.new === true)
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
       setItemToSearch(e.target.value)
    }


    const getTrendingItems  = ()=>{
        
        const filteredItems = searchSingleProduct(itemToSearch, originalItems)
        setNewItems(filteredItems)
       
     }

     useEffect(()=>{
        getTrendingItems()
     }, [itemToSearch])

     useEffect(()=>{
        setNewItems(originalItems)
     },[])

     


    return (
      <div id='new'>
            <p className='text-center py-4 font-extrabold uppercase'>New</p>
      <div >
    
       
                <AllProductDisplay productArray={newItems} />
    
  </div>

  </div>
    )
}

export default New