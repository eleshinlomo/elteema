'use client'
import { useState, useEffect, FormEvent, useContext, ChangeEvent } from "react"
import { GeneralContext } from "../../../../../../contextProviders/GeneralProvider"
import { updateLocalUser } from "../../../../../../components/utils"
import { countries } from "../../../../../../components/data/locations"
import { createStore, CreateStoreProps } from "../../../../../../components/api/store"
import { capitalize } from "../../../../../../components/utils"
import { industries } from "../../../../../../components/data/industries"

const CreateStorePage = () => {
  const [isLoading, setIsLoading] = useState(false)                          
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const {user, setUser} = useContext(GeneralContext)
  const [availableStates, setAvailableStates] = useState<Array<{name: string, cities: string[], country: string}>>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])


    if(user?.store){
    window.location.href = '/dashboard/storepage'
  }


  const [formData, setFormData] = useState<CreateStoreProps>({
    userId: user?._id,
    bankAccountName: '',
    bankAccountNumber: '',
    bvn: '',
    storeName: '',
    tagline: '',
    logo: '',
    phone: '',
    email: '',
    industry: '',
    address: '',
    city: '',
    state: '',
    country: ''
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await createStore(formData)
      if(response.ok){
        setSuccess(response.message)
        const updatedUser = response.data
        updateLocalUser(updatedUser)
        setUser(updatedUser)
        setFormData({
          userId: user?._id,
          bankAccountName: '',
          bankAccountNumber: '',
          bvn: '',
          tagline: '',
          storeName: '',
          logo: '',
          phone: '',
          email: '',
          industry: '',
          address: '',
          city: '',
          state: '',
          country: ''
        })
        window.location.href='#create-store-top'
      } else {
        setError(response.error)
        window.location.href='#create-store-top'
      }
    } catch (err) {
      setError('Failed to create store. Please try again.')
      console.error(err)
      window.location.href='#create-store-top'
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'country') {
      // Find the selected country
      const selectedCountry = countries.find(c => c.name === value)
      
      // Set available states for the selected country
      const statesForCountry = selectedCountry ? selectedCountry.state : []
      setAvailableStates(statesForCountry)
      setAvailableCities([])
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        state: '', // Reset state when country changes
        city: '' // Reset city when country changes
      }))
    } else if (name === 'state') {
      // Find the selected state
      const selectedState = availableStates.find(s => s.name === value)
      
      // Set available cities for the selected state
      const citiesForState = selectedState ? selectedState.cities : []
      setAvailableCities(citiesForState)
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        city: '' // Reset city when state changes
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 mb-24" id='create-store-top'>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        {!success && <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Create your store and start selling</h2>
          <p className="mt-2 text-sm text-gray-600">Fill in your store details below</p>
        </div>}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 mt-32 bg-green-100 text-green-700 rounded-md text-center py-4">
            <p>{success}</p>
            <a href='/dashboard/storepage' className="text-green-900 font-extrabold">Visit your store</a>
          </div>
        )}

        {!success && 
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              id="storeName"
              name="storeName"
              type="text"
              required
              value={formData.storeName}
              onChange={handleChange}
              placeholder="Enter your store name or your artist name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">
              Store Tagline
            </label>
            <input
              id="tagline"
              name="tagline"
              type="text"
              required
              value={formData.tagline.toLowerCase()}
              onChange={handleChange}
              placeholder="Enter store name i.e meal focus delivers the best food..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number (will be shown publicly)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter store phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address (not shown publicly)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter store email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">What do you or your business do?</label>
            <select
              value={formData.industry}
              name='industry'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value=''>Select Industry</option>
              {industries?.map((industry, index)=><option value={industry} key={index}>{capitalize(industry)}</option>)}
            </select>
          </div>
            
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Store Address
            </label>
            <input
              id="address"
              name="address"
              type="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter store address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Which Country is your store located?</label>
            <select
              value={formData.country}
              name='country'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value=''>Select country</option>
              {countries.map((country, index) => (
                <option value={country.name} key={index}>{country.name}</option>
              ))}
            </select>
          </div>

          {/* State - only shown when a country is selected */}
          {formData.country && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Which state is your store located?</label>
              <select
                value={formData.state}
                name='state'
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value=''>Select state</option>
                {availableStates.map((state, index) => (
                  <option value={state.name} key={index}>{state.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* City - only shown when a state is selected */}
          {formData.state && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Which city is your store located?</label>
              <select
                value={formData.city}
                name='city'
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value=''>Select city</option>
                {availableCities.map((city, index) => (
                  <option value={city} key={index}>{capitalize(city)}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {isLoading ? 'Creating...' : 'Create Store'}
            </button>
          </div>
        </form>}
      </div>
    </div>
  )
}

export default CreateStorePage