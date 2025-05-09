'use client'
import { useSearchParams } from "next/navigation"
import { useContext, useState, useEffect, Suspense } from "react"
import { GeneralContext } from "../../../contextProviders/GeneralProvider"
import { getLocalUser, saveUser } from "../../../components/data/userdata"
import { verifyCode } from "../../../components/auth"
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
  const code = searchParams.get('code')
  const email = searchParams.get('email')
  const router = useRouter()

  useEffect(()=>{
    if(code && email){
      setConfirmedCode(code)
      setConfirmedEmail(email)
    }
  }, [])
  
  const generalContext = useContext(GeneralContext)
  const {isLoggedIn, setIsLoggedIn, setUser} = generalContext

  // Just to watch changes in staticGenerationAsyncStorage. Not used anywhere
  const [userEmail, setUserEmail] = useState('')
  const [username, setUsername] = useState('')



  const handleVerify = async ()=>{
      try{
          setIsLoading(true) 
         
          
        
          // User login fallback
          
          if(code && email){
             
             const data: any = await verifyCode(code, email)
              
              if(data.ok){
                  const stringifiedData = JSON.stringify(data.user)
                  localStorage.setItem('ptlgUser', stringifiedData)
                  router.push('/allstorespage')
                
              } 
              setIsLoading(false)
              return
          }
          
         
      } catch(err) {
          console.error(err)
          setIsLoading(false)
      }
  }

  const verifyPersistentLogin = async () => {
    if (isLoggedIn) return; 
    
    try {
      console.log('VERIFYING TOKEN IN USE EFFECT...');
      const localUser: any = getLocalUser();
  
      if (localUser && localUser.authCode && localUser.email) {
        const veriedFiedUser: any = await verifyCode(localUser.authCode, localUser.email);
        if (veriedFiedUser.ok) {
          setIsLoggedIn(localUser.isLoggedIn);
          setUser(localUser);
          return;
        }
        //  else {
        //   localStorage.removeItem('ptlgUser');
        //   return;
        // }
      } else if (code && email) {
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
  }, [code, email])
  

 

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