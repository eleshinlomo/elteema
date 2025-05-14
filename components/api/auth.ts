const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL




export const login = async (email: string)=>{
   try{
   const response = await fetch(`${BASE_URL}/auth/login`, {
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
  const response = await fetch(`${BASE_URL}/auth/verifycode`, {
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

export const logout = async (email: string)=>{
  if(!email) return 'missing email'

  if(window !== null){
    localStorage.removeItem('ptlgUser')
  }
  const response: any = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email})

  })
  if(!response) return 'No response from server'
  const data = await response.json()
  return data
}