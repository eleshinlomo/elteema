'use client'
import { useState, FormEvent, useEffect, useContext} from 'react';
import { GeneralContext } from '../../../../contextProviders/GeneralProvider';
import { updateLocalUser, UserProps } from '../../../../components/data/userdata';
import { BotIcon, Edit, File, FolderClosed, InfoIcon, ShieldClose } from 'lucide-react';
import { cities, states } from '../../../../components/data/locations';
import { capitalize } from '../../../../components/utils';
import { updateUser } from '../../../../components/api/users';


const DashSideBar = () => {
 
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isNewsletter, setIsNewsLetter] = useState(true)
  const generalContext = useContext(GeneralContext)
  const {user, setUser} = generalContext
  
  


  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, type, checked, value } = e.target;
  //   setUser((prev: UserProps) => ({
  //     ...prev,
  //     [name]: type === 'checkbox' ? checked : value
  //   }));
  // };
  
   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  


  return (
    <div className="  px-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-8">Account Settings</h1>
        
        <div className="">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
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
                  <li className='flex gap-2'>
                    <a href="#" className="flex items-center p-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile Information
                    </a>

                      
                  </li>

                     <li className='flex gap-2'>
                    <a href="/dashboard/orderpage" className="flex items-center p-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Orders
                    </a>
                  </li>
                
                  <li>
                    <a href="/dashboard/paymentmethodspage" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Payment Methods
                    </a>
                  </li>
              
                    <li>
                    <a href={user?.store?.name ? '/dashboard/storepage'  : '/dashboard/createstorepage'}
                     className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg> 
                        {user?.store?.name ? 'View Store'  : 'Create Store'}
                    </a>
                    
                  </li>

                   <li>
                    <a href="/dashboard/settingspage" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Settings
                    </a>
                  </li>
                 

                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          
          <div className="lg:col-span-2 space-y-8">
            
            
        
            
          </div>
        </div>
      </div>
      
     
    </div>
  );
};

export default DashSideBar;