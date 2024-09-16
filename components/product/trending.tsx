'use client'
import React, {useState, useEffect} from 'react'
import AddToCartButton from "../../app/(pages)/cart/addtocartbtn"
import { Products, ProductProps } from "./data/products"
import Image from 'next/image'
import { searchSingleProduct } from '../utils'



const TrendingProducts = ()=>{
    const [trending, setTrending] = useState<ProductProps[]>([])
    const [searchedItem, setSearchedItem] = useState(trending)
    const [itemToSearch, setItemToSearch ] = useState('')
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
       setItemToSearch(e.target.value)
    }


    const handleSingleProductSearch = ()=>{
        const item: any = searchSingleProduct(itemToSearch)
        if(item){
         setSearchedItem(item)
        }
    }
   

    useEffect(()=>{
        handleSingleProductSearch()
    }, [itemToSearch])

    const getTrendingItems  = ()=>{
        const trendingItems = Products.filter((item: ProductProps)=>item.trending === true)
        if(trendingItems.length > 0){
            setTrending(trendingItems)
        }
     }

     useEffect(()=>{
        getTrendingItems()
     }, [])


    return (
        <div className='flex flex-col justify-center items-center'>
        
         <div>
            <p className='text-2xl font-extrabold text-green-800'>Search food</p>
            <input value={itemToSearch} onChange={handleChange} className='border border-green-800 rounded-2xl my-2 px-4'  />
         </div>

        {searchedItem.length > 0 ?
        <div className="grid  md:grid-cols-2 lg:grid-cols-4 pb-2 items-center gap-5 px-4 ">
        {searchedItem.map((item, index)=>
        <div  key={index} className="">
        <div  className=" ">
        <div className="relative h-[150px] w-[300px]">
        <Image src={item.src} alt='woman image' fill />
        </div>
         <p className="font-semibold text-2xl">{item.name}</p>
         <p>${item.price}</p>
         <AddToCartButton targetid={item.id}  />
         <p><span className='font-bold'>Supplier</span>: {item.supplierName}</p>
         <a href='/' className='bg-green-100 text-green-500 px-2'>Contact Supplier</a>
        </div>

         </div>
        )}
        </div>:
        <div><p className='text-2xl'>We cannot find the item you are looking for.</p></div>
         }
        

        </div>
    )
}

export default TrendingProducts