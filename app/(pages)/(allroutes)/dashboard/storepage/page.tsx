'use client'

import SalesChart from './(storecomponents)/salesChart';
import OrderStatusCards from './(storecomponents)/orderStatusCards';
import RecentOrders from './(storecomponents)/recentOrders';
import TopProducts from './(storecomponents)/storeProducts';
import StoreInfo from './(storecomponents)/storeInfo';
import SalesSummary from './(storecomponents)/salesSummary';
import { useContext } from 'react';
import { GeneralContext } from '../../../../../contextProviders/GeneralProvider';
import { capitalize } from '../../../../../components/utils';


const StorePage = () => {

  const {user} = useContext(GeneralContext)

  if(!user.store){
    return <div className='mt-16 p-4 text-2xl text-center bg-green-600 rounded-2xl text-white'>You have not created a store</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-4 pt-16">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{user?.store ? capitalize(user.store.name) : null} Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
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
          <SalesSummary />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
};

export default StorePage;