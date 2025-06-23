'use client';
import { useContext, useEffect, useState } from 'react';
import { FiShoppingBag, FiStar, FiUser, FiDollarSign } from 'react-icons/fi';
import { GeneralContext } from '../../../../../../contextProviders/GeneralProvider';
import { capitalize } from '../../../../../../components/utils';

const StoreInfo = () => {
  const {user} = useContext(GeneralContext)
  const [storeName, setStoreName] = useState('')

  useEffect(()=>{
   if(user){
    setStoreName(user?.store.storeName)
   }
  }, [user])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <FiShoppingBag className="text-blue-500 text-xl" />
        </div>
        <div>
          <span className='flex gap-3'><h2 className="text-xl font-semibold text-gray-800">{capitalize(storeName)}
            <span className='text-xs'>({user.store?.items?.length || 0} {user.store?.items?.length <= 1 ? 'Item' : 'Items'}) </span>
          </h2>
            <a href='/dashboard/createstorepage'><button
            className={`text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white`}>
              Edit store
            </button>
            </a>
          </span>
          <p className="text-gray-500 text-sm">{capitalize(user?.store?.tagline)}</p>
        </div>
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
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FiDollarSign className="text-green-500 mr-2" />
            <span className="text-gray-600">Avg. Order</span>
          </div>
          <span className="font-medium">N0</span>
        </div>
      </div>

      <a href='/dashboard/addproductpage'>
      <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200">
        Add New Item
      </button>
      </a>
      
     
    </div>
  );
};

export default StoreInfo;