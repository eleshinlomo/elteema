'use client'
import {useState, useEffect, useContext} from 'react'
import CookiePolicy from "../../../../components/cookieAcceptPage";
import FeedsPage from '../feedspage/page';
import { GeneralContext } from '../../../../contextProviders/GeneralProvider';
import { usePathname } from 'next/navigation';
import Featured from '../../../../components/product/featured';


export default function Home() {
 
  const {page, setPage, showSearchPage, setShowSearchPage} = useContext(GeneralContext)
  const path = usePathname()

  

  return (
    <div id='top' className="">
      
      <FeedsPage />
      <CookiePolicy />
    </div>
  );
}