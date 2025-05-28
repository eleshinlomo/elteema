'use client'
import React, { useState, useEffect, useContext } from 'react'
import { Search as SearchIcon, Zap, Star, ShoppingBag, ListTree } from 'lucide-react'
import { ProductProps } from "../data/productsdata"
import Hero from '../hero'
import ProductDisplay from './ProductsDisplay'
import { CartContext } from '../../contextProviders/cartcontext'
import PurchaseAlert from './purchaseAlert'
import HotProductFlash from './hotProductFlash'


const SwipeProduct = () => {
    const [allProducts, setAllProducts] = useState<ProductProps[]>([])
    const [itemToSearch, setItemToSearch] = useState<string>('')
    const [searchedItemList, setSearchItemList] = useState<ProductProps[]>([])
    const [searchedItemFound, setSearchedItemFound] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const cartContext = useContext(CartContext)
    const { Products } = cartContext

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemToSearch(e.target.value)
    }

    const getSearchedItems = () => {
        if (itemToSearch === '') {
            setSearchItemList([])
            setSearchedItemFound(false)
            return
        }

        const filteredItems = Products.filter((item) => 
            item.name.toLowerCase().includes(itemToSearch.toLowerCase())
        )
        
        setSearchItemList(filteredItems)
        setSearchedItemFound(filteredItems.length > 0)
    }

    useEffect(() => {
        getSearchedItems()
    }, [itemToSearch])

    useEffect(() => {
        setAllProducts(Products)
    }, [])

    return (
        <div id='search' className="bg-gradient-to-b from-green-50 to-white mt-2 pb-4 ">
            
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                
                
                <div className="container flex flex-col items-center bg-white p-6 rounded-xl shadow-lg mb-12 -mt-12 border border-green-100">
                   
                   
                    <div className="">
                     {/* Purchase Alert */}
                        <PurchaseAlert />
                    </div>
                    
                    <div className="flex-1 mx-4 my-4 md:my-0 relative min-w-0">
                          {/* Search Bar Section */}
                          <div className={`relative transition-all duration-300 ${isFocused ? 'ring-4 ring-green-200 rounded-full z-30' : ''}`}>
            <input
                value={itemToSearch}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search African products..."
                className="w-full px-4 py-2 border border-green-600 rounded-full"
            />
            <SearchIcon className="absolute right-6 top-1/2 transform -translate-y-1/2 text-green-500 h-6 w-6" />
        </div>
        <div className="flex justify-center mt-3">
            <a href='/authpages/seller/signup'>
                <button className="flex items-center rounded-full bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-2 shadow-md hover:shadow-lg transition-all hover:scale-105">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    SELL ON ELTEEMA
                </button>
            </a>
        </div>
    </div>
    
    {/* HotProductFlash - Add fixed width */}
    {/* <div className="">
        <HotProductFlash />
    </div> */}
                </div>
                
                {/* Results Section */}
                {searchedItemFound && searchedItemList.length > 0 ? (
                    <div className="animate-fadeIn">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                            Search Results for <span className="text-green-600">{itemToSearch}</span>
                        </h2>
                        <ProductDisplay productArray={searchedItemList} />
                    </div>
                ) : itemToSearch && !searchedItemFound ? (
                    <div className="text-center py-4 animate-fadeIn">
                        <div className="inline-block p-6 bg-green-100 rounded-full mb-6">
                            <SearchIcon className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-500 mb-6">
                            We couldn&apos;t find any products matching {itemToSearch}
                        </p>
                        <a href='/'>
                            <button 
                            onClick={() => setItemToSearch('')}
                            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-md"
                        >
                            Browse All Posts
                        </button>
                        </a>
                    </div>
                ) : (
                    <div className="animate-fadeIn">
                       
                        <ProductDisplay productArray={Products.slice(0,1)} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SwipeProduct