

// import Logo from './logo'
import Link from 'next/link'
import { year } from './utils'
import Image from 'next/image'


const Footer = ()=>{
  return (
    <footer>
      <div className=" mx-auto sm:px-6 bg-black text-white/60 hover:text-white ">

        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t
         border-gray-200">

          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="relative h-16 w-16 mb-2">
              <Image src='/images/logos/elteema_logo.png' alt='logo' fill />
            </div>
            <div className="text-sm text-white">
              <a href="terms" className="  hover:underline transition duration-150 ease-in-out">Terms</a> · 
              <Link href="/privacy" className="  
              hover:underline transition duration-150 ease-in-out">Privacy Policy</Link>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 ">
            <h6 className="text-green-300 font-medium mb-2">Services</h6>
            <ul className="text-sm">
            <li className="mb-2">
                <Link href="/" className="  
                transition duration-150 ease-in-out">Clearance</Link>
              </li>
              <li className="mb-2">
                <Link href="/" className=" hover:text-green-400 
                transition duration-150 ease-in-out">Same day delivery</Link>
              </li>
              
              <li className="mb-2">
                <a href="/" className=" hover:text-green-400 
                transition duration-150 ease-in-out">Elteema Ads </a>
              </li>
              <li className="mb-2">
                <a href="#" className=" hover:text-green-400 
                transition duration-150 ease-in-out">Bulk supply</a>
              </li>
              <li className="mb-2">
                <a href="#" className=" hover:text-green-400 
                transition duration-150 ease-in-out">Sell on Elteema</a>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className=" sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className=" font-medium mb-2 text-green-300">Resources</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <a href="#0" className="  
                transition duration-150 ease-in-out">Documentation</a>
              </li>
              <li className="mb-2">
                <a href="#0" className=" hover:text-green-400  transition duration-150 ease-in-out">Tutorials & Guides</a>
              </li>
              <li className="mb-2">
                <a href="#0" className=" hover:text-green-400  transition duration-150 ease-in-out">Blog</a>
              </li>
              <li className="mb-2">
                <a href="#0" className="hover:text-green-400  transition duration-150 ease-in-out">Support Center</a>
              </li>
              <li className="mb-2">
                <a href="#0" className=" hover:text-green-400  transition duration-150 ease-in-out">Partners</a>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-green-300 font-medium mb-2">Company</h6>
            <ul className="text-sm">
            <Link href="/" className=" transition duration-150 ease-in-out">
              <li className="mb-2">
                Home
              </li>
              </Link>
              <li className="mb-2">
                <a href="/aboutpage" className=" hover:text-green-400  transition duration-150 ease-in-out">About us</a>
              </li>
              <li className="mb-2">
                <a href="#0" className=" hover:text-green-400  transition duration-150 ease-in-out">Company values</a>
              </li>
              <li className="mb-2">
                <a href="#0" className=" hover:text-green-400  transition duration-150 ease-in-out">Pricing</a>
              </li>
              <li className="mb-2">
                <Link href="/privacy" className=" hover:text-green-400 
                transition duration-150 ease-in-out">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className=" font-medium mb-2 text-green-300">Newsletter</h6>
            <p className="text-sm  mb-4">Get the latest news and articles to your inbox every month.</p>
            
                <button className='bg-green-800 rounded-2xl px-4 py-2'>Shop for discounts</button>
          </div>
          

        </div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">

          {/* Social as */}
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <a href="#0" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Twitter">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                </svg>
              </a>
            </li>
            <li className="ml-4">
              <a href="#0" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Github">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                </svg>
              </a>
            </li>
            <li className="ml-4">
              <a href="#0" className="flex justify-center items-center
               text-gray-600 hover:text-gray-900 bg-white 
               hover:bg-white-100 rounded-full shadow transition 
               duration-150 ease-in-out" aria-label="Facebook">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" 
                xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                </svg>
              </a>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className="text-sm text-gray-600 mr-4">
            &copy; Elteema. All rights reserved {year}.</div>

        </div>

        <div className='text-center pb-3'>Built by <a href='https://myafros.com' className='text-blue-500'>myafros.com</a></div>

      </div>
    </footer>
  )
}

export default Footer