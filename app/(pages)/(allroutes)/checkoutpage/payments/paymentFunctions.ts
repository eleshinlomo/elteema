'use client'
import PaystackPop from '@paystack/inline-js'
import { Console } from 'console'
import { updateStoreOrder } from '../../../../../components/api/store'
import { CartProps } from '../../../../../components/api/cart'

interface PaymentProps {
  email: string;
  amount: string;
  callback_url: string;

}

export const initializePayment = async (email: string, amount: string, callback_url: string) => {
  if( typeof window !== 'undefined'){
    const metadata = {
        firstname: 'yourname',
        lastname: 'yourname'
    }
    const payload = {
        email,
        amount,
        callback_url,
        metadata: {
          name: 'Paystack transaction'
        },
        onSuccess: ()=>{
          console.log('Payment successful')
        },
        onClose: ()=>{
          console.log('Payment was canceled')
        },
        onError: ()=>{
          console.log('Payment failed')
        }
    }
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer sk_test_900e5e97abe00c78f6fd01818e7403b35cbda8db'
        },
        method: 'POST',
        body: JSON.stringify(payload) // Note: Paystack expects 'amount' in kobo, not 'price'
    })
    
    if(!response.ok){
        console.log('Error from paystack server', response.status)
        return 'No response from payment server'
    }
    
    const data = await response.json()
    
    return data.data
  }

}


export const launchPaymentPopup = async (payload: PaymentProps) => {
    if(typeof window !== 'undefined'){
  try {
    const {email, amount, callback_url} = payload
    const response = await initializePayment(email, amount, callback_url);
    console.log('PAYSTACK', response)
    const { access_code, reference } = response;
    
    if (access_code) {
      const popup = new PaystackPop();
      const popupResponse = await popup.resumeTransaction(access_code);
      console.log('POP UP RESPONSE', popupResponse)
      
      return {
        reference,
        status: popupResponse.status,
        fullResponse: popupResponse
      };
    }
    return { status: 'failed', reference: null };
  } catch (error) {
    console.error('Payment error:', error);
    return { status: 'error', reference: null };
  }
}
};



