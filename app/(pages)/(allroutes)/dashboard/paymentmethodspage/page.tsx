'use client'

import { ChangeEvent, useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import { GeneralContext } from '../../../../../contextProviders/GeneralProvider';
import { updateUser } from '../../../../../components/api/users';
import { updateLocalUser} from '../../../../../components/data/userdata';
import { updatePaymentMethod } from '../../../../../components/api/payments';

type PaymentMethodType = 'Debit Card' | 'USSD' | 'Paypal' | '';

const PaymentMethodsPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('')
  const [paymentEmail, setPaymentEmail] = useState('')
  const {user, setUser} = useContext(GeneralContext)
  const [isEditing, setIsEditing] = useState(false)
  const [isPaymentUpdated, setIsPaymentUpdated] = useState(false)
  const [error, setError]= useState('')

  const editPayment = async ()=>{
    setIsEditing(true)
    setIsPaymentUpdated(false)
  
  }

  const savePayment = async ()=>{
    if(user && paymentEmail && paymentMethod){
       
        // const updatedUser: UserProps = {...user, paymentMethod: updatedPaymentMethod, paymentEmail: updatedPaymentEmail}
        const payload = {userId: user.id, paymentEmail, paymentMethod}
        const data = await updatePaymentMethod(payload)

        if(data.ok){
            const newUser = data.data
            console.log(data)
            console.log('NEW USER', newUser)
              setUser(newUser)
            updateLocalUser(newUser)
            setIsEditing(false)
            setIsPaymentUpdated(true)
        }else{
            console.log('USER UPDATE ERROR', data.error)
            setError(data.error)
        }
    }
    
  }

  
  useEffect(()=>{
  const getExistingPaymentMethod = ()=>{
     if(user){
        const existingPaymentMethod = user.paymentMethod
        const existingPaymentEmail = user.paymentEmail
        if(existingPaymentEmail && existingPaymentMethod){
            setPaymentEmail(existingPaymentEmail)
            setPaymentMethod(existingPaymentMethod)
            setIsPaymentUpdated(true)
            return
        }
     }
     return
  }
  getExistingPaymentMethod()
  }, [])

  const handleUseEmailOnFile = ()=>{
      if(user?.email){
        const userEmail = user.email
        setPaymentEmail(userEmail)
      }

      
      
  }



  const paymentLogos: Record<PaymentMethodType, string[]> = {
    'Debit Card': [
      '/logos/visa.svg',
      '/logos/mastercard.svg',
      '/logos/amex.svg'
    ],
    'USSD': [
      '/logos/bank-transfer.svg'
    ],
    'Paypal': [
      '/logos/paypal.svg'
    ],
    '': []
  }

  return (
    <div className='max-w-2xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md '>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>Payment Methods</h1>
      <div className='bg-green-50 p-4 rounded-lg mb-6'>
        <p className='text-green-800 mb-2'>
          <span className='font-semibold'>Note:</span> Payment methods are only used to complete orders in other stores but not for your own store.
        </p>
        <p className='text-green-800'>
          If you have a store, your store must have its own banking details in order to receive your funds.
        </p>
         <p className='text-green-800'>
          Make sure your email on file matches the email you have with your payment merchant e.g Paypal or your bank.
        </p>
      </div>

      {!isPaymentUpdated &&
        <div>
        <div className='bg-gray-100 p-4 rounded-lg mb-6'>
        <p className='text-gray-700'>{error || 'You do not have any payment method on file.'}</p>
      </div>
      

      <div className='mb-6'>
        <label htmlFor='payment-method' className='block text-gray-700 font-medium mb-2'>
          Select Payment Method
        </label>
        <select
          id='payment-method'
          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodType)}
          value={paymentMethod}
          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
        >
          <option value=''>Please choose payment method</option>
          <option value='Debit Card'>Debit/Credit Card</option>
          <option value='USSD'>Bank Transfer/USSD</option>
          <option value='Paypal'>PayPal</option>
        </select>
      </div>
      
      {/* Email */}
      {paymentMethod && 
      <div className='flex flex-col '>
        <div className='flex mb-2'>
            <span>Your {paymentMethod} email: </span>
            <button 
            onClick={handleUseEmailOnFile}
            className='bg-green-500 text-white px-2 rounded-2xl'>Use Email on file</button>
        </div>
        <input className='border border-green-500 py-1' 
        value={paymentEmail}
        onChange={(e)=>setPaymentEmail(e.target.value)}
         />
        <button className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 mt-1'
        onClick={savePayment}
        >
            Save payment
          </button>
      </div>
      }
      </div>
    }

      {paymentMethod && paymentEmail && (
        <div className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <div className='flex flex-col  mb-4'>
            <span className='flex'>
                <p className='text-gray-700 mr-2'>Your selected payment method is:</p>
                 <span className='font-bold text-blue-600'>{paymentMethod}</span>
            </span>
            <p>Your payment email is: <span className='font-extrabold'>{paymentEmail}</span></p>
          </div>

          {paymentLogos[paymentMethod]?.length > 0 && (
            <div className='flex space-x-4 mb-6'>
              {paymentLogos[paymentMethod].map((logo, index) => (
                <div key={index} className='bg-white p-2 rounded-md shadow-sm border'>
                  <Image 
                    src={logo} 
                    alt={`${paymentMethod} logo`}
                    width={60}
                    height={40}
                    className='object-contain'
                  />
                </div>
              ))}
            </div>
          )}

          <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200'
           onClick={editPayment}
          >
            {paymentMethod ? 'Change Payment Method' : 'Save Payment Method'}
          </button>
        </div>
      )}
    </div>
  )
}

export default PaymentMethodsPage