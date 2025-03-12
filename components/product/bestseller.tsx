'use client'
import {useState, useEffect} from 'react'
import AddToCartButton from "../cart/addtocartbtn"
import { Button } from "../ui/button"
import { ProductProps, Products } from "./productsdata"
import Image from 'next/image'
import ContactSeller from './productdetails'
import ProductDetails from './productdetails'


const Bestsellers = ()=>{
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
        <div id='bestsellers'>
            <p className='text-center py-2 font-extrabold uppercase'>Bestsellers</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            
        {bestsellers.slice(0, 4).map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
                <div className="relative h-48 w-full">
                    <Image src={item.src} alt={item.name} layout="fill" objectFit="cover" />
                </div>
                <div className="p-4">
                    <p className="font-semibold text-xl mb-2">{item.name}</p>
                    <p className="text-green-600 text-lg font-bold">N{item.price}</p>
                    <p className="text-sm text-gray-600"><span className="font-bold">Supplier</span>: {item.supplierName}</p>
                    <div className="flex items-center mt-2">
                        {Array(5).fill(null).map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                        ))}
                    </div>
                    <div className="mt-4 flex gap-4">
                    <AddToCartButton targetid={item.id} />
                    <ProductDetails id={item.id} />
                    </div>
                    
                </div>
            </div>
        ))}
    </div>
    </div>
    )
}

export default Bestsellers