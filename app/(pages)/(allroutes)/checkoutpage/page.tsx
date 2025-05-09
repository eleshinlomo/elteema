'use client'

import { useContext, useState, useEffect } from 'react'
import { GeneralContext } from '../../../../contextProviders/GeneralProvider'
import SigninPage from '../authpages/signin/page'
import { capitalize, totalPriceForCustomer } from '../../../../components/utils'
import { CartContext } from '../../../../contextProviders/cartcontext'
import { UserProps } from '../../../../components/data/userdata'
import PaymentAlertCard from './paymentAlertCard'

const CheckoutPage = () => {
  const generalContext = useContext(GeneralContext)
  const { isLoggedIn, user } = generalContext
  const cartcontext = useContext(CartContext)
  const { cart }: any = cartcontext
  const [payBtnText, setPayBtnText] = useState('Proceed to Payment')
  const [eta, setEta] = useState('')
  const [customerStateOfResidence, setCustomerStateOfResidence] = useState('')
  const [message, setMessage] = useState('')
  const [openWarning, setOpenWarning] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      setCustomerStateOfResidence(user.state)
    }
  }, [user])

  const linkToUpdateProfile = (
    <div className="animate-pulse hover:animate-none">
      <a href={`dashboard/` + user?.type}>
        <button className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg px-6 py-3 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
          Complete Your Profile Information
        </button>
      </a>
    </div>
  )

  const handlePayment = () => {
    if (!cart || cart.length === 0) {
      setMessage('Your cart is empty')
      setOpenWarning(true)
      return
    }
    if (!user.address) {
      setMessage('Please update your address')
      setOpenWarning(true)
      return
    }
    if (!user.phone) {
      setMessage('Please enter phone number')
      setOpenWarning(true)
      return
    }
    if (!user.state) {
      setMessage('Please enter your current state of residence')
      setOpenWarning(true)
      return
    }
    setMessage('The payment feature is underway')
    return
  }

  useEffect(() => {
    const findEta = () => {
      if (!user) return
      if (customerStateOfResidence === 'Lagos State') {
        setEta('3 days')
      } else if (customerStateOfResidence === 'Outside Nigeria') {
        setEta('3 months')
      } else if (!customerStateOfResidence || customerStateOfResidence === '') {
        setEta('Please update state of residence so we can calculate your ETA')
      } else {
        setEta('2 weeks')
      }
    }
    findEta()
  }, [customerStateOfResidence])

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {user && isLoggedIn ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Hi {capitalize(user.username)}!
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              Review your order before payment
            </p>
            <a href="/allstorespage">
              <button className="mt-6 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Continue shopping
              </button>
            </a>
            
            <div className="mt-10 bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold text-gray-700">Shipping to:</span>
                  <span className="text-gray-900">{user.name ? user.name : linkToUpdateProfile}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold text-gray-700">Address:</span>
                  <span className="text-gray-900 text-right">{user.address ? user.address : linkToUpdateProfile}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold text-gray-700">Phone number:</span>
                  <span className="text-gray-900">{user.phone ? user.phone : linkToUpdateProfile}</span>
                </div>
                <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg border border-green-200">
                  <p className="font-bold text-gray-800">
                    <span className="text-green-700">Estimated delivery time (ETA):</span> {eta}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Your Order</h2>
              {message && <p className="text-center text-sm text-gray-600 mt-2">{message}</p>}
            </div>
            
            {cart && cart.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {cart.map((item: any, index: number) => (
                  <li key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {capitalize(item.name)}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <p className="text-lg font-semibold text-green-600">
                          N{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-900">N{totalPriceForCustomer(cart).toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center py-4">
                <p className="font-semibold text-gray-900">Total</p>
                <p className="text-xl font-bold text-green-600">N{totalPriceForCustomer(cart).toFixed(2)}</p>
              </div>
              
              <PaymentAlertCard 
                message={message} 
                submit={handlePayment} 
                openWarning={openWarning} 
                setOpenWarning={setOpenWarning} 
              />
            </div>
          </div>
        </div>
      ) : (
        <SigninPage />
      )}
    </div>
  )
}

export default CheckoutPage