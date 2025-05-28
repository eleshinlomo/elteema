import PaystackPop from '@paystack/inline-js'

export const initializePayment = async (email: string, amount: string) => {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer sk_test_900e5e97abe00c78f6fd01818e7403b35cbda8db'
        },
        method: 'POST',
        body: JSON.stringify({email, amount}) // Note: Paystack expects 'amount' in kobo, not 'price'
    })
    
    if(!response.ok){
        console.log('Error from paystack server', response.status)
        return 'No response from payment server'
    }
    
    const data = await response.json()
    
    return data.data
    
}

export const launchPaymentPopup = async (email: string, amount: string)=>{
    const response = await initializePayment(email, amount)
    const {access_code, status} = response
    console.log('access code', access_code, 'status', response.status)
   
    if(access_code){
    const popup = new PaystackPop()
    const data = await popup.resumeTransaction(access_code)
     const {status} = data
      return response.status
    }
    
}