'use client'
import { useState } from "react";

const OrderPage = ()=>{

      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

      const handleDeleteAccount = () => {
        // Handle account deletion
        // alert('Account deleted successfully!');
        setIsDeleteModalOpen(false);
      };

    return (

        <div className="pt-16">
            <div >
                <h2 className="mb-4">ORDER PAGE</h2>

               <p>You have not ordered for any item</p>
            </div>
        </div>
    )
}

export default OrderPage