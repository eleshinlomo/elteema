'use client'

import React, { useState, useEffect, useContext } from 'react'
import { ProductProps } from '../api/product'
import SkeletonPage from '../skeletonPage'
import { capitalize } from '../utils'
import CategoryNotFound from './productCatNotFound'
import { ProductContext } from '../../contextProviders/ProductContext'
import ProductDetails from './productdetails'
import { GeneralContext } from '../../contextProviders/GeneralProvider'
import LoadingState from '../LoadingState'
import { useRouter } from 'next/navigation'


interface CategoryProps {
  category: string;
}

const ProductCategory = ({ category }: CategoryProps) => {
  const [categoryItems, setCategoryItems] = useState<ProductProps[]>([])
  const { isLoading, setIsLoading } = useContext(GeneralContext)
  const { Products } = useContext(ProductContext)
  const [categoryStatus, setCategoryStatus] = useState<'loading' | 'found' | 'not-found'>('loading')
  const router = useRouter()

useEffect(() => {
  if (!Products || Products.length === 0) return; // Prevent premature action

  setIsLoading(true)
  setCategoryStatus('loading')

  const decodedCategory = decodeURIComponent(category.toLowerCase())
  const items = Products.filter(item =>
    item.category.toLowerCase() === decodedCategory ||
    item.productName.toLowerCase() === decodedCategory
  )

  if (items?.length > 0) {
    setCategoryItems(items)
    setCategoryStatus('found')
  } else {
    setCategoryStatus('not-found')
  }

  setIsLoading(false)
}, [Products, category])


useEffect(()=>{
  if(categoryStatus === 'not-found'){
      router.push(`/categorynotfoundpage/${encodeURIComponent(category)}`)
  }
}, [categoryStatus])


 
  // Show products
  return (
    <div className="pb-8">
      {categoryItems?.length > 0 ? 
      
      <ProductDetails 
        productArray={categoryItems} 
        text={`Shop for ${decodeURIComponent(category)}`} 
        productsPerPage={6}
      />:
      <LoadingState />
      }
    </div>
  )
}

export default ProductCategory