'use client'
import {useState, useEffect, useContext} from 'react'
import { ProductProps } from '../../../../components/api/product'
import Image from 'next/image'
import AllProductDisplay from '../../../../components/product/ProductsDisplay'
import { CartContext } from '../../../../contextProviders/cartcontext'
import SkeletonPage from '../../../../components/skeletonPage'
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
            <div>
                <p className='text-center text-xl'>No product to display</p>
            </div>
            }
        
    </div>
    )
}

export default SuperMarket