'use client';
import { useState, FormEvent, useEffect, useContext} from 'react';
import { GeneralContext } from '../../../../../contextProviders/GeneralProvider';
import { updateLocalUser, UserProps } from '../../../../../components/data/userdata';
import { BotIcon, Edit, File, FolderClosed, InfoIcon, ShieldClose } from 'lucide-react';
import { cities, states } from '../../../../../components/data/locations';
import { capitalize } from '../../../../../components/utils';
import { updateUser } from '../../../../../components/api/users';
import DashSideBar from '../dashSidebar';
import Cart from '../../../../../components/cart/cart';

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
        const newUser = data.data
        const updatedUser = {...newUser, ...user.cart, cart: user.cart} //Making sure we retain the old user cart
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
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 pt-16 pb-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Uncomment if needed */}
          {/* <div className="lg:w-1/4">
            <DashSideBar />
          </div> */}
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Information Card */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full">
              {/* Profile Information */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">{error || 'Profile Information'}</h2>
                  <button 
                    className="text-emerald-600 hover:text-emerald-800" 
                    onClick={()=>setIsEditing(!isEditing)}
                  >
                    {isEditing ? <ShieldClose className='w-6 h-6' /> : <Edit />}
                  </button>
                </div>

                <div className='flex gap-3 my-4'>
                  <a href='/checkoutpage'>
                    <button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white'>
                      Continue checkout
                    </button>
                  </a>
                  <a href='/'>
                    <button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white '>
                      Continue shopping
                    </button>
                  </a>
                </div>
              </div>
              
              <form onSubmit={handleUpdateUser} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Firstname</label>
                    <input
                      type="text"
                      name="firstname"
                      value={isEditing ? firstname : user?.firstname}
                      onChange={(e)=>setFirstname(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lastname</label>
                    <input
                      type="text"
                      name="Lastname"
                      value={isEditing ? lastname : user?.lastname}
                      onChange={(e)=>setLastname(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="w-full">
                    <span className='flex gap-2'>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <p className='text-sm text-green'>{isEditing ? 'Contact us to change email' : null}</p>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={user?.email || ''}
                      onChange={(e)=>setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500
                       focus:border-emerald-500 transition"
                      disabled
                    />
                  </div>
                  
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={isEditing ? phone : user?.phone}
                      onChange={(e)=>setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={gender}
                      onChange={(e)=>setGender(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                    >
                      <option>Select gender</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                    </select>
                  </div>
                  
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={isEditing ? address : user?.address}
                      onChange={(e)=>setAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                      name="city"
                      value={city}
                      onChange={(e)=>setCity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                    >
                      <option>Select a city</option>
                      {cities?.map((cityOption, index)=><option key={index} value={cityOption}>{cityOption}</option>)}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <select
                      name="state"
                      value={state}
                      onChange={(e)=>setState(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                    >
                      <option>Select a state</option>
                      {states?.map((stateOption, index)=><option key={index} value={stateOption}>{stateOption}</option>)}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2 w-full">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={isNewsletter || user?.isNewsletter}
                        onChange={(e)=>setIsNewsLetter(!isNewsletter)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        disabled={!isEditing}
                      />
                      <label className="ml-2 block text-sm text-gray-700">
                        Subscribe to our newsletter
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Error */}
                <p className='text-red-500 text-sm mt-4'>{error}</p>

                {isEditing &&
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;