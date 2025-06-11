'use client'
import {useState, useEffect, useContext} from 'react'
import { ProductProps } from '../api/product'
import Image from 'next/image'
import AllProductDisplay from './ProductsDisplay'
import { CartContext } from '../../contextProviders/cartcontext'
import SkeletonPage from '../skeletonPage'


const AllStores = ()=>{
 const [bestsellers, setBestsellers] = useState<ProductProps[]>([])
 const cartContext = useContext(CartContext)
 const {Products} = cartContext

 

 useEffect(()=>{
    // getBestsellers()
 }, [Products])

  const message = 'Loading bestselling items...'
    return (
        <div id='bestsellers'>
            <h2 className="text-3xl font-bold text-gray-800 pb-8 pt-16 text-center ">Elteema All Stores</h2>
            {Products?.length > 0 ? <AllProductDisplay productArray={Products} />:
            <div>
                <p className='text-center text-xl'>No product to display</p>
            </div>
            }
        
    </div>
    )
}

export default AllStores