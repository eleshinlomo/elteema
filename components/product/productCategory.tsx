'use client'

import React, { useState, useEffect, useContext } from 'react'
import { ProductProps } from '../api/product'
import SkeletonPage from '../skeletonPage'
import { capitalize } from '../utils'
import CategoryNotFound from './productCatNotFound'
import { ProductContext } from '../../contextProviders/ProductContext'
import ProductDetails from './productdetails'

interface CategoryProps {
  category: string;
}

const ProductCategory = ({ category }: CategoryProps) => {
  const [categoryItems, setCategoryItems] = useState<ProductProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { Products } = useContext(ProductContext)

  useEffect(() => {
    if (Products) {
      const items = Products.filter(item => 
        item.category.toLowerCase() === decodeURIComponent(category.toLowerCase()) || item.productName.toLowerCase() === category.toLowerCase()
      )
      setCategoryItems(items)
      setIsLoading(false)
    }
  }, [Products, category])

  if (isLoading) {
    return (
      <div className="py-32">
        <SkeletonPage message={`Loading ${decodeURIComponent(category)} items...`} />
      </div>
    )
  }

  if (categoryItems.length === 0) {
    return (
      <div className="py-8">
        <CategoryNotFound category={category} />
      </div>
    )
  }

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