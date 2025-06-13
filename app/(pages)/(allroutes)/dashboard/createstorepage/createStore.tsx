'use client'
import { useState, FormEvent, useContext, ChangeEvent } from "react"
import { createStore } from "./storeFunctions"
import { GeneralContext } from "../../../../../contextProviders/GeneralProvider"
import { useRouter } from "next/navigation"
import { updateLocalUser } from "../../../../../components/data/userdata"

const CreateStore = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const {user, setUser}= useContext(GeneralContext)

  const [formData, setFormData] = useState({
    userId: user.id,
    name: '',
    tagline: user?.store?.name || '',
    logo: '',
    phone: '',
    email: '',
    city: '',
    state: ''
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await createStore(formData)
      console.log(response)
      if(response.ok){
        setSuccess(response.message)
        const updatedUser = response.data
        updateLocalUser(updatedUser)
        setUser(updatedUser)
        setFormData({
          userId: user.id,
          tagline: '',
          name: '',
          logo: '',
          phone: '',
          email: '',
          city: '',
          state: ''
        })
        window.location.href='#create-store-bottom'
      } else {
        console.log(response)
        setError(response.error)
      }
    } catch (err) {
      setError('Failed to create store. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Updated to handle both input and select elements
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 " id='create-store-bottom'>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        {!success && <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Create your store and start selling</h2>
          <p className="mt-2 text-sm text-gray-600">Fill in your store details below</p>
        </div>
        }

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 mt-32 bg-green-100 text-green-700 rounded-md text-center" >
            <p>{success}</p>
            <a href='/dashboard/storepage' className="text-blue-700">Visit your store</a>
          </div>
        )}

        {!success && 
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter store name"
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
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
              Logo URL
            </label>
            <input
              id="logo"
              name="logo"
              type="text"
              value={formData.logo}
              onChange={handleChange}
              placeholder="Paste logo URL"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
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
              placeholder="Enter store phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
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
              placeholder="Enter store email"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value=''>Select city</option>
              <option value='ikeja'>Ikeja</option>
              <option value='ikorodu'>Ikorodu</option>
            </select>
          </div>

          {/* State */}
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
              <option value='lagos'>Lagos</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {isLoading ? 'Creating...' : 'Create Store'}
            </button>
          </div>
        </form>
        }
      </div>
    </div>
  )
}

export default CreateStore