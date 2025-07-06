'use client';

import { useState, useEffect, useContext } from 'react';
import CookiePolicy from "../../../../components/cookieAcceptPage";
import FeedsPage from '../feedspage/page';
import { GeneralContext } from '../../../../contextProviders/GeneralProvider';
import { usePathname } from 'next/navigation';
import Featured from '../../../../components/product/featured';
import SuperMarket from '../supermarketpage/page';
import HotMobilePreview from '../../../../components/product/hotProductsPreview';
import HotProductFlash from '../../../../components/product/hotProductFlash';
import PurchaseAlert from '../../../../components/product/purchaseAlert';
import { ProductContext } from '../../../../contextProviders/ProductContext';
import ProductDetails from '../../../../components/product/productdetails';
import { ProductProps } from '../../../../components/api/product';

export default function Home() {
  const { page, setPage, showSearchPage, setShowSearchPage } = useContext(GeneralContext);
  const path = usePathname();
  const {Products} = useContext(ProductContext)
  const [itemsToSort, setItemsToSort] = useState<ProductProps[]>([])
  const [sortItems, setSortItems] = useState<ProductProps[]>([])

  const handleItemToSort = (category: string)=>{
     if(category){
      const products = Products.filter((product)=>product.category.toLowerCase() === category.toLowerCase())
      if(products){
        setSortItems([])
        setItemsToSort(products)
      }
     }
  }

  useEffect(()=>{
    if(itemsToSort?.length > 0){
      setSortItems(itemsToSort)
    }else{
    setSortItems(Products)
    }
  }, [sortItems, Products, itemsToSort])

  return (
    <div id='top' className="relative pt-24 bg-gray-50">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        
        {/* Left Sidebar */}
        <div className="hidden md:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto space-y-4">
          {/* Categories */}
          <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-sm font-bold mb-2 text-green-700">Categories</h3>
            <ul className="text-sm space-y-1">
              <li className="hover:text-green-600 cursor-pointer">
                <button onClick={()=>handleItemToSort('fashion')}>Fashion</button></li>
              <li className="hover:text-green-600 cursor-pointer">Electronics</li>
              <li className="hover:text-green-600 cursor-pointer">Beauty</li>
              <li className="hover:text-green-600 cursor-pointer">Home Items</li>
              <li className="hover:text-green-600 cursor-pointer">Groceries</li>
            </ul>
          </div>

          {/* Deals */}
          <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-sm font-bold text-red-600 mb-2">🔥 Hot Deals</h3>
            <p className="text-xs text-gray-600">Get 50% off selected items this week only!</p>
          </div>

            {/* Promo Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-400 p-4 rounded-xl shadow-md text-white text-sm">
            <h4 className="font-bold">📦 Free Delivery</h4>
            <p>On orders above ₦10,000</p>
          </div>

           <PurchaseAlert />
        </div>

        {/* Main Content (Supermarket) */}
        <div className="col-span-1 md:col-span-2">
           <HotProductFlash />
          <div className="">
            <HotMobilePreview />
          </div>

          <ProductDetails productArray={sortItems} text='Fresh from farms' />

         
        </div>

        {/* Right Sidebar */}
        <div className="hidden md:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto space-y-4">
          {/* Featured */}
          <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-sm font-bold text-green-700 mb-2">Featured</h3>
            <Featured />
          </div>

        
        </div>
      </div>

      <CookiePolicy />
    </div>
  );
}
