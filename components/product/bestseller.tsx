'use client'
import {useState, useEffect} from 'react'
import AddToCartButton from "../../app/(pages)/cart/addtocartbtn"
import { Button } from "../ui/button"
import { ProductProps, Products } from "./data/products"
import Image from 'next/image'


const BestsellerProducts = ()=>{
 const [bestsellers, setBestsellers] = useState<ProductProps[]>([])

 const getBestsellers  = ()=>{
    const bestsellerItems = Products.filter((item: ProductProps)=>item.bestseller === true)
    if(bestsellerItems.length > 0){
        setBestsellers(bestsellerItems)
    }
 }

 useEffect(()=>{
    getBestsellers()
 }, [])


    return (
        <div className=''>
        
        <div className="grid  md:grid-cols-4 lg:grid-cols-4 pb-2 items-center gap-5 px-4">
        {bestsellers.map((product, index)=>
        <div  key={index}>

         {product?
        <div  className="">
         <div className="relative h-[150px] w-[300px]">
        <Image src={product.src} alt='woman image' fill />
        </div>
         <p className="font-semibold text-2xl">{product.name}</p>
         <p>${product.price}</p>
         <AddToCartButton targetid={product.id} />
        </div>:null}

         </div>
        )}
        </div>
        </div>
    )
}

export default BestsellerProducts