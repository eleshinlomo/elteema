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
import { deleteStore } from '../../../../../components/api/store';
import { updateLocalUser } from '../../../../../components/utils';



const StorePage = () => {

  const {user, setUser} = useContext(GeneralContext)
  const [lastOrders, setLastOrders] = useState<any[]>([])
  const [currentOrders, setCurrentOrders] = useState<any[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('Once you delete your store, there is no going back. Please be certain.')
  const [isDeleted, setIsDeleted] = useState(false)
  
  
  const handleDeleteStore = async (userId: string) => {
     
      const response = await deleteStore(userId)
        if(response.ok){
            const updatedUser = response.data
            setMessage(response.message)
            setIsDeleteModalOpen(false);
            setUser(updatedUser)
            updateLocalUser(updatedUser)
            setIsDeleted(true)

          }else{
            setIsDeleteModalOpen(false)
            setErrorMessage(`${response.error}`)
          }
        
          
        };


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
    <div className="min-h-screen bg-gray-50  px-2">
      <header className="mb-2">
        <h3 className="text-xl font-bold text-gray-800">Welcome back <span className='font-extrabold'>
          {capitalize(user?.username)}</span>! Here&apos;s what&apos;s happening with your store today.
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
        <RecentStoreOrders  />


                 <div >
             

            {/* Delete Account Card */}
            { isDeleted ? <p className="text-gray-600">message</p>:
              <div className="bg-white rounded-lg shadow-md p-6 border border-red-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Delete Store</h2>
              <p className="text-red-600 mb-6">{errorMessage}</p>
              
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              >
                Delete Store
              </button>
            </div>
            }


             {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Are you sure you want to delete your store?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone. All your store data will be permanently removed from our servers.</p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 
                
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
              >
                Cancel
              </button>
              <button
                onClick={()=>handleDeleteStore(user._id)}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700
                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              >
                Yes, delete my store
              </button>
            </div>
          </div>
        </div>
      )}
            </div>
  
    </div>
  );
};

export default StorePage;