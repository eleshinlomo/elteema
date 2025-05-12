'use client'
import AlertForm from "../../../../components/alertComponents/alertForm"
import {useState, useEffect, FormEvent} from 'react'

const SellersPage = () => {
    const [openWarning, setOpenWarning] = useState(false)
    const [message, setMessage] = useState('Please enter your eamil')
    const [email, setEmail] = useState('')
    const [btnText, setBtnText] = useState('Notify Me When Registration Opens')

    const submit = (e: FormEvent)=>{
      e.preventDefault()
      setMessage('')
      if(!email){
        setMessage('Please enter email')
        return
      }
      setBtnText('Thank you for submitting your email')
      setOpenWarning(false)
      setEmail('')
      return null
    }

    const body = (<div>
            <form onSubmit={submit} className="flex flex-col justify-center items-center gap-2">
                <p>{message}</p>
                <input 
                type='email'
                value={email}
                required
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email" className="pl-2" />
                <button className="bg-green-600 rounded-2xl px-2 text-white">Submit</button>
            </form>
    </div>)

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center pt-32 md:pt-18 pb-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden border border-green-200">
                <div className="bg-green-600 p-4">
                    <h1 className="text-2xl font-bold text-white text-center">Seller Registration</h1>
                </div>
                <div className="p-8">
                    <div className="flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <p className="text-gray-700 text-center mb-6 text-lg">
                        Welcome to the Sellers Portal. Registration for new sellers on Elteema will open soon!
                    </p>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                        <p className="text-green-700 font-medium">
                            Registration opens on <span className="font-bold">June 1st, 2025</span>. Stay tuned for updates!
                        </p>
                    </div>
                    <AlertForm body={body}  openWarning={openWarning} setOpenWarning={setOpenWarning} btnText={btnText} />
                  
                </div>
            </div>
        </div>
    )
}

export default SellersPage