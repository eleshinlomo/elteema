"use client"
import React, { useState, useEffect, useContext } from 'react'
import { Search as SearchIcon, Zap, Star, ShoppingBag, ListTree } from 'lucide-react'
import { ProductProps } from '../api/product'
import Hero from '../hero'
import { CartContext } from '../../contextProviders/cartcontext'
import PurchaseAlert from './purchaseAlert'
import DisplayStore from '../../app/(pages)/(allroutes)/supermarketpage/displaySupermarket'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductContext } from '../../contextProviders/ProductContext'
import { GeneralContext } from '../../contextProviders/GeneralProvider'

const Featured = () => {
    const [allProducts, setAllProducts] = useState<ProductProps[]>([])
    const [itemToSearch, setItemToSearch] = useState<string>('')
    const [searchedItemList, setSearchItemList] = useState<ProductProps[]>([])
    const [searchedItemFound, setSearchedItemFound] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [showHero, setShowHero] = useState(true)
    // Hooks
    const {Products} = useContext(ProductContext)
    const {showSearchPage, setShowSearchPage} = useContext(GeneralContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemToSearch(e.target.value)
    }

    const getSearchedItems = () => {
        if (itemToSearch === '') {
            setSearchItemList([])
            setSearchedItemFound(false)
            setShowHero(true)
            return
        }

        const filteredItems = Products?.filter((item) => 
            item?.productName?.toLowerCase().includes(itemToSearch.toLowerCase())
        )
        
        setSearchItemList(filteredItems)
        setSearchedItemFound(filteredItems?.length > 0)
        setShowHero(false)
    }

    useEffect(() => {
        getSearchedItems()
    }, [itemToSearch])

    useEffect(() => {
       
        if(Products?.length > 0){
        console.log('PRODUCTS TO FEATURE', Products)
        setAllProducts(Products)
        }
    }, [])

    return (
        <div id='search' className="relative flex flex-col bg-gradient-to-b from-green-50 to-white mt-2 pb-16 w-full" style={{ zIndex: 9999 }}>
            <button className='absolute right-0 bg-green-800 text-white rounded-2xl z-50 p-2 m-4'
                onClick={()=>setShowSearchPage(false)}
            > Close
            </button>
            <div className='absolute left-0 right-0 z-50'>
            {/* Animated Content Section */}
            <AnimatePresence mode="wait">
                {searchedItemFound && searchedItemList.length > 0 ? (
                    <motion.div
                        key="search-results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                            Search Results for <span className="text-green-600">{itemToSearch}</span>
                        </h2>
                        <DisplayStore productArray={searchedItemList} numPerPage={2} />
                    </motion.div>
                ) : itemToSearch && !searchedItemFound ? (
                    <motion.div
                        key="no-results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-center"
                    >
                        <div className="inline-block p-6 bg-green-100 rounded-full mb-6">
                            <SearchIcon className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-500 mb-6">
                            We couldn&apos;t find any products matching {itemToSearch}
                        </p>
                        <a href='/supermarketpage'>
                            <button 
                                onClick={() => setItemToSearch('')}
                                className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-md"
                            >
                                GO TO SUPERMARKET
                            </button>
                        </a>
                    </motion.div>
                ) : (
                    <motion.div
                        key="hero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Hero />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mx-auto mt-8">
                <div className="container flex flex-col items-center p-6 rounded-xl mb-12 -mt-12">
                    <div className="flex-1 mx-4 my-8 md:my-0 relative min-w-0">
                        {/* Search Bar Section */}
                        <motion.div 
                            className={`relative transition-all duration-300 ${isFocused ? 'ring-4 ring-green-200 rounded-full z-30' : ''}`}
                            whileHover={{ scale: 1.01 }}
                        >
                            <input
                                value={itemToSearch}
                                onChange={handleChange}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Search African products..."
                                className="w-full px-4 py-2 border border-green-600 rounded-full focus:outline-none"
                            />
                            <SearchIcon className="absolute right-6 top-1/2 transform -translate-y-1/2 text-green-500 h-6 w-6" />
                        </motion.div>
                        <motion.div 
                            className="flex justify-center mt-3"
                            whileHover={{ scale: 1.02 }}
                        >
                            <button className="flex items-center rounded-full bg-gradient-to-r from-green-600 to-green-800 text-white px-2 py-2 shadow-md hover:shadow-lg transition-all">
                                <ShoppingBag className="mr-2 h-5 w-5" />
                                SEARCH PRODUCT
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Featured