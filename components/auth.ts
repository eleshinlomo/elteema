const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface RegisterProps {
  email: string;
  username: string;
}
export const register = async ({email, username} : RegisterProps)=>{
  const payload = {
    email,
    username
  }
 try{
  const response = await fetch(`${BASE_URL}/register`, {
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


export const login = async (email: string)=>{
   try{
   const response = await fetch(`${BASE_URL}/login`, {
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
 if(!authCode && !authEmail){
  return 'authCode and authEmail not found'
}
  const payload = {authCode, authEmail}
  const response = await fetch(`${BASE_URL}/verifycode`, {
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

}

export const logout = ()=>{
  if(window !== null){
    localStorage.removeItem('ptlgUser')
  }
}