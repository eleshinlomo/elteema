'use client'
import { useSearchParams } from "next/navigation"
import { useContext, useState, useEffect, Suspense } from "react"
import { GeneralContext } from "../../../contextProviders/GeneralProvider"
import { getUser } from "../../../components/data/userdata"
import { verifyCode } from "../../../components/auth"
import { useRouter } from "next/navigation"

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
  const {isLoggedIn, setIsLoggedIn} = generalContext



  const handleVerify = async ()=>{
      try{
          setIsLoading(true) 
         
          
        
          // if(!confirmedCode && !confirmedEmail) return
          
          if(code && email){
             
             const data: any = await verifyCode(code, email)
              
              if(data.ok){
                  const stringifiedData = JSON.stringify(data.user)
                  localStorage.setItem('ptlgUser', stringifiedData)
                  verifyPersistentLogin()
                  router.push('/allstores')
                
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
    
    
    console.log('VERIFYING TOKEN IN USE EFFECT...')
    const userStr: any = localStorage.getItem('ptlgUser')
    let user: any = {}
    if (userStr) {
      user = JSON.parse(userStr)
    }

    if (user && user.authCode && user.email) {
      const veriedFiedUser: any =  await verifyCode(user.authCode, user.email)
      if(veriedFiedUser.ok){
          setIsLoggedIn(user.isLoggedIn)
      }else{
        localStorage.removeItem('ptlgUser') // If we get this far and user not verified, remove stale data.
      }
      return
      
    } else {
      console.log('MOVING TO HANDLE VERIFY HANDLER...')
      handleVerify()
    }
  }

  useEffect(() => {
    verifyPersistentLogin()
  }, [isLoggedIn])
  

 

  return (
    <Suspense>
      <div>
          {children}
      </div>
      </Suspense>
  )
}

export default AllroutesLayout