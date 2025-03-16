'use client'
import React, {useState, useEffect} from 'react'
import { Products, ProductProps } from "../data/productsdata"
import Image from 'next/image'
import { searchSingleProduct } from '../utils'
import AllProductDisplay from './allProductDisplay'



const New = ()=>{
    
    const [newItems, setNewItems] = useState<ProductProps[]>([])
    const [itemToSearch, setItemToSearch ] = useState('')
    const originalItems = Products.filter((item)=>item.category === 'new')
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
       setItemToSearch(e.target.value)
    }


    const getTrendingItems  = ()=>{
        
        const filteredItems = searchSingleProduct(itemToSearch, originalItems)
        setNewItems(filteredItems)
       
     }

     useEffect(()=>{
        getTrendingItems()
     }, [itemToSearch])

     useEffect(()=>{
        setNewItems(originalItems)
     },[])

     


    return (
      <div id='new'>
            <p className='text-center py-4 font-extrabold uppercase animate-pulse text-green-600 tracking-wide text-xl'>New ARRIVALS</p>
            <div >
    
       
                <AllProductDisplay productArray={newItems} />
    
            </div>

  </div>
    )
}

export default New