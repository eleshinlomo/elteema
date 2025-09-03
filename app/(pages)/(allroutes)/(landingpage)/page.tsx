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
import OtherProducts from '../../../../components/product/others';
import FruitProducts from '../../../../components/product/fruits';
import FoodStuff from '../../../../components/product/foodStuff';
import Hero from '../../../../components/hero';
import Clothing from '../../../../components/product/clothing';
import Chatbot from '../../../../components/chatbot';


export default function Home() {
  const { page, setPage, showSearchPage, setShowSearchPage } = useContext(GeneralContext);
  const path = usePathname();
  const {Products} = useContext(ProductContext)
  const [itemsToSort, setItemsToSort] = useState<ProductProps[]>([])
  const [sortItems, setSortItems] = useState<ProductProps[]>([])


  return (
    <div id='top' className=" py-[60px]  ">
          {/* <HotProductFlash /> */}
          <Hero />
        {/* Main Content (Supermarket) */}
        
           

          
            <HotMobilePreview />
            {/* <ProductSuggestionWidget /> */}
          
          {/* <FabricProducts /> */}
          <FoodStuff />
          {/* <VegetableProducts /> */}
          {/* <Clothing />  */}
          {/* <FruitProducts />  */}
         



      <CookiePolicy />
    </div>
  );
}
