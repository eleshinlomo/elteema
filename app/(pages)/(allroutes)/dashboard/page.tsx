'use client'

import { useContext, useState } from "react";
import { GeneralContext } from "../../../../contextProviders/GeneralProvider";
import { MessageCircleIcon } from "lucide-react";
import { FaRobot } from "react-icons/fa";
import StorePage from "./storepage/page";
import { capitalize } from "../../../../components/utils";



const DashboardPage = () => {

    const {user} = useContext(GeneralContext)
    const [alert, setAlert] = useState(false)

    const showAlert = ()=>{
       setAlert(true)
    }

     const hideAlert = ()=>{
       setAlert(false)
    }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 text-center">
       
       {!alert && 
       <>
        <h2 className=' font-extrabold text-xl'>WELCOME TO YOUR DASHBOARD PAGE</h2>
       <p className="font-tiny py-4"><span className="font-extrabold">{capitalize(user?.username)}</span>, how market now ?</p>
       

       {/* Store */}
       <div>
        <StorePage />
       </div>
{/* 
       <button className="text-2xl"><MessageCircleIcon className="text-2xl" /></button>
       <p className="font-tiny flex justify-center gap-1"><FaRobot />My name is Kokoro, I am your AI CEO</p>
       <p className="font-tiny flex justify-center gap-1"><FaRobot /> Can we talk about your store performance and suggestions ?</p> */}
       </>
        }
       {/* <button className="mt-2 bg-green-700 rounded-2xl py-1 px-4 text-white" onClick={alert ? hideAlert : showAlert}>{alert ? 'Ok' : 'Yes'}</button>
       {alert && 
       <div className="mt-4 pt-3 px-6 bg-green-50 rounded-lg border border-green-100">
          <p className="text-center text-sm text-green-700">
            Our AI Business Advisor feature is currently in development. 
            Kokoro will soon provide real-time market insights and data-driven 
            recommendations to help optimize your store performance and maximize sales.
          </p>
          <p>If you want this feature, enter your email below</p>
          <div className="flex flex-col items-center">
          <input placeholder="Enter your email here" className="border border-green-700 px-2"/>
          <button className="mt-2 bg-green-700 rounded-2xl py-1 px-4 text-white">Submit</button>
          </div>
        </div>
        } */}

    </div>
  );
};

export default DashboardPage;