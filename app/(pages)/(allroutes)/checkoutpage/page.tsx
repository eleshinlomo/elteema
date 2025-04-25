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
  
  

  
  

 
 useEffect(()=>{
      if(user){
      setCustomerStateOfResidence(user.state)
      }
    
  
 }, [user]) 

  
  // Default page to send customers who are yet to fill their profile
  const linkToUpdateProfile = (<div>
    <a href={`dashboard/` + user?.type}><button 
    className='bg-red-600 rounded-2xl px-2 py-2 text-white mx-2'>
     Click here to add your information on file</button></a>
     </div>
  )

  const handlePayment = ()=>{
     if(!cart || cart.length === 0){
      setMessage('Your cart is empty')
      setOpenWarning(true)
      return
     }
     if(!user.address){
      setMessage('Please update your address')
      setOpenWarning(true)
      return
     }

     if(!user.phone){
      setMessage('Please enter phone number')
      setOpenWarning(true)
      return
     }

     if(!user.state){
      setMessage('Please enter your current state of residence')
      setOpenWarning(true)
      return
     }

     setMessage('The payment feature is underway')
     return
  }

 

  useEffect(()=>{
    const findEta = ()=>{
      if(!user) return
      if(customerStateOfResidence === 'Lagos State'){
       setEta('3 days')
      }else if(customerStateOfResidence === 'Outside Nigeria'){
        setEta('3 months')
      }else if(!customerStateOfResidence || customerStateOfResidence === ''){
        setEta('Please update state of residence so we can calculate your ETA')
      }else{
       setEta('2 weeks')
      }
   }
   findEta()
  }, [customerStateOfResidence, eta])

 



  return (
    <div className="">
      {user && isLoggedIn ?
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Hi {capitalize(user.username)}!
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Review your order before payment
            </p>
            <a href='/allstores'><button className='bg-green-100 px-4 rounded-2xl py-2  animate-pulse'>Continue shopping</button></a>
            <div className='my-4 flex flex-col justify-center items-center gap-2'>
                <div className='flex text-sm'><span className=' font-extrabold mx-2'>Shipping to:</span>{user.name ? user.name : linkToUpdateProfile}</div>
                <div className='flex text-sm'><span className=' font-extrabold mx-2'>Address:</span> {user.address ? user.address : linkToUpdateProfile}</div>
                <div className='flex text-sm'><span className=' font-extrabold mx-2'>Phone number:</span> {user.phone ? user.phone : linkToUpdateProfile}</div>
                <div className='bg-green-200 px-4 py-2 my-8 rounded-2xl'><span className=' font-extrabold mx-2'>
                  Estimated time of delivery(ETA):</span> {eta}</div>
                 
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <p className='text-center'>{message}</p>
              <h2 className="text-lg font-medium text-gray-900">Your Items</h2>
            </div>
            
            {cart && cart.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {cart.map((item: any, index: number) => (
                  <li key={index} className="p-6 flex flex-col sm:flex-row">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900">
                            {capitalize(item.name)}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <p className="text-lg font-medium text-gray-900">
                            N{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-gray-500">
                Your cart is empty
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="flex justify-between text-lg font-medium text-gray-900 py-2">
                <p>Total</p>
                <p>N{totalPriceForCustomer(cart).toFixed(2)}</p>
              </div>
               <PaymentAlertCard message={message} submit={handlePayment} openWarning={openWarning} setOpenWarning={setOpenWarning}  />
            </div>
          </div>
        </div>:
        <SigninPage />
      }
    </div>
  )
}

export default CheckoutPage