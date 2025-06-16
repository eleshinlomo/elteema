'use client'
import React, {useState, useEffect, useContext} from 'react'
import { ProductProps } from '../api/product'
import Image from 'next/image'
import SkeletonPage from '../skeletonPage'
import DisplayStore from '../../app/(pages)/(allroutes)/dashboard/storepage/displayStore'
import { ProductContext } from '../../contextProviders/ProductContext'



const Trending = ()=>{
    
  
       // Hooks
       const {Products} = useContext(ProductContext)
       const [trendingItems, setTrendingItems] = useState<ProductProps | any>([])
       const [message, setMessage] = useState('Loading trending items...')

 useEffect(() => {
    const items = Array.isArray(Products) && Products.filter((item) => item.numOfItemsSold >= 0) // Products 
    setTrendingItems(items);
}, [Products?.[0]?.productName]);


    return (
      <div>
           <h2 className="text-3xl font-bold text-gray-800  text-center">Trending</h2>
            {trendingItems && trendingItems.length > 0 ? <DisplayStore productArray={Products} numPerPage={2} />
            : <SkeletonPage message={message} />
            }

    </div>
    )
}

export default Trending