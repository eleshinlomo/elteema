'use client'
import React, { useState, useEffect, useContext } from 'react'
import { ProductProps } from '../api/product'
import { ProductContext } from '../../contextProviders/ProductContext'
import { motion } from 'framer-motion'
import DisplayStore from '../displayStore'
import SkeletonPage from '../skeletonPage'

const Trending = () => {
  const { Products } = useContext(ProductContext)
  const [trendingItems, setTrendingItems] = useState<ProductProps | any>([])
  const [message] = useState('Discovering hot products...')

  useEffect(() => {
    
    if(Products?.length > 0){
      const items = Products.filter((item) => item.numOfItemsSold >= 0)
    
       setTrendingItems(items)
      
    }
    console.log('TRENDING ARRAY', trendingItems)
  }, [trendingItems?.length, Products?.length])

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Trending Now
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what everyone is loving right now
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          {trendingItems && trendingItems.length > 0 ? (
            <div className="">
              <div className="hover:scale-[1.02] transition-transform duration-300">
                <DisplayStore productArray={trendingItems} numPerPage={2} />
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
              <SkeletonPage message={message} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Trending