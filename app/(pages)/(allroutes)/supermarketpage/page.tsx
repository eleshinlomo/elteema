'use client'
import {useState, useEffect, useContext} from 'react'
import { ProductProps } from '../../../../components/api/product'
import Image from 'next/image'
import { ProductContext } from '../../../../contextProviders/ProductContext'
import DisplaySuperMarket from './displaySupermarket'
import ProductDetails from '../../../../components/product/productdetails'


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
              <ProductDetails />

    </div>
    )
}

export default SuperMarket