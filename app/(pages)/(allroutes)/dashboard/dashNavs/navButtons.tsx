
interface NavButtonProps {
  href: string; 
  icon: React.ReactNode; 
  label: string;
}

// Reusable NavButton component
const NavButton = ({ href, icon, label}: NavButtonProps) => (
    
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

export default NavButton