'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getStore, StoreProps } from "../../../../../components/api/store"
import Image from "next/image"
import { capitalize } from "../../../../../components/utils"
import { LocateIcon, TruckIcon } from "lucide-react"
import ProductDetails from "../../../../../components/product/productdetails"

const StoreFront = () => {
  const params: any = useParams()
  const storeName = decodeURIComponent(params?.storeName?.toString()) || ''
  const [store, setStore] = useState<StoreProps | null>(null)
  const [error, setError] = useState('')
  const storeAddress = store ? `${store.address}, ${capitalize(store.city)}, ${capitalize(store.state)}, ${store.country}` : ''

  useEffect(() => {
    const handleGetStore = async () => {
      setError('')
      if (storeName) {
        const response = await getStore(storeName)
        console.log('STORE FRONT', response)
        if (response.ok) {
          setStore(response.message)
        } else {
          setError(response.error)
        }
      }
    }

    handleGetStore()
  }, [storeName, store])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Store Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">{capitalize(store.storeName)}</h1>
            <p className="text-xl text-gray-600">{store.tagline}...</p>
          <div className="flex items-center justify-center gap-2 text-gray-500 ">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
  <span>{storeAddress}</span>
</div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {store.items?.length > 0 ? (
          <div>
           
              {/* Product Info */}
                  <ProductDetails productArray={store.items} text={'Items to buy'} />
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products available</h3>
            <p className="mt-1 text-gray-500">This store hasn&apos;t added any products yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoreFront