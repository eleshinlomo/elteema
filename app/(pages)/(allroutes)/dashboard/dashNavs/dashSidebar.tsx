'use client';

import { capitalize } from '../../../../../components/utils';
import { UserProps } from "../../../../../components/api/users";
import { ProductProps } from '../../../../../components/api/product';
import { StoreIcon } from 'lucide-react';

interface DashSideBarProps {
  user: UserProps;
  userOders: ProductProps[]
}

const DashSideBar = ({user, userOders}: DashSideBarProps) => {
  return (
    <div className="w-full h-full p-4 bg-white border-r border-gray-200">
      <div className="sticky top-0 pt-6">
        <h1 className="text-xl font-bold text-gray-800 mb-8 px-2">Account Settings</h1>
        
        <div className="bg-white rounded-lg p-4">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl text-emerald-600 font-bold">
                {user && user?.username?.charAt(0)}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Hi {capitalize(user?.username) || ''}</h2>
            <p className="text-gray-500">{user?.email || ''}</p>
          </div>
          
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center p-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile Information
                </a>
              </li>
              
              <li>
                <a href="/dashboard/orders/userorderpage" className="flex items-center p-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
                  <StoreIcon className='w-5 h-5 mr-3' />
                  Orders
                  <span className="ml-2">({userOders?.length || 0})</span>
                </a>
              </li>
              
              <li>
                <a href="/dashboard/paymentmethodspage" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Methods
                </a>
              </li>
              
              <li>
                <a href={user?.store?.storeName ? '/dashboard/storepage' : '/dashboard/createstorepage'}
                  className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg> 
                  {user?.store?.storeName ? `View Store (${user?.store?.items?.length || 0})` : 'Create Store'}
                </a>
              </li>

              <li>
                <a href="/dashboard/settingspage" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashSideBar;