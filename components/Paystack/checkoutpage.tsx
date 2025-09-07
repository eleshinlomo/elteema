import React, { useState } from "react"
import { PaystackButton } from "react-paystack"

interface PaystackProps {
    amount: number;
    name: string;
    email: string;
    phone: string;
}

const PayStackCheckout = ({amount, name, email, phone}: PaystackProps) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_API_KEY
  const [paymentSuccesful, setPaymentSuccessful] = useState(false)
  const [transactionRef, setTransactionRef] = useState(null)

  
  const handlePaymentSuccess = (reference: any)=>{
   setTransactionRef(reference.reference)
   console.log('Payment successful', 'Ref', reference)
   
   if(reference.status === 'success' && reference.message === 'Approved'){
    console.log('STATUS', reference.status)
    setPaymentSuccessful(true)
    // window.location.href = '/dashboard/orders/userorderpage';
   }else{

    console.log('FAIL', reference)

   }

   return

  }

  const componentProps: any = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay With Card",
    onSuccess: (reference: any) =>handlePaymentSuccess(reference),
    onClose: () => alert("Wait! Don't leave :("),
  }



  return (
    <div className="paystack-checkout">
          <PaystackButton {...componentProps} />
    </div>
  )
}

export default PayStackCheckout