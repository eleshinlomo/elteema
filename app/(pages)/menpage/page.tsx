'use client'

import { Button } from "../../../components/ui/button"
import React, {useState, useEffect} from 'react'



const MenPage = ()=>{
    const [message, setMessage] = useState<string | React.ReactNode>('Driver Lounge')

    const handleClick = ()=>{
        setMessage(
        <div className="text-center text-lg text-red-600">
            <p>Driver activation has not started.</p>
            <p>Please check back in few weeks and remember to sign up to join the waitlist</p>
            </div>)
    }
    return (
    
    <div>
      <div className="flex flex-col justify-center items-center pt-32 flex-wrap">
        <h1 className="text-3xl py-4 font-extrabold">{message}</h1>
       <div className="flex flex-col justify-center items-center">
        <p className="text-center text-lg px-6 font-extrabold">Our Drivers are solving real-life problems by delivering fresh farm 
            produce</p>
            <Button className="bg-green-600 hover:bg-green-600 rounded-2xl text-white font-extrabold my-4"
            onClick={handleClick}
            >Join the driver pool</Button>
       </div>
      </div>
    </div>
    )
}

export default MenPage