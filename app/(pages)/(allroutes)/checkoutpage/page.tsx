'use client'

import { useContext, useState, useEffect, useCallback } from 'react'
import { GeneralContext } from '../../../../contextProviders/GeneralProvider'
import SigninPage from '../authpages/signin/page'
import { calculatePercentagePrice, capitalize, formatCurrency, totalPriceForCustomer} from '../../../../components/utils'
import { CartContext } from '../../../../contextProviders/cartcontext'
import { updateLocalUser } from '../../../../components/utils'
import PaymentAlertCard from './paymentAlertCard'
import { launchPaymentPopup,} from './payments/paymentFunctions'
import Image from 'next/image'
import { createUserOrder } from '../../../../components/api/users'

const CheckoutPage = () => {
  const { isLoggedIn, user, setUser } = useContext(GeneralContext)
  const { cart, setCart, setTotalItems, setTotalPrice }: any = useContext(CartContext)
  const [payBtnText, setPayBtnText] = useState('Proceed to Payment')
  const [eta, setEta] = useState('')
  const [customerStateOfResidence, setCustomerStateOfResidence] = useState('')
  const [message, setMessage] = useState('')
  const [openWarning, setOpenWarning] = useState<boolean>(false)
  const [formattedAddress, setFormattedAddress] = useState<any>('')
  const [totalPricePlusTax, setTotalPricePlusTax] = useState(0)
  const [paymentMethodError, setPaymentMethodError] = useState('')
  const [error, setError] = useState('')
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)

  
 const handlePaymentPopUp = async () => {
  if (typeof window !== 'undefined') {
    const { launchPaymentPopup } = await import('./payments/paymentFunctions');
   
    if (totalPricePlusTax) {
      const priceInKobo = totalPricePlusTax * 100;
      
         const payload = {
         email: user?.paymentEmail, 
         amount: `${priceInKobo}`,
         callback_url: '/'
      }
   
      const response = await launchPaymentPopup(payload);
      return response;
    }
  }
};


  const linkToUpdateProfile = (
    <div className="animate-pulse hover:animate-none">
      <a href={`/dashboard/profilepage`}>
        <button className="bg-gradient-to-r from-red-500 to-red-600 px-1 rounded-lg text-sm text-white font-medium shadow-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
          Complete Your Profile Information
        </button>
      </a>
    </div>
  )


 

  useEffect(()=>{
    
      const totalPrice = totalPriceForCustomer(cart)
      const tax = calculatePercentagePrice(totalPrice, 7.5)
      
      setTotalPricePlusTax(totalPrice + tax)
    
  }, [cart])

 

 
  // Track address
  useEffect(() => {
    if (user?.address) {
      setCustomerStateOfResidence(user.state)
      setFormattedAddress(`${user.address}, ${user.city?.toUpperCase()}, ${user.state?.toUpperCase()}, ${user.country?.toUpperCase()}`)
      
    }else{
      setFormattedAddress(linkToUpdateProfile)
    }
  }, [user?.address])

  
  // Update ETA
  useEffect(() => {
    const findEta = () => {
      if (!user) return
      if (user.state === 'lagos') {
        setEta('2 days')
      }  if (user.state !== 'lagos') {
        setEta('5 days')
      }
      else if (user.state === 'Outside Nigeria') {
        setEta('1 month')
      } else if (!user.state) {
        setEta('Please update state of residence so we can calculate your ETA')
      } else {
        setEta('2 weeks')
      }
    }
    findEta()
  }, [user?.state])


  // Make payment
  const handlePayment = async () => {
    setPaymentMethodError('')
    setIsProcessingOrder(true)
    try{
    if (typeof window === 'undefined') return;
    if (!cart || cart?.length === 0) {
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
    // if(!user.paymentEmail){
    //   setPaymentMethodError('Go to your dashboard and update your payment method on file')
    //   window.location.href = '#payment-top'
    //   return
    // }
    
  
    const newStatus = 'pending'
    const updateResponse = await createUserOrder(cart, user._id, eta, newStatus)
  
    if(updateResponse.ok){
       setCart([]) // Needed to clear local state. Although the updated user still comes with an empty cart.
       updateLocalUser(updateResponse.data)
       setUser(updateResponse.data)
       setTotalItems(0)
       setTotalPrice(0)
       window.location.href = '/dashboard/orders/userorderpage'

    }
  }catch(err){
    console.log('Order processing error', err)
  }finally{
    setIsProcessingOrder(false)
  }
    
    return
  }

  

  return (
    <div className="min-h-screen bg-gray-50 py-24" id='payment-top'>
      {user && isLoggedIn ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Hi {capitalize(user.username)}!
            </h1>
            {/* Error or header text */}
            {paymentMethodError ?
              <a href='/dashboard/paymentmethodspage' className='p-1 rounded-2xl my-4 text-sm md:text-xl text-white font-bold bg-red-500'>
                Click here to update your payment method
              </a>:
              <p className={`mt-4 text-lg md:text-xl text-gray-600`}>
                Review your order before payment
              </p>
            }
            <div className='md:flex justify-center items-center gap-2'>
            <a href="/supermarketpage">
              <button className="mt-6 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Continue shopping
              </button>
            </a>
             <a href="/dashboard/profilepage">
             <button className="mt-6 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Update Profile
              </button>
              </a>
            </div>

            {/* Store Order Error Message */}
            <div className='pt-6'>
              <p className='text-sm text-red-500 font-bold'>{error}</p>
            </div>
            
            <div className="mt-10 bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold text-gray-700">Shipping to:</span>
                  <span className="text-gray-900">{user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : linkToUpdateProfile}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold text-gray-700">Address:</span>
                  <span className="text-gray-900 text-right">{formattedAddress}</span>
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
              <ul className="divide-y divide-gray-200">
                {cart.map((item: any, index: number) => (
                  <li key={index} className="py-4 px-2 hover:bg-gray-50 transition-colors duration-200">
                  <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Image - Fixed width */}
                  <div className="col-span-2 sm:col-span-1">
                  <div className="relative aspect-square w-full rounded-md overflow-hidden border border-gray-200">
              <Image 
                src={item?.imageUrls?.[0] || ''} 
                alt={item.productName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50px, 80px"
              />
            </div>
          </div>
          
          {/* Product Info - Flexible width */}
          <div className="col-span-7 sm:col-span-8">
            <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
              {capitalize(item.productName)}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Quantity: {item.quantity}
            </p>
            <a 
              href={`/storefront/${item.storeName}`} 
              className="text-xs sm:text-sm text-blue-500 hover:text-blue-600 hover:underline inline-block mt-1"
            >
              Visit {item.storeName}
            </a>
          </div>
          
          {/* Price - Fixed width */}
          <div className="col-span-3 sm:col-span-3 text-right">
            <p className="text-base sm:text-lg font-semibold text-green-600 whitespace-nowrap">
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
                <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                  {/* <p>Tax:</p> */}
                {/* <p className="text-gray-900">N{calculatePercentagePrice(totalPriceForCustomer(cart), 7.5)}</p> */}
                </div>
                <p className="text-gray-900">N{totalPriceForCustomer(cart).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-4">
                <p className="font-semibold text-gray-900">Total</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency('NGN', totalPriceForCustomer(cart))}</p>
              </div>

                <div className="max-w-md md:max-w-lg mx-auto p-4 bg-green-50 rounded-lg shadow-sm border border-green-100 flex justify-center items-center text-center">
  <p className="text-green-800 font-medium leading-relaxed">
    Currently, you do not require a payment card to place an order.
    <br />
    After you place your order, you will be redirected to your order page to complete this purchase.
  </p>
</div>
              
              <PaymentAlertCard 
              isProcessingOrder={isProcessingOrder}
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