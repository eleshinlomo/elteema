'use client'
import { useSearchParams } from "next/navigation"
import { useContext, useState, useEffect, Suspense } from "react"
import { GeneralContext } from "../../../contextProviders/GeneralProvider"
import { getLocalUser, saveUser, UserProps } from "../../../components/data/userdata"
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
                let verifiedUser: any = data.user
                  const existingUser: any = getLocalUser()
                  if(existingUser){
                    const updatedUser: any = {...verifiedUser, cart: existingUser.cart}
                    localStorage.removeItem('ptlgUser')
                    saveUser(updatedUser)
                  }else{
                  saveUser(verifiedUser)
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

  const verifyPersistentLogin = async () => {
   
    
    try {
      if(!email && !code){
      console.log('VERIFYING TOKEN IN USE EFFECT...');
      const localUser: any = getLocalUser();
  
      if (localUser && localUser.authCode && localUser.email) {
        // const veriedFiedUser: any = await verifyCode(localUser.authCode, localUser.email);
      
          setIsLoggedIn(localUser.isLoggedIn);
          setUser(localUser);
          return;
        
      
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
    if(!isLoggedIn){
    verifyPersistentLogin()
    }
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