'use client'
import {useState, useEffect} from 'react'
import AddToCartButton from "../../app/(pages)/cartpage/addtocartbtn"
import { Button } from "../ui/button"
import { ProductProps, Products } from "./productdata/products"
import Image from 'next/image'


const FeaturedProducts = ()=>{
 const [featured, setFeatured] = useState<ProductProps[]>([])

 const getBestsellers  = ()=>{
    const bestsellerItems = Products.filter((item: ProductProps)=>item.featured === true)
    if(bestsellerItems.length > 0){
        setFeatured(bestsellerItems)
    }
 }

 useEffect(()=>{
    getBestsellers()
 }, [])


    return (
        <div className='flex flex-col justify-center items-center'>
        
        <div className="grid  md:grid-cols-2 lg:grid-cols-4 pb-2 items-center gap-5 px-4">
        {featured.map((product, index)=>
        <div  key={index} className='shadow-2xl w-full md:w-[300px] rounded-2x'>

         {product?
        <div  className="">
         <div className="relative h-[150px] w-[300px]">
        <Image src={product.src} alt='woman image' fill />
        </div>
         <p className="font-semibold text-2xl">{product.name}</p>
         <p>${product.price}</p>
         <AddToCartButton targetid={product.id} />
         <p><span className='font-bold'>Supplier</span>: {product.supplierName}</p>
         <p className='text-green-800 text-xl'>{product.star + product.star + product.star + product.star + product.star}</p>
         <a href='/' className='bg-white text-green-500 p-2 rounded-2xl'>Contact Supplier</a>
        </div>:null}

         </div>
        )}
        </div>
        </div>
    )
}

export default FeaturedProducts