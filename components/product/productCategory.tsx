'use client'
import React, {useState, useEffect, useContext} from 'react'
import { ProductProps } from '../api/product'
import Image from 'next/image'
import AllProductDisplay from './ProductsDisplay'
import { CartContext } from '../../contextProviders/cartcontext'
import SkeletonPage from '../skeletonPage'
import { capitalize } from '../utils'
import CategoryNotFound from './productCatNotFound'
import DisplayStore from '../../app/(pages)/(allroutes)/dashboard/storepage/displayStore'

interface CateroryProps{
    category: string;
}

const ProductCategory = ({category}: CateroryProps)=>{
    
   const [categoryItems, setCategoryItems] = useState<ProductProps | any>([])
    const cartContext = useContext(CartContext)
    const {Products} = cartContext

    useEffect(()=>{
    if(Products && Products.length > 0){
      const items: any = Products.filter((item)=>item.categories?.some((cat)=>cat.toLowerCase() === decodeURIComponent(category.toLowerCase())))
      setCategoryItems(items)
    }
    }, [Products])

   const message = `Loading items...`


    return (
      <div className='pb-8'>
           <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{capitalize(decodeURIComponent(category))}</h2>
            {categoryItems && categoryItems.length > 0 ? <DisplayStore productArray={categoryItems} numPerPage={5} />
            :
            <CategoryNotFound category={category} />
              }

  </div>
    )
}

export default ProductCategory