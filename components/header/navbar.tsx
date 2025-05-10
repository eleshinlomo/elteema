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

const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);

  const generalContext = useContext(GeneralContext);
  const { isLoggedIn, setIsLoggedIn, user }: GeneralContextInitialProps = generalContext;

  const pathName = usePathname();

  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);


  return (
    <div className="relative">
      <HeaderAlert />

      <header
        className={`  bg-black text-white px-10 flex  w-full   ${
          sticky
            ? "fixed top-0 z-[200] !bg-opacity-90 shadow-sticky backdrop-blur-sm transition"
            : "absolute top-0 z-[200]"
        }`}
      >
        <div className="w-full">
          <div className="relative -mx-4 flex  items-center">

            {/* === Logo === */}
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link href="/" className={`header-logo block w-full ${sticky ? "py-5 lg:py-2" : "py-8"}`}>
                <Image
                  src="/images/logos/elteema_logo.png"
                  alt="logo"
                  width={180}
                  height={100}
                  className="w-12 dark:hidden"
                />
                <Image
                  src="/images/logos/elteema_logo.png"
                  alt="logo"
                  width={180}
                  height={100}
                  className="hidden w-12 dark:block"
                />
              </Link>
            </div>

            {/* === Mobile + Right Side Container === */}
            <div className="flex  items-center   gap-2  text-green-700">
              <div>
               

                {/* === Nav Menu === */}
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 
                    duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent 
                    lg:p-0 lg:opacity-100 ${
                    navbarOpen ? "visibility top-full opacity-100" : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-4">
                    {navdata.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path  ? 
                       
                          <Link
                            href={menuItem.path} 
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 `}
                          >
                            {menuItem.title}
                          </Link>
                        : 
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
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
                              className={`submenu relative left-0 top-full rounded-sm bg-white text-green-700 transition-[top] duration-300 group-hover:opacity-100 
                                dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg
                                 lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
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
                        }
                      </li>
                    ))}

                    {/* === Right Side (User, Auth, etc.) === */}
                    <NavRightSide />
                  </ul>
                </nav>
              </div>
                 {/* === Mobile Toggle Button === */}
                 <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="relative flex h-10 w-10 flex-col  rounded-lg bg-white/10 p-2 ring-2 ring-transparent transition-all duration-300 hover:bg-white/20 hover:ring-white/20 focus:outline-none focus:ring-white/30 lg:hidden"
                >
                  <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${navbarOpen ? 'top-1/2 rotate-45' : 'top-3'}`} />
                  <span className={`absolute top-1/2 block h-0.5 w-6 bg-current transition-all duration-300 ${navbarOpen ? 'opacity-0' : ''}`} />
                  <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${navbarOpen ? 'top-1/2 -rotate-45' : 'bottom-3'}`} />
                </button>
               {/* === Cart === */}
               <Cart />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;