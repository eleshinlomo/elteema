'use client'
import { useSearchParams } from "next/navigation"
import { useContext, useState, useEffect, Suspense } from "react"
import { GeneralContext } from "../../../contextProviders/GeneralProvider"
import { getLocalUser, updateLocalUser } from "../../../components/utils"
import { persistLogin, verifyCode } from "../../../components/api/auth"
import { useRouter } from "next/navigation"
import ScrollTopButton from "../../../components/scrollTopButton"
import MobileFooter from "../../../components/mobileFooter"
import Footer from "../../../components/footer"
import { usePathname } from "next/navigation"
import NavBar from "../../../components/header/navBar"
import Featured from "../../../components/product/featured"
import { updateCart } from "../../../components/api/cart"


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

  // Hooks
  const router = useRouter()
  const path = usePathname()

  useEffect(()=>{
    if(code && email){
      setConfirmedCode(code)
      setConfirmedEmail(email)
    }
    
   
  }, [])
  
  const generalContext = useContext(GeneralContext)
  const {isLoggedIn, setIsLoggedIn, user, setUser, showSearchPage, setShowSearchPage} = generalContext





  const handleVerify = async ()=>{
      try{
          setIsLoading(true) 
         
          
        
          // User login fallback
          if(code && email){
             
             const data: any = await verifyCode(code, email)
              if(data.ok){
                let verifiedUser: any = data.data
                  const existingUser: any = getLocalUser() //Exisiting user is for guest user. Usually with no id.
                  const existingUserCart = existingUser?.cart
                    let mergedCart: any = []
                    if(existingUserCart && verifiedUser){
                       mergedCart = [...existingUserCart, verifiedUser.cart]
                        updateCart(verifiedUser._id, mergedCart)
                       
                    }else{
                      const userCart = verifiedUser?.cart
                      mergedCart = userCart
                    }
                    const updatedUser = {...verifiedUser, cart: mergedCart}
                    updateLocalUser(updatedUser)
                    setUser(updatedUser)
                  
                    code = ''
                    email = ''
                    setIsLoading(false)
                    router.push('/')
                  
              
              } 
             
              return
          }
          
         
      } catch(err) {
          console.error(err)
      }finally{
         setIsLoading(true)
      }
  }
  

  // Persistent Auth
  const verifyPersistentLogin = async () => {
    setIsLoading(true)
    try {
      if(!email && !code){
        console.log('VERIFYING TOKEN IN USE EFFECT...');
        const localUser: any = getLocalUser();
  
        if (localUser && localUser.authCode && localUser.email) {
          const confirmedUser = await persistLogin(localUser.authCode, localUser.email)
            console.log('Confirmed User', confirmedUser)
          if(confirmedUser.ok){
            setIsLoggedIn(confirmedUser.data.isLoggedIn);
            setUser(confirmedUser.data);
             return;
           }else{
            setUser(null)
            setIsLoggedIn(false)
           }
        
        }
      }else  {
        // Only call handleVerify if we have code and email
        handleVerify();
    }
    } catch(err) {
      console.log(err);
    }finally{
       setIsLoading(false)
    }
  };

  useEffect(() => {
    verifyPersistentLogin()
    
  }, [email, code, isLoggedIn])
  

 

  return (
    <Suspense>
      <div>
          {/* <NavBar /> */}
          <NavBar />
          {children}
          {showSearchPage ? <Featured /> : null}
          <ScrollTopButton />
          {/* Mobile footer */}
          <MobileFooter />
          {/* Desktop Footer */}
          <div className="hidden md:block">{!path.startsWith('/dashboard') && <Footer />}</div>
          
      </div>
      </Suspense>
  )
}

export default AllroutesLayout