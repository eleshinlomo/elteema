'use client'
import React, {useState, useEffect, useContext} from 'react'
import AddToCartButton from "../cart/addtocartbtn"
import { ProductProps } from "../data/productsdata"
import Image from 'next/image'
import { searchSingleProduct } from '../utils'
import ContactSeller from './productdetails'
import ProductDetails from './productdetails'
import AllProductDisplay from './ProductsDisplay'
import { CartContext } from '../../contextProviders/cartcontext'
import SkeletonPage from '../skeletonPage'



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

   const message = "Loading trending items..."


    return (
      <div>
           <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Trending</h2>
            {trendingItems && trendingItems.length > 0 ? <AllProductDisplay productArray={trendingItems} />
            : <SkeletonPage message={message} />}

  </div>
    )
}

export default Trending