'use client'
import React, {useState, useEffect} from 'react'
import AddToCartButton from "../../app/(pages)/cartpage/addtocartbtn"
import { Products, ProductProps } from "./productsdata"
import Image from 'next/image'
import { searchSingleProduct } from '../utils'
import ContactSeller from './details'



const New = ()=>{
    
    const [trendingItems, setTrendingItems] = useState<ProductProps[]>([])
    const [itemToSearch, setItemToSearch ] = useState('')
    const originalItems = Products.filter((item)=>item.trending === true)
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
       setItemToSearch(e.target.value)
    }


    const getTrendingItems  = ()=>{
        
        const filteredItems = searchSingleProduct(itemToSearch, originalItems)
        setTrendingItems(filteredItems)
       
     }

     useEffect(()=>{
        getTrendingItems()
     }, [itemToSearch])

     useEffect(()=>{
        setTrendingItems(originalItems)
     },[])

     


    return (
      <div id='new'>
            <p className='text-center py-4 font-extrabold uppercase'>New</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {trendingItems.slice(0, 4).map((item, index) => (
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
                  <div className="mt-4">
                      <AddToCartButton targetid={item.id} />
                  </div>
                  <div className="mt-2">
                      <ContactSeller />
                  </div>
              </div>
          </div>
      ))}
  </div>

  </div>
    )
}

export default New