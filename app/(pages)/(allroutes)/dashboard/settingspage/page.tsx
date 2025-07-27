'use client'
import { useContext, useEffect, useState } from "react";
import { deleteUser } from "../../../../../components/api/users";
import { GeneralContext } from "../../../../../contextProviders/GeneralProvider";
import { CartContext } from "../../../../../contextProviders/cartcontext";

const SettingsPage = ()=>{

      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
      const {user, setUser} = useContext(GeneralContext)
      const {setCart} = useContext(CartContext)
      const [message, setMessage] = useState('')
      const [errorMessage, setErrorMessage] = useState('Once you delete your account, there is no going back. Please be certain.')
      const [isDeleted, setIsDeleted] = useState(false)


      const handleDeleteAccount = async (userId: string) => {
        console.log('USER ID', userId)
        setMessage('Once you delete your account, there is no going back. Please be certain.')
        const response = await deleteUser(userId)
        if(response.ok){
          setMessage(response.message)
          setIsDeleteModalOpen(false);
          const updatedUser: any = null
          setCart([])
          setUser(updatedUser)
          localStorage.removeItem('ptlgUser')
          setIsDeleted(true)
        }else{
          setIsDeleteModalOpen(false)
          setErrorMessage(`${response.error}`)
        }
      
        
      };

    return (

        <div className="pt-16">
            <div >
                <h2 className="mb-4">SETTINGS PAGE</h2>

            {/* Delete Account Card */}
            { isDeleted ? <p className="text-gray-600">{message}</p>:
              <div className="bg-white rounded-lg shadow-md p-6 border border-red-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Delete Account</h2>
              <p className="text-red-600 mb-6">{errorMessage}</p>
              
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              >
                Delete Account
              </button>
            </div>
            }


             {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Are you sure you want to delete your account?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone. All your data will be permanently removed from our servers.</p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 
                
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
              >
                Cancel
              </button>
              <button
                onClick={()=>handleDeleteAccount(user._id)}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700
                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              >
                Yes, delete my account
              </button>
            </div>
          </div>
        </div>
      )}
            </div>
        </div>
    )
}

export default SettingsPage