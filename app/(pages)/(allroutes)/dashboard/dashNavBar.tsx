import { useEffect } from "react";
import { UserProps } from "../../../../components/api/users";
import { Home, User, CreditCard, Store, Settings, ShoppingBag } from "lucide-react"

interface DashNavProps {
  href: string; 
  icon: React.ReactNode; 
  label: string;
}


const DashNavBar = ({ user }: { user: UserProps | null }) => {
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
          href="/dashboard/userorderpage" 
          icon={<Home className="w-4 h-4" />}
          label={`Orders (${user?.orders?.length || 0})`}
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
          label={user?.store ? `View Store (${user?.store?.items?.length || 0 })` : 'Create Store'}
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

// Reusable NavButton component
const NavButton = ({ href, icon, label }: DashNavProps) => (
  <div id='nav-top'>
  <a href={href} className="group">
    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all
                      hover:bg-emerald-50 hover:text-emerald-700 group-hover:scale-[1.02]">
      {icon}
      <span>{label}</span>
    </button>
  </a>
  </div>
)

export default DashNavBar