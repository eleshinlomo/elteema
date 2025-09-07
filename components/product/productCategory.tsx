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
import HotProductFlash from './hotProductFlash'
import PurchaseAlert from './purchaseAlert'
import SimilarProducts from './SimilarProducts'
import LatestProducts from './LatestProducts'

interface CategoryProps {
  category: string;
}

const ProductCategory = ({ category }: CategoryProps) => {
  const [categoryItems, setCategoryItems] = useState<ProductProps[]>([])
  const { isLoading, setIsLoading } = useContext(GeneralContext)
  const { Products } = useContext(ProductContext)
  const [product, setProduct] = useState<ProductProps | null>(null)
  const [categoryStatus, setCategoryStatus] = useState<'loading' | 'found' | 'not-found'>('loading')
  const router = useRouter()

  useEffect(() => {
    if (!Products || Products.length === 0) return; // Prevent premature action

    setIsLoading(true)
    setCategoryStatus('loading')

    const decodedCategory = decodeURIComponent(category.toLowerCase())
    const items = Products.filter(item =>
      item.category.toLowerCase() === decodedCategory && !item.isHidden ||
      item.productName.toLowerCase() === decodedCategory && !item.isHidden
    )

    if (items?.length > 0) {
      setCategoryItems(items)
      setCategoryStatus('found')
    } else {
      setCategoryStatus('not-found')
    }

    setProduct(items[0])
    setIsLoading(false)
  }, [Products, category])

  useEffect(() => {
    if (categoryStatus === 'not-found') {
      router.push(`/categorynotfoundpage/${encodeURIComponent(category)}`)
    }
  }, [categoryStatus])

  // Show products
  return (
    <div className="pb-8 px-4">
      {categoryItems?.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-3 justify-center items-start">
          
            <div className="hidden md:block flex-1 w-full mx-auto">
              <LatestProducts />
            </div>
          

          {/* Main Product Section - Centered for single product */}
          <div className={"flex-1 w-full mx-auto border border-green-800" }>
            <ProductDetails
              productArray={categoryItems}
              text={`Shop for ${decodeURIComponent(category)}`}
              productsPerPage={4}
            />
          </div>

          {/* Sidebar Right - Only shows when found product is more than 1 */}
  
          
            <div className="flex-1 w-full mx-auto">
              {product && <SimilarProducts product={product} productPerPage={4} />}
            </div>
        
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingState />
        </div>
      )}
    </div>
  )
}

export default ProductCategory