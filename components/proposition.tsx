export default function Proposition() {
    return (
      <section className="relative shadow-2xl bg-white/50 rounded-2xl">
  
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0  pointer-events-none" aria-hidden="true"></div>
        
  
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-8">
  
            {/* Section header */}
            {/* <div className="max-w-3xl mx-auto text-center pb-4 md:pb-4">
              <h2 className="text-2xl mb-4">Shop with ease from qualified Farmers</h2>
              <p className="text-xl text-gray-600">Why join us.</p>
            </div> */}
  
            {/* Items */}
            <div className="max-w-sm mx-auto text-white grid gap-6 md:grid-cols-2 lg:grid-cols-3 
            items-start md:max-w-2xl lg:max-w-none">
  
              {/* 1st item */}
              <div className="relative flex flex-col items-center p-6 bg-green-500  rounded-2xl shadow-xl">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-green-600" width="64" height="64" rx="32" />
                    <g strokeWidth="2">
                      <path className="stroke-current text-blue-300" d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285" />
                      <path className="stroke-current text-white" d="M20.571 37.714h5.715L36.57 26.286h8" />
                      <path className="stroke-current text-blue-300" strokeLinecap="square" d="M41.143 34.286l3.428 3.428-3.428 3.429" />
                      <path className="stroke-current text-white" strokeLinecap="square" d="M41.143 29.714l3.428-3.428-3.428-3.429" />  
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  QUALIFIED SUPPLIERS</h4>
                <p className=" text-center">
                  90% of our suppliers are Farmers. This ensures you only buy fresh.</p>
              </div>
  
              {/* 2nd item */}
              <div className="relative flex flex-col items-center p-6 bg-green-500  rounded-2xl shadow-xl">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-green-600" width="64" height="64" rx="32" />
                    <g strokeWidth="2" transform="translate(19.429 20.571)">
                      <circle className="stroke-current text-white" strokeLinecap="square" cx="12.571" cy="12.571" r="1.143" />
                      <path className="stroke-current text-white" d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696" />
                      <path className="stroke-current text-blue-300" d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835" />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  SHOP FROM FARM</h4>
                <p className=" text-center">
                  Your orders are filled directly from the farm.</p>
              </div>
  
              {/* 3rd item */}
              <div className="relative flex flex-col items-center p-6 bg-green-500  rounded-2xl shadow-xl">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-green-600" width="64" height="64" rx="32" />
                    <g strokeWidth="2">
                      <path className="stroke-current text-blue-300" d="M34.743 29.714L36.57 32 27.43 43.429H24M24 20.571h3.429l1.828 2.286" />
                      <path className="stroke-current text-white" strokeLinecap="square" d="M34.743 41.143l1.828 2.286H40M40 20.571h-3.429L27.43 32l1.828 2.286" />
                      <path className="stroke-current text-blue-300" d="M36.571 32H40" />
                      <path className="stroke-current text-white" d="M24 32h3.429" strokeLinecap="square" />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">PAYMENT PROTECTION</h4>
                <p className=" text-center">We ensure all purchases are fulfilled as expected.</p>
              </div>
  
  
            </div>
  
          </div>
        </div>
      </section>
    )
  }