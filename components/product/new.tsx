'use client'
import React, {useState, useEffect, useContext} from 'react'
import { ProductProps } from "../data/productsdata"
import Image from 'next/image'
import { searchSingleProduct } from '../utils'
import AllProductDisplay from './ProductsDisplay'
import { CartContext } from '../../contextProviders/cartcontext'
import SkeletonPage from '../skeletonPage'



const New = ()=>{
    
    const [newList, setNewList] = useState<ProductProps[]>([])
    const cartContext = useContext(CartContext)
    const {Products} = cartContext
    const message = 'Loading new items...'
    
    


    const getNewItems  = ()=>{
      const newItems = Products.filter((item)=>item.category === 'new')
      if(newItems.length > 0){
         setNewList(newItems)
      }
       
     }

     useEffect(()=>{
        getNewItems()
     }, [Products])

   

     


    return (
      <div id='new'>
            <p className='text-center py-4 font-extrabold uppercase animate-pulse text-green-600 tracking-wide text-xl'>New ARRIVALS</p>
            <div >
    
       
                {newList && newList.length > 0 ?<AllProductDisplay productArray={newList} />:
                <SkeletonPage message={message} />
                }
    
            </div>

  </div>
    )
}

export default New