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

interface CategoryProps {
  category: string;
}

const ProductCategory = ({ category }: CategoryProps) => {
  const [categoryItems, setCategoryItems] = useState<ProductProps[]>([])
  const { isLoading, setIsLoading } = useContext(GeneralContext)
  const { Products } = useContext(ProductContext)
  const [categoryStatus, setCategoryStatus] = useState<'loading' | 'found' | 'not-found'>('loading')

  useEffect(() => {
    setIsLoading(true)
    setCategoryStatus('loading')
    
    if (Products) {
      const items = Products.filter(item => 
        item.category.toLowerCase() === decodeURIComponent(category.toLowerCase()) || 
        item.productName.toLowerCase() === decodeURIComponent(category).toLowerCase()
      )
      
      if (items?.length > 0) {
        setCategoryItems(items)
        setCategoryStatus('found')
      } else {
        setCategoryStatus('not-found')
      }
      setIsLoading(false)
    }
  }, [Products, category])

  // Show loading state while checking
  if (categoryStatus === 'loading' || isLoading) {
    return (
      <div className="py-32">
        <SkeletonPage message={`Loading ${decodeURIComponent(category)} items...`} />
      </div>
    )
  }

  // Show not found page only after confirmation
  if (categoryStatus === 'not-found') {
    return (
      <div className="py-8">
        <CategoryNotFound category={category} />
      </div>
    )
  }

  // Show products
  return (
    <div className="pb-8">
      <ProductDetails 
        productArray={categoryItems} 
        text={`Shop for ${decodeURIComponent(category)}`} 
      />
    </div>
  )
}

export default ProductCategory