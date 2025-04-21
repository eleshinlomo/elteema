'use client'
import { useContext, useState, useEffect } from 'react'
import { GeneralContext } from '../../../../contextProviders/GeneralProvider'
import SigninPage from '../authpages/signin/page'
import { getUser } from '../../../../components/data/userdata'
import { capitalize, totalPriceForCustomer } from '../../../../components/utils'
import { CartContext } from '../../../../contextProviders/cartcontext'
import { UserProps } from '../../../../components/data/userdata'


const CheckoutPage = () => {
  const generalContext = useContext(GeneralContext)
  const { isLoggedIn } = generalContext
  const cartcontext = useContext(CartContext)
  const { cart }: any = cartcontext
  const [payBtnText, setPayBtnText] = useState('Proceed to Payment')
  const [eta, setEta] = useState('')
  const [customerStateOfResidence, setCustomerStateOfResidence] = useState('')
  const [user, setUser] = useState<any>(null)

  
  

 
 useEffect(()=>{
  if(typeof window !== 'undefined'){
    const u: UserProps = getUser()
    if(u){
      setUser(u)
      setCustomerStateOfResidence(u.location)
    }
  }
 }, [user]) 

  
  // Default page to send customers who are yet to fill their profile
  const linkToUpdateProfile = (<div>
    <a href={`dashboard/` + user?.type}><button 
    className='bg-green-600 rounded-2xl px-2 text-white mx-2'>
     Click here to add your information on file</button></a>
     </div>
  )

 

  useEffect(()=>{
    const findEta = ()=>{
      if(!user) return
      if(customerStateOfResidence === 'Lagos State'){
       setEta('3 days')
      }else if(customerStateOfResidence === 'Outside Nigeria'){
        setEta('3 months')
      }else if(customerStateOfResidence === ''){
        setEta('Please update your address so we can calculate your ETA')
      }else{
       setEta('2 weeks')
      }
   }
   findEta()
  }, [customerStateOfResidence])

  const handlePayBtn = ()=>{
    if(cart && cart.length === 0){
        setPayBtnText('Your cart is empty')
        return
    }

    alert('This feature is not ready!')
  }



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
            <a href='/'><button className='bg-green-100 px-4 rounded-2xl py-2  animate-pulse'>Continue shopping</button></a>
            <div className='my-4 flex flex-col justify-center items-center gap-2'>
                <span className='flex'>Shipping to:{user.name ? user.name : linkToUpdateProfile}</span>
                <span className='flex'>Address: {user.address ? user.address : linkToUpdateProfile}</span>
                <span className='flex'>Phone number: {user.phone ? user.phone : linkToUpdateProfile}</span>
                <span className='bg-green-200 px-4 rounded-2xl'>Estimated time of delivery(ETA): {eta}</span>
                 
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
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
              <button
                className="w-full mt-6 bg-green-500 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handlePayBtn}
              >
                {payBtnText}
              </button>
            </div>
          </div>
        </div>:
        <SigninPage />
      }
    </div>
  )
}

export default CheckoutPage