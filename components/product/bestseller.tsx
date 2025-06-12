'use client'
import {useState, useEffect, useContext} from 'react'
import { ProductProps } from '../api/product'
import Image from 'next/image'
import AllProductDisplay from './ProductsDisplay'
import { CartContext } from '../../contextProviders/cartcontext'
import SkeletonPage from '../skeletonPage'
import { ProductContext } from '../../contextProviders/ProductContext'


const Bestsellers = ()=>{
 const [bestsellers, setBestsellers] = useState<ProductProps[]>([])
const {Products} = useContext(ProductContext)

 const getBestsellers  = ()=>{
    const bestSellerItems: ProductProps[] = Products.filter((item)=>item.categories?.some((cat)=>cat === 'bestseller'))
    if(bestSellerItems.length > 0){
        setBestsellers(bestSellerItems)
    }
 }

 useEffect(()=>{
    getBestsellers()
 }, [Products])

  const message = 'Loading bestselling items...'
    return (
        <div id='bestsellers'>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Bestsellers</h2>
            {bestsellers && bestsellers.length > 0 ? <AllProductDisplay productArray={bestsellers.slice(0, 4)} />:
            <SkeletonPage message={message} />
            }
        
    </div>
    )
}

export default Bestsellers