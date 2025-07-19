'use client'
import { useContext, useEffect } from "react";
import { UserProps } from "../../../../../components/api/users";
import { Home, User, CreditCard, Store, Settings, ShoppingBag } from "lucide-react"
import { ProductProps } from "../../../../../components/api/product";
import NavButton from "./navButtons";
import { GeneralContext } from "../../../../../contextProviders/GeneralProvider";




interface DashNavProps {
  user: UserProps;
  userOrders: ProductProps[]
}



const DashNavBar = ({user, userOrders}: DashNavProps) => {

  // const {userOrders} = useContext(GeneralContext)


  return (
    <nav className="bg-white shadow-sm rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center justify-start gap-2 md:gap-4">
        {/* Dashboard Link */}
        <NavButton
          href="/dashboard" 
          icon={<Home className="w-4 h-4" />}
          label="Dashboard"
        />

             {/* Orders Link */}
        <NavButton 
          href="/dashboard/orders/userorderpage" 
          icon={<Home className="w-4 h-4" />}
          label={`Orders (${userOrders?.length || 0})`}
        />
        
        {/* Profile Link */}
        <NavButton 
          href="/dashboard/profilepage" 
          icon={<User className="w-4 h-4" />}
          label="Profile"
        />
        
        {/* Payment Methods Link */}
        <NavButton 
          href="/dashboard/paymentmethodspage" 
          icon={<CreditCard className="w-4 h-4" />}
          label="Payment Methods"
        />
        
        
        {/* Store Link */}
        <NavButton 
          href={user?.store ? '/dashboard/storepage' : '/dashboard/createstorepage'} 
          icon={<Store className="w-4 h-4" />}
          label={user?.store ? `View Store` : 'Create Store'}
        />
        
        {/* Settings Link */}  
        <NavButton 
          href="/dashboard/settingspage" 
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
        />
      </div>
    </nav>
  )
}

export default DashNavBar

