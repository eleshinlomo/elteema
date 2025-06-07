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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault()
    try{
    const payload: any = {
      id: user.id,
      username: user.username,
      firstname,
      lastname,
      email,
      phone,
      address,
      gender,
      city,
      state
    }

    

    const data = await updateUser(payload)
    if(data.ok){
      console.log('Updated User', data)
      const newUser = data.data
      const updatedUser = {...newUser, cart: user.cart} //Making sure we retain the old user cart
      updateLocalUser(updatedUser)
      setUser(data.data)
       setIsEditing(false)
    }else{
      console.log(data.error)
      setError('Unable to update at the moment.')
    }
    return
  }catch(err){
    setError('Something went wrong!')
    console.log(err)
  }
  };

  useEffect(()=>{
    if(user){
    setFirstname(user.firstname || '');
    setLastname(user.lastname || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
    setAddress(user.address || '');
    setCity(user.city || '');
    setState(user.state || '');
    setGender(user.gender || '');
    setIsNewsLetter(user.isNewsletter || false)
    }
  }, [user])

  const handleDeleteAccount = () => {
    // Handle account deletion
    // alert('Account deleted successfully!');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className=" bg-gray-50 px-6 pt-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>
        
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
                
                  <li>
                    <a href="#" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Payment Methods
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Order History
                    </a>
                  </li>
                    <li>
                    <a href="#" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {user?.store?.name ? <a href='/dashboard/storepage'>View Store</a> : <a href='/dashboard/createstorepage'>Create Store</a>}
                    </a>
                  </li>

                   <li>
                    <a href="/dashboard/userpage/usersettings" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Settings
                    </a>
                  </li>
                  <li>
                    {/* Delete Account Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-red-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Delete Account</h2>
              <p className="text-gray-600 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
              
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              >
                Delete Account
              </button>
            </div>
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
      
      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Are you sure you want to delete your account?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone. All your data will be permanently removed from our servers.</p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 
                
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700
                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              >
                Yes, delete my account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashSideBar;