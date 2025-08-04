
import { ProductProps } from "./product";
import { StoreProps } from "./store";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface RegisterProps {
    email: string;
    username: string;
  }

  interface PaymentProps {
  paymentEmail: string;
  paymentMethod: string;
}


export interface UserProps {
    id:number;
    firstname:  string;
    lastname:  string;
    authCode: string;
    username: string;
    email: string;
    cart: ProductProps[],
    isCookieAccepted: boolean,
    isLoggedIn: boolean;
    type:  string;
    role:  string;
    createdAt:  string;
    gender: string;
    phone:  string;
    address:  string;
    city: string;
    state: string;
    country: string;
    newsletter: boolean;
    store: StoreProps;
    paymentEmail: string;
    paymentMethod: string;
    orders: []
    
    
}

interface ChangeOrderStatusProps {
  buyerId: string;
  cart: ProductProps[]; 
  newStatus: string;
  eta: string;
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
}

  
export const register = async ({email, username} : RegisterProps)=>{
  const payload = {
    email,
    username
  }
 try{
  const response = await fetch(`${BASE_URL}/users/register`, {
   mode: 'cors',
   method: 'POST',
   headers: {"Content-Type": "application/json"},
   body: JSON.stringify(payload)
  })

  if(!response) return 'No response from server'
   const data = await response.json()
   return data
}catch(err){
    console.error(err)
    return err
}
}

  export const updateUser = async (payload: UserProps) => {
  
    try{
   
    const response = await fetch(`${BASE_URL}/users/updateuser`, {
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


  // Update user cookie
  export const updateUserCookie = async (userId: string, isCookieAccepted: boolean)=>{

    const payload = {
      userId,
      isCookieAccepted
    }
      try{
   
    const response = await fetch(`${BASE_URL}/users/updatecookie`, {
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

  }


  export const updatePaymentMethod = async (payload: PaymentProps) => {
    
      try{
     
      const response = await fetch(`${BASE_URL}/users/updatepaymentmethod`, {
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



    export const changeOrderStatus = (cart: ProductProps[]) => {
  
  if (!cart || cart.length === 0) return []; // Return empty array if cart is empty
  
  return cart?.map((item) => ({
    ...item,
  }));
}

    
    
    
    export const createUserOrder = async (payload: ChangeOrderStatusProps) => {
  const { buyerId, cart} = payload;

  if (!cart || cart.length === 0) return 'No cart found';
  
  try {
    const items = changeOrderStatus(cart);
    
    if (items.length === 0) return 'No item status updated';
    
    const response = await fetch(`${BASE_URL}/users/createuserorder`, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({items, buyerId})
    });
    
    if (!response.ok) throw new Error('No response from server');
    
    const data: any = await response.json();
    return data;
  } catch(err) {
    console.log(err);
    throw err; // Consider re-throwing or returning an error object
  }
}


    //   Delete User order
      export const deleteUserOrder = async (userId: string, orderId: string, reason: string) => {
      
        try{
       
        const response = await fetch(`${BASE_URL}/users/deleteuserorder`, {
          mode: 'cors',
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({userId, orderId, reason})
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

   
      // Delete user
    export const deleteUser = async (userId: string) => {
  
    try{
   
    const response = await fetch(`${BASE_URL}/users/deleteuser`, {
      mode: 'cors',
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId})
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