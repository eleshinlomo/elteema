'use client'
import React, {useState, useEffect, useContext} from 'react'
import AddToCartButton from "../cart/addtocartbtn"
import { ProductProps } from "../data/productsdata"
import Image from 'next/image'
import { searchSingleProduct } from '../utils'
import ContactSeller from './productdetails'
import ProductDetails from './productdetails'
import AllProductDisplay from './allProductDisplay'
import { CartContext } from '../../contextProviders/cartcontext'



const Trending = ()=>{
    
   const [trendingItems, setTrendingItems] = useState<ProductProps | any>([])
    const cartContext = useContext(CartContext)
    const {Products} = cartContext

    useEffect(()=>{
    if(Products && Products.length > 0){
      const items: any = Products.filter((item)=>item.category === 'trending')
      setTrendingItems(items)
    }
    }, [Products])

   


    return (
      <div>
            <p className='text-center py-4 font-extrabold uppercase'>Trending</p>
            <AllProductDisplay productArray={trendingItems} />

  </div>
    )
}

export default Trending