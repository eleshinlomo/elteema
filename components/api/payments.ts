
interface PaymentProps {
  paymentEmail: string;
  paymentMethod: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const updatePaymentMethod = async (payload: PaymentProps) => {
  
    try{
   
    const response = await fetch(`${BASE_URL}/payment/updatepaymentmethod`, {
      mode: 'cors',
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    })
    if(!response) {
      console.log('No response from server')
      return 'No response from server'
    }

    const data = await response.json()
    return data
  }catch(err){
    console.log(err)
  }
  };