'use client'
import { useSearchParams } from "next/navigation"
import { useContext, useState, useEffect, Suspense } from "react"
import { GeneralContext } from "../../../contextProviders/GeneralProvider"
import { getLocalUser, updateLocalUser} from "../../../components/data/userdata"
import { persistLogin, verifyCode } from "../../../components/api/auth"
import { useRouter } from "next/navigation"
import ScrollTopButton from "../../../components/scrollTopButton"
import MobileFooter from "../../../components/mobileFooter"
import Footer from "../../../components/footer"
import { usePathname } from "next/navigation"
import NavBar from "../../../components/header/navBar"
import Featured from "../../../components/product/featured"


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
                 console.log('USER DATA', data)
                 console.log('VERIFIED USER', verifiedUser)
                  const existingUser: any = getLocalUser()
                  if(existingUser && verifiedUser && existingUser.anonymous && existingUser.cookiesAccepted){
                    //We only grab the cookiesAcceptance and discard the localUser
                    const updatedUser: any = {...verifiedUser, cart: existingUser.cart, cookiesAccepted: existingUser?.cookiesAccepted} 
                    localStorage.removeItem('ptlgUser')
                    updateLocalUser(updatedUser)
                    setUser(updatedUser)
                  }else if(existingUser && verifiedUser && existingUser.anonymous && existingUser.cart){
                    //We only grab the cart, and discard the localUser
                    const updatedUser: any = {...verifiedUser, cart: existingUser.cart} 
                    localStorage.removeItem('ptlgUser')
                    updateLocalUser(updatedUser)
                    setUser(updatedUser)
                  }else if(existingUser && verifiedUser && existingUser.anonymous && existingUser.cart && existingUser.cookiesAccepted){
                    //We only grab the cart, cookiesAcceptance and discard the localUser
                    const updatedUser: any = {...verifiedUser, cart: existingUser.cart, cookiesAccepted: existingUser?.cookiesAccepted} 
                    localStorage.removeItem('ptlgUser')
                    updateLocalUser(updatedUser)
                    setUser(updatedUser)
                  }
                  else {
                  updateLocalUser(verifiedUser)
                  setUser(verifiedUser)
                  }
                  code = ''
                  email = ''
                  setIsLoading(false)
                  router.push('/')
                
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
          const confirmedUser = await persistLogin(localUser.authCode, localUser.email)

          if(confirmedUser.ok){
            setIsLoggedIn(localUser.isLoggedIn);
            setUser(localUser);
             return;
           }else{
            setUser(null)
            setIsLoggedIn(false)
           }
        
         
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
    
  }, [email, code, isLoggedIn])
  
// useEffect(()=>{
//      if(user && user?.store.length > 0){
//             setUserStore(user.store)
//         }
// },[user?.store])
 
const dashboardPaths = path.startsWith('dashboard')
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