
// const MobileMenu = ()=>{
//     return (
//         <div>

                  {/* Mobile Toggle Button */}
            {/* <div className="mx-4">
            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label="Mobile Menu"
              className="relative flex h-10 w-10 flex-col rounded-lg bg-white/10 p-2 ring-2 ring-transparent transition-all duration-300 hover:bg-white/20 hover:ring-white/20 focus:outline-none focus:ring-white/30 lg:hidden"
            >
              <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${navbarOpen ? 'top-1/2 rotate-45' : 'top-3'}`} />
              <span className={`absolute top-1/2 block h-0.5 w-6 bg-current transition-all duration-300 ${navbarOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${navbarOpen ? 'top-1/2 -rotate-45' : 'bottom-3'}`} />
            </button>
            </div> */}
        //   </div>
//              <nav
//           className={`navbar lg:hidden absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white text-green-800 px-6 py-4 
//             duration-300 dark:border-body-color/20 dark:bg-dark ${
//             navbarOpen ? "visible top-full opacity-100" : "invisible top-[120%] opacity-0"
//           }`}
//         >
//           <ul className="block">
//             {navdata.map((menuItem, index) => (
                
//             //   <li key={index} className="group relative">
//             //     {menuItem.path ? (
//             //       <Link
//             //         href={menuItem.path}
//             //         className={`flex py-2 text-base`}
//             //         onClick={() => setNavbarOpen(false)}
//             //       >
//             //         {menuItem.title}
//             //       </Link>
//             //     ) : (
//             //       <>
//             //         <p
//             //           onClick={() => handleSubmenu(index)}
//             //           className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white"
//             //         >
//             //           {menuItem.title}
//             //           <span className="pl-3">
//             //             <svg width="25" height="24" viewBox="0 0 25 24">
//             //               <path
//             //                 fillRule="evenodd"
//             //                 clipRule="evenodd"
//             //                 d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
//             //                 fill="currentColor"
//             //               />
//             //             </svg>
//             //           </span>
//             //         </p>
//             //         <div
//             //           className={`pl-4 ${
//             //             openIndex === index ? "block" : "hidden"
//             //           }`}
//             //         >
//             //           {menuItem.submenu.map((submenuItem: any, subIndex: any) => (
//             //             <Link
//             //               href={menuItem.title === 'Quick links' ?  
//             //               submenuItem.path : `/categorypage/${encodeURIComponent(submenuItem.title)}`} 
//             //               key={subIndex}
//             //               className="block rounded py-2 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
//             //               onClick={() => setNavbarOpen(false)}
//             //             >
//             //               {submenuItem.title}
//             //             </Link>
//             //           ))}
//             //         </div>
//             //       </>
//             //     )}
//             //   </li>
//             ))}
//             {/* Mobile Right Side */}
//             {/* <li className="lg:hidden pr-6">
//               <NavRightSide  />
//             </li> */}
//           </ul>
//         </nav>
//         </div>
//     )
// }