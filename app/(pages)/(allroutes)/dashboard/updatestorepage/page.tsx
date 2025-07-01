'use client'

import { useState, useEffect, FormEvent, useContext, ChangeEvent } from "react"
import { GeneralContext } from "../../../../../contextProviders/GeneralProvider"
import { useRouter } from "next/navigation"
import { updateLocalUser } from "../../../../../components/data/userdata"
import { cities, countries, states } from "../../../../../components/data/locations"
import { CreateStoreProps, StoreProps, updateStore } from "../../../../../components/api/store"
import { capitalize } from "../../../../../components/utils"
import { industries } from "../../../../../components/data/industries"

const CreateStorePage = () => {
  const [isLoading, setIsLoading] = useState(false)                          
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const {user, setUser}= useContext(GeneralContext)
  const [isEditing, setIsEditing] = useState(false)
  const [store, setStore] = useState<StoreProps | null>(null)

  const [formData, setFormData] = useState<CreateStoreProps>({
    userId: user.id,
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

  const toggleIsEditing = () => {
    setIsEditing(!isEditing)
    // When canceling edit, reset form data to store values
    if (isEditing && store) {
      setFormData({
        userId: user.id,
        storeName: store.storeName || '',
        tagline: store.tagline || '',
        logo: store.logo || '',
        phone: store.phone || '',
        email: store.email || '',
        industry: store.industry || '',
        address: store.address || '',
        city: store.city || '',
        state: store.state || '',
        country: store.country || ''
      })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await updateStore(formData)
      console.log(response)
      if(response.ok){
        setSuccess(response.message)
        const updatedUser = response.data
        updateLocalUser(updatedUser)
        setUser(updatedUser)
        setIsEditing(false)
        window.location.href='#create-store-top'
      } else {
        console.log(response)
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    if(user && user.store){
      setStore(user.store)
      setFormData({
        userId: user.id,
        storeName: user.store.storeName || '',
        tagline: user.store.tagline || '',
        logo: user.store.logo || '',
        phone: user.store.phone || '',
        email: user.store.email || '',
        industry: user.store.industry || '',
        address: user.store.address || '',
        city: user.store.city || '',
        state: user.store.state || '',
        country: user.store.country || ''
      })
    }
  }, [user])

  return (
    <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 mb-24" id='create-store-top'>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        {!success && (
          <div className="text-center mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Update your store and start selling</h2>
                <p className="mt-2 text-sm text-gray-600">Fill in your store details below</p>
              </div>
              {store && (
                <button
                  type="button"
                  onClick={toggleIsEditing}
                  className={`px-4 py-2 rounded-md ${isEditing ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} text-sm font-medium`}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              )}
            </div>
          </div>
        )}

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
              disabled={!isEditing}
              placeholder="Enter your store name or your artist name"
              className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
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
              value={formData.tagline}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter store name i.e meal focus delivers the best food..."
              className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter store phone"
              className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter store email"
              className={`mt-1 block w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
            />
          </div>

             {/* Product/Services */}
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

            {/* Address */}
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
           
           {/* City */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Which city is your store located?</label>
            <select
              value={formData.city}
              name='city'
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            >
              <option value=''>Select city</option>
              {cities?.map((city, index) => (
                <option key={index} value={city}>{capitalize(city)}</option>
              ))}
            </select>
          </div>
          
          {/* State */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Which state is your store located?</label>
            <select
              value={formData.state}
              name='state'
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            >
              <option value=''>Select state</option>
              {states?.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>

             {/* Country */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Which country is your store located?</label>
            <select
              value={formData.country}
              name='country'
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            >
              <option value=''>Select country</option>
              {countries?.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {isEditing && (
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {isLoading ? 'Updating...' : 'Update Store'}
              </button>
            </div>
          )}
        </form>
        }
      </div>
    </div>
  )
}

export default CreateStorePage