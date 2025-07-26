import { initialize } from "next/dist/server/lib/render-server";



const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL




  // initialize Payment
  export const intializePayment = async (userId: string)=>{
     const response = await fetch(`${BASE_URL}/payment/initializepayment`, {
      mode: 'cors',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId})
    })
    if(!response) {
      console.log('No response from server')
      return 'No response from server'
    }

    const data = await response.json()
    return data
  }


  const validateBVN = ()=>{

    const metadata = {
       "country": "NG",
      "type": "bank_account",
      "account_number": "0111111111",
      "bvn": "222222222221",
      "bank_code": "007",
      "first_name": "Uchenna",
      "last_name": "Okoro"
    }
    const response = fetch('https://api.paystack.co/customer/{customer_code}/identification', {
      method: 'POST'
    })
  }

  export const testStripe = async ()=>{
       const response = await fetch(`${BASE_URL}/payments/makepayment`, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
       })

       if(!response) return 'No response from server'

       const data = await response.json()
       console.log('STRIPE RESPONSE', data)
       return data
  }