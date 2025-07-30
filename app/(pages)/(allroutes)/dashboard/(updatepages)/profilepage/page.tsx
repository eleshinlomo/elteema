'use client';
import { useState, FormEvent, useEffect, useContext, ChangeEvent } from 'react';
import { GeneralContext } from '../../../../../../contextProviders/GeneralProvider';
import { updateLocalUser } from '../../../../../../components/utils';
import { BotIcon, Edit, File, FolderClosed, InfoIcon, ShieldClose } from 'lucide-react';
import { countries } from '../../../../../../components/data/locations';
import { capitalize } from '../../../../../../components/utils';
import { updateUser } from '../../../../../../components/api/users';
import DashSideBar from '../../dashNavs/dashSidebar';
import Cart from '../../../../../../components/cart/cart';

const CustomerDashboard = () => {
  const [error, setError] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isNewsletter, setIsNewsLetter] = useState(true);
  const [availableStates, setAvailableStates] = useState<Array<{name: string, cities: string[], country: string}>>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const generalContext = useContext(GeneralContext);
  const {user, setUser} = generalContext;

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const payload: any = {
        userId: user._id,
        firstname,
        lastname,
        email,
        phone,
        address,
        gender,
        city,
        state,
        country,
        isNewsletter,
        cart: user.cart,
        username: user.username
      };

    

      const data = await updateUser(payload);
      
      if(data.ok){
        const updatedUser = {
          ...data.data,
          cart: user.cart,
          isNewsletter: isNewsletter
        };
        
        updateLocalUser(updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        console.error('Update error:', data.error);
        setError(data.error || 'Unable to update profile. Please try again.');
      }
    } catch(err) {
      console.error('Submission error:', err);
      setError('Failed to update profile. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'country') {
      const selectedCountry = countries.find(c => c.name === value);
      const statesForCountry = selectedCountry ? selectedCountry.state : [];
      
      setAvailableStates(statesForCountry);
      setAvailableCities([]);
      setCountry(value);
      setState('');
      setCity('');
    } else if (name === 'state') {
      const selectedState = availableStates.find(s => s.name === value);
      const citiesForState = selectedState ? selectedState.cities : [];
      
      setAvailableCities(citiesForState);
      setState(value);
      setCity('');
    } else if (name === 'city') {
      setCity(value);
    }
  };

  useEffect(() => {
    if(user){
      setFirstname(user.firstname || '');
      setLastname(user.lastname || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setCity(user.city || '');
      setState(user.state || '');
      setCountry(user.country || '');
      setGender(user.gender || '');
      setIsNewsLetter(user.isNewsletter || false);

      // Initialize available states and cities
      if (user.country) {
        const selectedCountry = countries.find(c => c.name === user.country);
        setAvailableStates(selectedCountry ? selectedCountry.state : []);
        
        if (user.state) {
          const selectedState = selectedCountry?.state.find(s => s.name === user.state);
          setAvailableCities(selectedState ? selectedState.cities : []);
        }
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6  pb-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6 w-full">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {error || 'Profile Information'}
                  </h2>
                  <button 
                    className="text-emerald-600 hover:text-emerald-800" 
                    onClick={() => setIsEditing(!isEditing)}
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
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lastname</label>
                    <input
                      type="text"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  
                  <div className="w-full">
                    <span className='flex gap-2'>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <p className='text-sm text-green-600'>{isEditing ? 'Contact us to change email' : null}</p>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500
                       focus:border-emerald-500 transition"
                      disabled
                      required
                    />
                  </div>
                  
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition"
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  {/* Country */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      name="country"
                      value={country}
                      onChange={handleLocationChange}
                      className={`w-full px-4 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition`}
                      disabled={!isEditing}
                      required
                    >
                      <option value="">Select country</option>
                      {countries.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <select
                      name="state"
                      value={state}
                      onChange={handleLocationChange}
                      className={`w-full px-4 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition`}
                      disabled={!isEditing || !country}
                      required
                    >
                      <option value="">Select state</option>
                      {availableStates.map((state) => (
                        <option key={state.name} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                      name="city"
                      value={city}
                      onChange={handleLocationChange}
                      className={`w-full px-4 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-lg focus:ring-2 focus:ring-emerald-500 
                      focus:border-emerald-500 transition`}
                      disabled={!isEditing || !state}
                      required
                    >
                      <option value="">Select city</option>
                      {availableCities.map((city) => (
                        <option key={city} value={city}>
                          {capitalize(city)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2 w-full">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={isNewsletter}
                        onChange={(e) => setIsNewsLetter(e.target.checked)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        disabled={!isEditing}
                      />
                      <label className="ml-2 block text-sm text-gray-700">
                        Subscribe to our newsletter
                      </label>
                    </div>
                  </div>
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm mt-4">
                    {error}
                  </p>
                )}

                {isEditing && (
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition
                      ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;