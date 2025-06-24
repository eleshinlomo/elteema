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

const OldNavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);


  const { isLoggedIn, setIsLoggedIn, user, sticky, setSticky, setPage } = useContext(GeneralContext);

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

  return (
    <div className="relative  pb-16 w-full">
      {/* <div className="fixed  w-full"><HeaderAlert /></div> */}

      <header
       className={`header fixed z-[8000] left-0 top-0 z-40 w-full flex justify-between px-6 ${
          sticky
            ? "text-white bg-gradient-to-r from-green-900 to-black/50   !bg-opkdrop-blur-sm transition"
            : "absolute bg-black/80 text-white "
        }`}
      >
        <div className="w-full max-w-7xl  ">
          {/* Logo and Nav Menu Container */}
          <div className="flex items-center w-full">
            {/* Logo - Made larger */}
            <div className=" ">
              <Link href="/" className={`header-logo block w-full ${sticky ? "py-2 lg:py-2" : "py-2"}`}>
                <div className="relative h-16 w-16"> {/* Increased size */}
                  <Image
                    src="/images/logos/elteema_logo.png"
                    alt="logo"
                    className="w-full dark:hidden"
                    fill
                    priority
                    style={{ objectFit: 'contain' }}
                  />
                  <Image
                    src="/images/logos/elteema_logo.png"
                    alt="logo"
                    className="hidden w-full dark:block"
                    fill
                    priority
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Nav Menu - Centered */}
            <nav className="hidden lg:flex flex-1 justify-center">
              <ul className="flex space-x-8"> {/* Increased spacing */}
                {navdata.map((menuItem, index) => (
                  <li key={index} className="group relative">
                    {menuItem.path ? (
                      
                          
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 hover:text-green-400 transition-colors duration-200`}
                            
                            >
                            {menuItem.title}
                          </Link>
                      
                    ) : (
                      <>
                        <p
                          onClick={() => handleSubmenu(index)}
                          className="flex cursor-pointer items-center justify-between py-2 text-base group-hover:text-green-400 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 transition-colors duration-200"
                        >
                          {menuItem.title}
                          <span className="pl-2">
                            <svg width="20" height="20" viewBox="0 0 25 24">
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
                          className={`submenu relative left-0 top-full rounded-sm bg-white text-green-700 transition-[top] duration-300 group-hover:opacity-100 
                            dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg z-[700]
                            lg:group-hover:visible lg:group-hover:top-full ${openIndex === index ? "block" : "hidden"}`}
                        >
                          {menuItem.submenu.map((submenuItem: any, subIndex: any) => (
                            <Link
                              href={menuItem.title === 'Quick links' ?  
                              submenuItem.path : `/categorypage/${encodeURIComponent(submenuItem.title)}`} 
                              key={subIndex}
                              className="block rounded py-2.5 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
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

   

       
        </div>

  
       <NavRightSide />
      </header>
      
    </div>
  );
};

export default OldNavBar;