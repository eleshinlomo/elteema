'use client'
import { useState, FormEvent, useEffect, useContext} from 'react';
import { GeneralContext } from '../../../../../contextProviders/GeneralProvider';
import { updateUser, UserProps } from '../../../../../components/data/userdata';
import { BotIcon, Edit, File, FolderClosed, InfoIcon, ShieldClose } from 'lucide-react';
import { cities, states } from '../../../../../components/data/locations';
import { capitalize } from '../../../../../components/utils';


const CustomerDashboard = () => {
 
  
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
    const payload = {
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

    
    const response = await fetch(`${BASE_URL}/users/updateuser`, {
      mode: 'cors',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    })
    if(!response) {
      console.log('No response from server')
      setError('No response from server')
    }

    const data = await response.json()
    if(data.ok){
      console.log('Updated User', data)
      const newUser = data.data
      const updatedUser = {...newUser, cart: user.cart} //Making sure we retain the old user cart
      updateUser(updatedUser)
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
    <div className=" bg-gray-50 px-6 pt-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  <li>
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
                      {user?.store?.name ? 'View Store' : 'Create Store'}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">{error || 'Profile Information'}</h2>
                <button className="text-emerald-600 hover:text-emerald-800" onClick={()=>setIsEditing(!isEditing)}>
                  {isEditing ?<ShieldClose className='w-6 h-6' /> : <Edit />}
                </button>
              </div>
              
              <form onSubmit={(e)=>handleUpdateUser(e)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Firstname</label>
                    <input
                      type="text"
                      name="firstname"
                      value={isEditing ? firstname : user?.firstname}
                      onChange={(e)=>setFirstname(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lastname</label>
                    <input
                      type="text"
                      name="Lastname"
                      value={isEditing ? lastname : user?.lastname}
                      onChange={(e)=>setLastname(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                    />
                  </div>
                  
                  <div>
                    <span className='flex gap-2'>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <p className='text-sm text-green'>{isEditing ? 'Contact us to change email' : null}</p>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={user.email ? user?.email : null}
                      onChange={(e)=>setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500
                       focus:border-emerald-500 transition"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={isEditing ? phone : user?.phone}
                      onChange={(e)=>setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                    />
                  </div>

            
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={gender}
                      onChange={(e)=>setGender(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                    >
                      <option>Select gender</option>
                     <option value='male'>Male</option>
                     <option value='female'>Female</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={isEditing ? address : user?.address}
                      onChange={(e)=>setAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                    />
                  </div>

                 

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                      name="city"
                      value={city}
                      onChange={(e)=>setCity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                    >
                      <option>Select a city</option>
                     {cities?.map((cityOption, index)=><option key={index} value={cityOption}>{cityOption}</option>)}
                    </select>
                  </div>

                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <select
                      name="state"
                      value={state}
                      onChange={(e)=>setState(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                    >
                      <option>Select a state</option>
                     {states?.map((stateOption, index)=><option key={index} value={stateOption}>{stateOption}</option>)}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={isNewsletter ||  user?.isNewsletter}
                        onChange={(e)=>setIsNewsLetter(!isNewsletter)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700">
                        Subscribe to our newsletter
                      </label>
                    </div>
                  </div>
                </div>
                {/* Error */}
                <p className='text-red-500 text-sm'>{error}</p>

                {isEditing ?
                 <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
                  >
                    Save Changes
                  </button>
                </div>: null}
              </form>
            </div>
            
          
            
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

export default CustomerDashboard;