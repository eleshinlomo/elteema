'use client'
import {useState, useEffect} from 'react'
import AddToCartButton from "../cart/addtocartbtn"
import { Button } from "../ui/button"
import { ProductProps, Products } from "./productsdata"
import Image from 'next/image'
import ContactSeller from './productdetails'
import ProductDetails from './productdetails'
import AllProductDisplay from './allProductDisplay'


const Bestsellers = ()=>{
 const [bestsellers, setBestsellers] = useState<ProductProps[]>([])

 const getBestsellers  = ()=>{
    const bestSellerItems = Products.filter((item: ProductProps)=>item.category === 'bestseller')
    if(bestSellerItems.length > 0){
        setBestsellers(bestSellerItems)
    }
 }

 useEffect(()=>{
    getBestsellers()
 }, [])


    return (
        <div id='bestsellers'>
            <p className='text-center py-2 font-extrabold uppercase'>Bestsellers</p>
            <AllProductDisplay productArray={bestsellers} />
        
    </div>
    )
}

export default Bestsellers