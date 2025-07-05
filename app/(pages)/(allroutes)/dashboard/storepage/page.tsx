'use client'

import SalesChart from './(storecomponents)/salesChart';
import OrderStatusCards from './(storecomponents)/storeOrders/orderStatusCards';
import StoreInfo from './(storecomponents)/storeInfo';
import SalesSummary from './(storecomponents)/salesSummary';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../../../../contextProviders/GeneralProvider';
import { capitalize } from '../../../../../components/utils';
import StoreProducts from './(storecomponents)/storeProducts';
import RecentStoreOrders from './(storecomponents)/storeOrders/recentOrders';



const StorePage = () => {

  const {user} = useContext(GeneralContext)
  const [lastOrders, setLastOrders] = useState<any[]>([])
  const [currentOrders, setCurrentOrders] = useState<any[]>([])


  useEffect(()=>{
    if(user?.store){
      setLastOrders(user?.store?.orders.lastOrders)
      setCurrentOrders(user?.store?.orders.currentOrders)
    }
  }, [user])

    if(!user.store){
    return <div className='mt-16 p-4 text-2xl text-center bg-green-600 rounded-2xl text-white'>You have not created a store</div>
  }


  return (
    <div className="min-h-screen bg-gray-50 pb-4 pt-16 px-4">
      <header className="mb-2">
        <h3 className="text-xl font-bold text-gray-800">Welcome back <span className='font-extrabold'>{capitalize(user?.username)}</span>! Here&apos;s what&apos;s happening with your store today.
        </h3>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        <div className="lg:col-span-2">
          <OrderStatusCards />
        </div>
        <div className="lg:col-span-1">
          <StoreInfo />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="lg:col-span-1">
          <SalesSummary lastOrders={lastOrders} currentOrders={currentOrders} />
        </div>
      </div>
        <StoreProducts />
        <RecentStoreOrders currentOrders={currentOrders} />
  
    </div>
  );
};

export default StorePage;