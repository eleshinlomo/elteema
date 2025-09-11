'use client'
import {useState, useEffect, useContext, useMemo} from 'react'
import { ProductProps } from '../../../../components/api/product'
import Image from 'next/image'
import { ProductContext } from '../../../../contextProviders/ProductContext'
import ProductDetails from '../../../../components/product/productdetails'
import MostViewedProducts from '../../../../components/product/MostViewd'


const SuperMarket = ()=>{
 const [bestsellers, setBestsellers] = useState<ProductProps[]>([])
 const {Products} = useContext(ProductContext)
  const shuffledProducts = useMemo(() => {
       if (!Products || Products.length === 0) return []
       return [...Products].sort(() => 0.5 - Math.random())
     }, [Products.length])

 

 useEffect(()=>{
    // getBestsellers()
 }, [Products])

  const message = 'Loading supermarket items...'
    return (
        <div id='supermarket-top' className='py-24'>
          <h1 className='text-center text-3xl py-2'>ELTEEMA SUPERMARKET</h1>

           <MostViewedProducts />
            {/* <h2 className="text-2xl font-bold text-gray-800 pb-8 pt-16 text-center ">Your all-in-one marketplace, only on Elteema.</h2> */}
              <ProductDetails productArray={shuffledProducts} text={'HOT PRODUCTS'} productsPerPage={24} />
             

       </div>
    )
}

export default SuperMarket