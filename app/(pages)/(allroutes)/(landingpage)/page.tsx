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
import FabricProducts from '../../../../components/product/fabricProduct';
import VegetableProducts from '../../../../components/product/vegetable';
import ProcessedFoodProducts from '../../../../components/product/processedFoods';
import NewSearch from '../../../../components/product/newSearch';

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
    <div id='top' className=" py-24  bg-gray-50">
   
         <NewSearch />
        {/* Main Content (Supermarket) */}
        <div className="col-span-1 md:col-span-2">
           <HotProductFlash />

          <div className="">
            <HotMobilePreview />
          </div>
          <FabricProducts />
         <VegetableProducts />
         <ProcessedFoodProducts />

         
        </div>


        
        

      <CookiePolicy />
    </div>
  );
}
