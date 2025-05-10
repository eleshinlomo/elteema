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
      const newItems = Products.filter((item)=>item.category.some((cat)=> cat === 'new'))
      if(newItems.length > 0){
         setNewList(newItems)
      }
       
     }

     useEffect(()=>{
        getNewItems()
     }, [Products])

   

     


    return (
      <div id='new' className='pt-2'>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">New Arrivals</h2>
            <div >
    
       
                {newList && newList.length > 0 ?<AllProductDisplay productArray={newList.slice(0, 4)} />:
                <SkeletonPage message={message} />
                }
    
            </div>

  </div>
    )
}

export default New