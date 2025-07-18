'use client'
import {useState, useEffect, useContext} from 'react'
import { ProductProps } from '../../../../components/api/product'
import Image from 'next/image'
import { ProductContext } from '../../../../contextProviders/ProductContext'
import ProductDetails from '../../../../components/product/productdetails'


const SuperMarket = ()=>{
 const [bestsellers, setBestsellers] = useState<ProductProps[]>([])
 const {Products} = useContext(ProductContext)

 

 useEffect(()=>{
    // getBestsellers()
 }, [Products])

  const message = 'Loading supermarket items...'
    return (
        <div id='supermarket-top' className='pt-2'>
            {/* <h2 className="text-2xl font-bold text-gray-800 pb-8 pt-16 text-center ">Your all-in-one marketplace, only on Elteema.</h2> */}
              <ProductDetails productArray={Products} text={'Your all-in-one marketplace, only on Elteema'} />

       </div>
    )
}

export default SuperMarket