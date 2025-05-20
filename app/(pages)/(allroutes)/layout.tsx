'use client'
import { useSearchParams } from "next/navigation"
import { useContext, useState, useEffect, Suspense } from "react"
import { GeneralContext } from "../../../contextProviders/GeneralProvider"
import { getLocalUser, updateUser, UserProps } from "../../../components/data/userdata"
import { verifyCode } from "../../../components/api/auth"
import { useRouter } from "next/navigation"
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage-instance"
import ScrollTopButton from "../../../components/scrollTopButton"

interface AllRoutesProps {
    children: React.ReactNode
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


const AllroutesLayout = ({children}: AllRoutesProps)=>{
    
  const [confirmedCode, setConfirmedCode] = useState('')
  const [confirmedEmail, setConfirmedEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true) // Add loading state
  const searchParams = useSearchParams()
  let code = searchParams.get('code')
  let email = searchParams.get('email')
  const router = useRouter()

  useEffect(()=>{
    if(code && email){
      setConfirmedCode(code)
      setConfirmedEmail(email)
    }
    
   
  }, [])
  
  const generalContext = useContext(GeneralContext)
  const {isLoggedIn, setIsLoggedIn, user, setUser} = generalContext





  const handleVerify = async ()=>{
      try{
          setIsLoading(true) 
         
          
        
          // User login fallback
          if(code && email){
             
             const data: any = await verifyCode(code, email)
             
              
              if(data.ok){
                let verifiedUser: any = data.data
                 console.log('USER DATA', data)
                 console.log('VERIFIED USER', verifiedUser)
                  const existingUser: any = getLocalUser()
                  if(existingUser && verifiedUser && existingUser.anonymous && existingUser.cookiesAccepted){
                    //We only grab the cookiesAcceptance and discard the localUser
                    const updatedUser: any = {...verifiedUser, cart: existingUser.cart, cookiesAccepted: existingUser?.cookiesAccepted} 
                    localStorage.removeItem('ptlgUser')
                    updateUser(updatedUser)
                    setUser(updatedUser)
                  }else if(existingUser && verifiedUser && existingUser.anonymous && existingUser.cart){
                    //We only grab the cart, and discard the localUser
                    const updatedUser: any = {...verifiedUser, cart: existingUser.cart} 
                    localStorage.removeItem('ptlgUser')
                    updateUser(updatedUser)
                    setUser(updatedUser)
                  }else if(existingUser && verifiedUser && existingUser.anonymous && existingUser.cart && existingUser.cookiesAccepted){
                    //We only grab the cart, cookiesAcceptance and discard the localUser
                    const updatedUser: any = {...verifiedUser, cart: existingUser.cart, cookiesAccepted: existingUser?.cookiesAccepted} 
                    localStorage.removeItem('ptlgUser')
                    updateUser(updatedUser)
                    setUser(updatedUser)
                  }
                  else {
                  updateUser(verifiedUser)
                  setUser(verifiedUser)
                  }
                  code = ''
                  email = ''
                  setIsLoading(false)
                  router.push('/allstorespage')
                
              } 
             
              return
          }
          
         
      } catch(err) {
          console.error(err)
          setIsLoading(false)
      }
  }
  

  // Persistent Auth
  const verifyPersistentLogin = async () => {

    try {
      if(!email && !code){
        console.log('VERIFYING TOKEN IN USE EFFECT...');
        const localUser: any = getLocalUser();
  
        if (localUser && localUser.authCode && localUser.email) {
          setIsLoggedIn(localUser.isLoggedIn);
          setUser(localUser);
          return;
        }else if(localUser && localUser.anonymous){ //When cookies is accepted or declined, an anonymous user is also created.
                setUser(localUser)
                setIsLoggedIn(false)
                return
                // This allows guest user to continue shopping
        }else{
          console.log('No user found')
          return null
        }
      }else  {
        // Only call handleVerify if we have code and email
        handleVerify();
    }
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyPersistentLogin()
    
  }, [email, code])
  

 

  return (
    <Suspense>
      <div>
          {children}
          <ScrollTopButton />
      </div>
      </Suspense>
  )
}

export default AllroutesLayout