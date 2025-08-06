'use client'

import { useContext, useState, useEffect, useCallback, ChangeEvent } from 'react'
import { GeneralContext } from '../../../../../contextProviders/GeneralProvider'
import SigninPage from '../../authpages/signin/page'
import { calculatePercentagePrice, capitalize, formatCurrency, totalPriceForCustomer} from '../../../../../components/utils'
import { CartContext } from '../../../../../contextProviders/cartcontext'
import { updateLocalUser } from '../../../../../components/utils'
import Image from 'next/image'
import { createUserOrder } from '../../../../../components/api/users'
import AlertCard from './paymentAlertCard'
import { useRouter } from "next/navigation";
import { color } from 'framer-motion'


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
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [error, setError] = useState('')
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)
  

  const router = useRouter()
 

//  const handlePaymentPopUp = async () => {
//   if (typeof window !== 'undefined') {
//     const { launchPaymentPopup } = await import('./payments/paymentFunctions');
   
//     if (totalPricePlusTax) {
//       const priceInKobo = totalPricePlusTax * 100;
      
//          const payload = {
//          email: user?.paymentEmail, 
//          amount: `${priceInKobo}`,
//          callback_url: '/'
//       }
   
//       const response = await launchPaymentPopup(payload);
//       return response;
//     }
//   }
// };


const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value
      setPaymentMethod(value)
    
  }

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
     if(user){
      const address = `${user.address}, ${user.city}, ${user.state}`
      setFormattedAddress(address)
     }
      const totalPrice = totalPriceForCustomer(cart)
      const tax = calculatePercentagePrice(totalPrice, 7.5)
      
      setTotalPricePlusTax(totalPrice + tax)
    
  }, [cart])



  // Make payment
  const handlePayment = async () => {
  setPaymentMethodError('');
  setIsProcessingOrder(true);
  
  try {
    if (typeof window === 'undefined') return;
    
    // Validate cart
    if (!Array.isArray(cart) || cart.length === 0) {
      setMessage('Your cart is empty');
      setOpenWarning(true);
      return;
    }

    // Validate user info
    if (!user?.address) {
      setMessage('Please update your address');
      setOpenWarning(true);
      return;
    }
    
    if (!user?.phone) {
      setMessage('Please enter phone number');
      setOpenWarning(true);
      return;
    }
    
    if (!user?.state) {
      setMessage('Please enter your current state of residence');
      setOpenWarning(true);
      return;
    }
    
    const newStatus = 'pending'
    // Prepare cart items with additional info
    const updatedCart = cart.map(item => ({
      ...item,
      orderStatus: newStatus,
      buyerName: `${user?.firstname} ${user?.lastname}`,
      buyerPhone: user?.phone,
      buyerAddress: `${user?.address}, ${user?.city}, ${user?.state}`,
      paymentMethod: paymentMethod
    }));

    const payload: any = {
      buyerId: user?._id,
      cart: updatedCart,
    };

    const response = await createUserOrder(payload);
    
    // Handle response (assuming createUserOrder returns the data directly)
    if (response && !response.error) {
      // Success case
      setCart([]);
      setTotalItems(0);
      setTotalPrice(0);
      
      if (response.data) {
        updateLocalUser(response.data);
        setUser(response.data);
      }
      
      window.location.href = '/dashboard/orders/userorderpage';
    } else {
      // Error case
      setError(response?.error || 'Failed to create order');
      console.error('Order creation failed:', response?.error);
    }
    
  } catch (err) {
    console.error('Order processing error:', err);
    setError('An unexpected error occurred during payment processing');
  } finally {
    setIsProcessingOrder(false);
    window.location.href = '#payment-top'
  }
};





  

  return (
    <div className="min-h-screen bg-gray-50 " id='payment-top'>
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
            <a href="/">
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
                {/* <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg border border-green-200">
                  <p className="font-bold text-gray-800">
                    <span className="text-green-700">:</span> 
                  </p>
                </div> */}
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
            <div className='flex flex-col text-sm'>
          
            {item?.selectedColor && (
  <p
    className="w-6 h-6 rounded-full border border-gray-300"
    style={{ backgroundColor: item.selectedColor }}
  >

  </p>
)}

            {item?.selectedSize && <span>Size: {item?.selectedSize}</span>}
            <span>Estimated Delivery: {item?.eta}</span>
              <a 
              href={`/storefront/${item.storeName}`} 
              className="text-xs sm:text-sm text-blue-500 hover:text-blue-600 hover:underline inline-block mt-1"
            >
              Visit {item.storeName}
            </a>
            <span>Payment Method: {capitalize(paymentMethod)}</span>
            </div>
            
          </div>
          
          
          {/* Price - Fixed width */}
          <div className="col-span-3 sm:col-span-3 text-right pr-4">
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
              
              {/* Payment method */}
               <h3 className='text-center bg-green-200 '>Payment Method</h3>
             <div className='flex justify-between pt-3'>
 
              <span className='flex gap-2'>
              <input type='radio' name='paymentMethod' value='cash' checked={paymentMethod === 'cash'} onChange={handlePaymentMethodChange} />Cash
            </span>
            <span className='flex gap-2'>
            <input disabled={true} type='radio' name='paymentMethod' value='debit' checked={paymentMethod === 'debit'} onChange={handlePaymentMethodChange} />Debit Card
            </span>
            <span className='flex gap-2'>
            <input disabled={true} type='radio' name='paymentMethod' value='bank' checked={paymentMethod === 'bank'} onChange={handlePaymentMethodChange} />Bank Transfer
            </span>
          </div>
              
              <AlertCard
              isProcessingOrder={isProcessingOrder}
                message={message} 
                handlePayment={handlePayment} 
                openWarning={openWarning} 
                setOpenWarning={setOpenWarning} 
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default CheckoutPage