'use client'
import {useState, useEffect, useContext} from 'react'
import { Button } from "../ui/button"
import { ProductProps} from "../data/productsdata"
import Image from 'next/image'
import AllProductDisplay from './allProductDisplay'
import { CartContext } from '../../contextProviders/cartcontext'


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


    return (
        <div id='bestsellers'>
            <p className='text-center py-2 font-extrabold uppercase'>Bestsellers</p>
            <AllProductDisplay productArray={bestsellers} />
        
    </div>
    )
}

export default Bestsellers