'use client';
import { useContext, useEffect, useState } from 'react';
import { FiShoppingBag, FiStar, FiUser, FiDollarSign } from 'react-icons/fi';
import { GeneralContext } from '../../../../../../contextProviders/GeneralProvider';
import { capitalize, formatCurrency } from '../../../../../../components/utils';
import { StoreProps } from '../../../../../../components/api/store';

const StoreInfo = () => {
  const {user} = useContext(GeneralContext)
  const [storeName, setStoreName] = useState('')
  const [store, setStore] = useState<StoreProps | null | any>(null)
  const [withdrawMessage, setWithdrawMessage] = useState('')
   const storeAddress = store ? `${store.address}, ${capitalize(store.city)}, ${capitalize(store.state)}, ${store.country}` : ''

  useEffect(()=>{
   if(user && user.store){
    setStore(user.store)
   }
  }, [user])

  const handleWithdrawal = ()=>{
    setWithdrawMessage('')
    if(store && store.income === 0 || store.income < 100){
      setWithdrawMessage('You need to earn more than 100 naira to withdraw')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <FiShoppingBag className="text-blue-500 text-xl" />
        </div>
        <div>
          <span className='flex gap-3'><h2 className="text-xl font-semibold text-gray-800">{capitalize(store?.storeName)}
            <span className='text-xs'>({store?.items?.length || 0} {store?.items?.length <= 1 ? 'Item' : 'Items'}) </span>
          </h2>
            <a href='/dashboard/updatestorepage'><button
            className={`text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white`}>
              Edit store
            </button>
            </a>
          </span>
          <p className="text-gray-500 text-sm">{capitalize(store?.tagline)}</p>
        </div>
      </div>
      
      {/* Income and withdraw section */}
      <div className='flex flex-col gap-1 py-4'>
        <p className='text-xs text-red-500 font-bold'>{withdrawMessage}</p>
        <div className=''>Earned Income: <span className='text-xl text-green-600'>{formatCurrency('NGN', store?.income)}</span></div> 
        <button
            className={`w-full text-xs py-2 px-2 rounded bg-green-600 hover:bg-green-700 text-white`}
            onClick={handleWithdrawal}
            >
              Withdraw
          </button>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FiStar className="text-yellow-500 mr-2" />
            <span className="text-gray-600">Rating</span>
          </div>
          <span className="font-medium">5.0/5.0</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FiUser className="text-blue-500 mr-2" />
            <span className="text-gray-600">Customers</span>
          </div>
          <span className="font-medium">0</span>
        </div>
        
        <div className="flex justify-between items-center pb-3">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">₦</span>
            <span className="text-gray-600">Avg. Order</span>
          </div>
          <span className="font-medium">₦0</span>
        </div>
           
      </div>
      
            <div className="flex my-3 text-gray-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{storeAddress}</span>
            </div>
      
      <a className=' text-blue-700 px-1' href={`/storefront/${store?.storeName}`}>Visit storefront</a>
      <a href='/dashboard/addproductpage'>
      <button className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200">
        Add New Item
      </button>
      </a>
      
     
    </div>
  );
};

export default StoreInfo;