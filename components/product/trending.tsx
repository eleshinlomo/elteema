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

 useEffect(() => {
  if (Products?.length > 0) {
    const items = Products.filter((item) => 
      (Array.isArray(item.categories) ? item.categories : []).includes('trending')
    );
    setTrendingItems(items);
  }
}, [Products?.length]);

   const message = "Loading trending items..."


    return (
      <div>
           <h2 className="text-3xl font-bold text-gray-800  text-center">Trending</h2>
            {trendingItems && trendingItems.length > 0 ? <DisplayStore productArray={Products} numPerPage={2} />
            : <SkeletonPage message={message} />}

  </div>
    )
}

export default Trending