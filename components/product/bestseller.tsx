'use client'
import {useState, useEffect, useContext} from 'react'
import { ProductProps} from "../data/productsdata"
import Image from 'next/image'
import AllProductDisplay from './ProductsDisplay'
import { CartContext } from '../../contextProviders/cartcontext'
import SkeletonPage from '../skeletonPage'


const Bestsellers = ()=>{
 const [bestsellers, setBestsellers] = useState<ProductProps[]>([])
 const cartContext = useContext(CartContext)
 const {Products} = cartContext

 const getBestsellers  = ()=>{
    const bestSellerItems = Products.filter((item: ProductProps)=>item.category === 'bestseller')
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
            {bestsellers && bestsellers.length > 0 ? <AllProductDisplay productArray={bestsellers} />:
            <SkeletonPage message={message} />
            }
        
    </div>
    )
}

export default Bestsellers