

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
              <a href="/policies/terms" className="  hover:underline transition duration-150 ease-in-out">Terms</a> · 
              <Link href="/policies/privacypolicy" className="  
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
                <a href="/authpages/seller/signup" className=" hover:text-green-400 
                transition duration-150 ease-in-out">Sell on Elteema</a>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className=" sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className=" font-medium mb-2 text-green-300">Resources</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <a href="/authpages/driver/signup" className="  
                transition duration-150 ease-in-out">Deliver for Elteema</a>
              </li>
              <li className="mb-2">
                <a href="#0" className=" hover:text-green-400  transition duration-150 ease-in-out">Tutorials & Guides</a>
              </li>
              <li className="mb-2">
                <a href="#0" className=" hover:text-green-400  transition duration-150 ease-in-out">Blog</a>
              </li>
              <li className="mb-2">
                <a href="/faqpage" className="hover:text-green-400  transition duration-150 ease-in-out">Support Center</a>
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
                <a href="/contactpage" className=" hover:text-green-400  transition duration-150 ease-in-out">Contact us</a>
              </li>
              <li className="mb-2">
                <a href="#0" className=" hover:text-green-400  transition duration-150 ease-in-out">Pricing</a>
              </li>
              <li className="mb-2">
                <Link href="/policies/privacypolicy" className=" hover:text-green-400 
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
            {/* Facebook */}
                <li className="ml-4">
              <a href="https://www.facebook.com/elteemaecommerce" target='_blank' className="flex justify-center items-center
               text-gray-600 hover:text-gray-900 bg-white 
               hover:bg-white-100 rounded-full shadow transition 
               duration-150 ease-in-out" aria-label="Facebook">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" 
                xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                </svg>
              </a>
            </li>
            
              {/* Instagram */}
       <li>
  <a 
    href="https://www.instagram.com/elteemaecommerce/" 
    target="_blank"
    className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" 
    aria-label="Instagram"
  >
    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 7.2c2.4 0 2.7 0 3.6.1 2.4.1 3.6 1.3 3.7 3.7.1.9.1 1.2.1 3.6s0 2.7-.1 3.6c-.1 2.4-1.3 3.6-3.7 3.7-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-2.4-.1-3.6-1.3-3.7-3.7-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c.1-2.4 1.3-3.6 3.7-3.7.9-.1 1.2-.1 3.6-.1m0-2.2c-2.5 0-2.8 0-3.8.1-3.3.1-5.4 2.2-5.6 5.6C6.4 12.3 6.4 12.7 6.4 16s0 2.8.1 3.8c.1 3.3 2.2 5.4 5.6 5.6 1 .1 1.3.1 3.8.1s2.8 0 3.8-.1c3.3-.1 5.4-2.2 5.6-5.6.1-1 .1-1.3.1-3.8s0-2.8-.1-3.8c-.1-3.3-2.2-5.4-5.6-5.6-1-.1-1.3-.1-3.8-.1Zm0 5.8a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Zm0 6.9a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.4-7.1a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
    </svg>
  </a>
</li>


            
             {/* Linkedin */}
            <li>
               <a 
                href="https://www.linkedin.com/company/elteema" 
                target='_blank'
                className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" 
                aria-label="LinkedIn"
              >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.2 4H5.8C4.8 4 4 4.8 4 5.7v20.5c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V5.7c0-.9-.8-1.7-1.8-1.7ZM11.1 24.4H7.6V13h3.5v11.4Zm-1.7-13c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.2-.9 2.1-2.1 2.1Zm15.3 13h-3.5v-6.2c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3v6.4h-3.5V13h3.3v1.7h.1c.5-.9 1.7-2 3.4-2 3.6 0 4.3 2.4 4.3 5.5v6.2Z"/>
              </svg>
              </a>
            </li>
            
          </ul>

          {/* Copyrights note */}
          <div className="text-sm text-gray-600 mr-4">
            &copy; Elteema. All rights reserved {year}.</div>

        </div>

        <div className='text-center pb-3'><a href='#' className='text-blue-500'>&copy; {year} Elteema</a></div>

      </div>
    </footer>
  )
}

export default Footer