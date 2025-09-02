import { updateLocalUser } from "../utils"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL




export const login = async (email: string)=>{
   try{
   const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({email})
   })

   if(!response) return 'No response from server'
   const data: any = await response.json()
   return data
  }
  catch(err){
    console.log(err)
  }
}

export const verifyCode = async (authCode: string, authEmail: string)=>{
  try{
 if(!authCode || !authEmail){
  return 'authCode and authEmail not found'
}
  const payload = {authCode, authEmail}
  const response = await fetch(`${BASE_URL}/api/auth/verifycode`, {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
  })
  
  if(!response) {
      console.error('Server did not respond to verifyCode fetch')
      return
  }
  
  const data: any = await response.json()
  return data
}catch(err){
  console.log(err)
}

}

export const logout = async (email: string, isCookieAccepted: boolean)=>{
  if(!email) return 'missing email'

  if(window !== null){
    localStorage.removeItem('ptlgUser')
    // We re-add user's cookie history to make it persist.
    const guestUser: any = {anonymous: true, isCookieAccepted: isCookieAccepted}
    updateLocalUser(guestUser)
  }
  const response: any = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email})

  })
  if(!response) return 'No response from server'
  const data = await response.json()
  return data
}

// persistlogin
export const persistLogin = async (token: string, email: string)=>{
  if(!email.trim() || !token) return 'missing email or token'

 
  const response: any = await fetch(`${BASE_URL}/api/auth/persistlogin`, {
    method: 'POST',
    mode: 'cors',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, token})

  })
  if(!response) return 'No response from server'
  const data = await response.json()
  return data

}