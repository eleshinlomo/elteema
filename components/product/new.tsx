'use client'
import React, {useState, useEffect, useContext} from 'react'
import { ProductProps } from '../api/product'
import Image from 'next/image'
import { searchSingleProduct } from '../utils'
import ProductDetails from './productdetails'
import { CartContext } from '../../contextProviders/cartcontext'
import SkeletonPage from '../skeletonPage'
import { ProductContext } from '../../contextProviders/ProductContext'



const New = ()=>{
    
    const [newList, setNewList] = useState<ProductProps[]>([])
    const message = 'Loading new items...'
    // Hooks
    const {Products} = useContext(ProductContext)
    
    


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
      <div id='new' className='pt-2'>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">New Arrivals</h2>
            <div >
    
       
                {newList && newList.length > 0 ?<ProductDetails productArray={newList.slice(0, 4)} text='New Items' />:
                <SkeletonPage message={message} />
                }
    
            </div>

  </div>
    )
}

export default New