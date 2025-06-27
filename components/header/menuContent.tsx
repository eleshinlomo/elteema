'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import navdata from "../data/navdata";
import HeaderAlert from "./headeralert";
import NavRightSide from "./rightSide";
import { GeneralContext, GeneralContextInitialProps } from "../../contextProviders/GeneralProvider";
import Cart from "../cart/cart";

interface Props {
  setDrawerOpen: (value: boolean)=>void
}

const MenuContent = ({setDrawerOpen}: Props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);

  const { isLoggedIn, setIsLoggedIn, user, sticky, setSticky, setShowSearchPage } = useContext(GeneralContext);

  const pathName = usePathname();
  // Navbar toggle
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const handleSubmenu = (index: any) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const handleNavOpen = ()=>{
     setNavbarOpen(false);
     setOpenIndex(-1); 
     setDrawerOpen(false)
     setShowSearchPage(false)
  }

  return (
    <div>
      <nav
        className={`navbar absolute rounded border-[.5px] border-body-color/50 bg-white text-green-800 px-6 py-4 
          duration-300 dark:border-body-color/20 dark:bg-dark`}
      >
        <ul className="block">
          {navdata.map((menuItem, index) => (
            <li key={index} className="group relative">
              {menuItem.path ? (
                <Link
                  href={menuItem.path}
                  className={`flex py-2 text-base`}
                  onClick={handleNavOpen}
                >
                  {menuItem.title}
                </Link>
              ) : (
                <>
                  <p
                    onClick={() => handleSubmenu(index)}
                    className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white"
                  >
                    {menuItem.title}
                    <span className="pl-3">
                      <svg width="25" height="24" viewBox="0 0 25 24">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </p>
                  <div
                    className={`pl-4 ${
                      openIndex === index ? "block" : "hidden"
                    }`}
                  >
                    {menuItem.submenu.map((submenuItem: any, subIndex: any) => (
                      <Link
                        href={menuItem.title === 'Quick links' ?  
                          submenuItem.path : `/categorypage/${encodeURIComponent(submenuItem.title)}`} 
                        key={subIndex}
                        className="block rounded py-2 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                        onClick={handleNavOpen}
                      >
                        {submenuItem.title}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default MenuContent;