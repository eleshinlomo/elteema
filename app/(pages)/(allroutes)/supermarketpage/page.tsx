'use client'
import {useState, useEffect, useContext} from 'react'
import { ProductProps } from '../../../../components/api/product'
import Image from 'next/image'
import { ProductContext } from '../../../../contextProviders/ProductContext'
import DisplaySuperMarket from './displaySupermarket'


const SuperMarket = ()=>{
 const [bestsellers, setBestsellers] = useState<ProductProps[]>([])
 const {Products} = useContext(ProductContext)

 

 useEffect(()=>{
    // getBestsellers()
 }, [Products])

  const message = 'Loading supermarket items...'
    return (
        <div id='supermarket-top' className='py-16'>
            <h2 className="text-3xl font-bold text-gray-800 pb-8 pt-16 text-center ">Elteema Supermarket</h2>
            {Products?.length > 0 ? <DisplaySuperMarket productArray={Products} numPerPage={4} />:

             <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products available</h3>
            <p className="mt-1 text-gray-500">The supermarket is currently closed.</p>
          </div>
            }
        
    </div>
    )
}

export default SuperMarket