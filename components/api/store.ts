


export interface CreateStoreProps {
 userId: string;
 tagline: string;
 storeName: string;
 logo: string;
 phone: string,
 email: string;
 bvn: string;
 bankAccountName: string;
 bankAccountNumber: string;
 industry: string;
 address: string,
 city: string;
 state: string;
 country: string;
}

export interface StoreProps {
 userId: string;
 storeId: string;
 tagline: string;
 storeName: string;
 bankAccountName: string;
 bankAccountNumber: string;
 bvn: string;
 logo: string;
 phone: string,
 email: string;
 industry: string;
 address: string,
 city: string;
 state: string;
 country: string;
 items: []
}


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Create Store
export const createStore = async (payload : CreateStoreProps)=>{
     const response = await fetch(`${BASE_URL}/store/createstore`, {
        
         mode: 'cors',
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(payload)
     })

     if(!response){
        console.log('No response from the server')
     }

     const data = await response.json()
     return data
}


// Update Store
export const updateStore = async (payload : CreateStoreProps)=>{
     
     const response = await fetch(`${BASE_URL}/store/updatestore`, {
        
         mode: 'cors',
         method: 'PUT',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(payload)
     })

     if(!response){
        console.log('No response from the server')
     }

     const data = await response.json()
     return data
}



    export const deleteStoreOrder = async (storeName: string, orderId: string, buyerId: string) => {
      
        try{
       
        const response = await fetch(`${BASE_URL}/store/deletestoreorder`, {
          mode: 'cors',
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({storeName, orderId, buyerId})
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



// Function gets single store
export const getStore = async (storeName: string)=>{

      const response = await fetch(`${BASE_URL}/store/getstore`, {
       mode: 'cors',
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',

       },
       body: JSON.stringify({storeName})
    })
    if(!response) return 'No response from server'
    
    const data = await response.json()
    return data

}


//   Delete Store
  export const deleteStore = async (userId: string) => {
  
    try{
   
    const response = await fetch(`${BASE_URL}/store/deletestore`, {
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
