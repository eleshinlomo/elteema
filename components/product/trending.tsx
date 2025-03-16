'use client'
import React, {useState, useEffect} from 'react'
import AddToCartButton from "../cart/addtocartbtn"
import { Products, ProductProps } from "./productsdata"
import Image from 'next/image'
import { searchSingleProduct } from '../utils'
import ContactSeller from './productdetails'
import ProductDetails from './productdetails'
import AllProductDisplay from './allProductDisplay'



const Trending = ()=>{
    
    const [trendingItems, setTrendingItems] = useState<ProductProps[]>([])
    const [itemToSearch, setItemToSearch ] = useState('')
    const originalItems = Products.filter((item)=>item.category === 'trending')
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
       setItemToSearch(e.target.value)
    }


    const getTrendingItems  = ()=>{
        
        const filteredItems = searchSingleProduct(itemToSearch, originalItems)
        setTrendingItems(filteredItems)
       
     }

     useEffect(()=>{
        getTrendingItems()
     }, [itemToSearch])

     useEffect(()=>{
        setTrendingItems(originalItems)
     },[])

     


    return (
      <div>
            <p className='text-center py-4 font-extrabold uppercase'>Trending</p>
            <AllProductDisplay productArray={trendingItems} />

  </div>
    )
}

export default Trending