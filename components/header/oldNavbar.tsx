'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import navdata from "../data/navdata";
import HeaderAlert from "./headeralert";
import NavRightSide from "./rightSide";
import { GeneralContext, GeneralContextInitialProps } from "../../contextProviders/GeneralProvider";
import Cart from "../cart/cart";
import { X, Menu } from "lucide-react";

const OldNavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const { isLoggedIn, setIsLoggedIn, user, sticky, setSticky, setPage } = useContext(GeneralContext);
  const pathName = usePathname();

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="relative w-full">
      <header
        className={`header fixed left-0 top-0 z-40 w-full flex justify-between px-4 sm:px-6 ${
          sticky
            ? "text-white bg-gradient-to-r from-black/80 to-black/50 backdrop-blur-sm transition"
            : "absolute bg-white/80 text-green-800 backdrop-blur-sm"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-between w-full h-16">
            {/* Logo - Left side */}
            <div className="flex-shrink-0">
              <Link href="/" className={`header-logo block ${sticky ? "py-2 lg:py-2" : "py-2"}`}>
                <div className="relative w-12 h-12">
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
              <ul className="flex space-x-8">
                {navdata.map((menuItem, index) => (
                  <li key={index} className="group relative">
                    {menuItem.path ? (
                      <Link
                        href={
                          menuItem.title === 'Fabrics'
                            ? `/categorypage/${encodeURIComponent('fabrics & textiles')}`
                            : menuItem.title === 'Spices'
                            ? `/categorypage/${encodeURIComponent('vegetable & spice')}`
                            : menuItem.path
                        }
                        className="flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 hover:text-green-400 transition-colors duration-200"
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

            {/* Right side elements - Menu button and NavRightSide */}
            <div className="flex items-center gap-4">
              <NavRightSide />
              
               {/* Mobile Menu Button - Right side */}
              <button
                onClick={navbarToggleHandler}
                className="lg:hidden focus:outline-none ml-4"
                aria-label="Toggle menu"
              >
                {navbarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Slides in from right */}
          <div
            className={`lg:hidden fixed inset-0 z-50   bg-white/95 backdrop-blur-lg transition-all duration-300 ease-in-out transform ${
              navbarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
            // Ensure it covers the entire viewport
            width: '100vw',
            height: '80vh',
            // Start from the right when closed
            right: navbarOpen ? '0' : '-100vw'
              }}
            >
            <div className="flex flex-col h-full pt-20 px-6 space-y-2 overflow-y-auto">
              <button
                onClick={navbarToggleHandler}
                className="absolute top-4 left-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-800" />
              </button>

              {navdata.map((menuItem, index) => (
                <div key={index} className="border-b border-gray-100 pb-4">
                  {menuItem.path ? (
                    <Link
                      href={
                        menuItem.title === 'Fabrics'
                          ? `/categorypage/${encodeURIComponent('fabrics & textiles')}`
                          : menuItem.title === 'Spices'
                          ? `/categorypage/${encodeURIComponent('vegetable & spice')}`
                          : menuItem.path
                      }
                      onClick={navbarToggleHandler}
                      className="block py-2 text-lg font-medium text-gray-900 hover:text-green-600 transition-colors"
                    >
                      {menuItem.title}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleSubmenu(index)}
                        className="flex items-center justify-between w-full py-2 text-lg font-medium text-gray-900 hover:text-green-600 transition-colors"
                      >
                        {menuItem.title}
                        <svg
                          className={`w-5 h-5 ml-2 transition-transform ${
                            openIndex === index ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div
                        className={`pl-4 mt-2 space-y-2 ${
                          openIndex === index ? 'block' : 'hidden'
                        }`}
                      >
                        {menuItem.submenu.map((submenuItem: any, subIndex: any) => (
                          <Link
                            key={subIndex}
                            href={
                              menuItem.title === 'Quick links'
                                ? submenuItem.path
                                : `/categorypage/${encodeURIComponent(submenuItem.title)}`
                            }
                            onClick={navbarToggleHandler}
                            className="block py-2 text-base text-gray-600 hover:text-green-600 transition-colors"
                          >
                            {submenuItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-6">
                {isLoggedIn && user ? (
                  <div className="space-y-4">
                    <Link
                      href="/dashboard"
                      onClick={navbarToggleHandler}
                      className="block w-full px-4 py-3 text-center font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        navbarToggleHandler();
                        // You'll need to handle logout here
                      }}
                      className="block w-full px-4 py-3 text-center font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      href="/authpages/signin"
                      onClick={navbarToggleHandler}
                      className="block w-full px-4 py-3 text-center font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/authpages/signup"
                      onClick={navbarToggleHandler}
                      className="block w-full px-4 py-3 text-center font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default OldNavBar;