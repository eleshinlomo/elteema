import { Button } from "@/components/ui/button"

const SupplierPage = ()=>{
    return (
        <div className="px-4">
            <h1 className="py-8 mt-4 text-green-700 font-extrabold text-center">ARE YOU A FARMER OR DO YOU HAVE A FARM?</h1>

            <div className="md:flex gap-5 py-2">
            {/* Text */}
            <div className="pb-4">
            <h3 className='text-green-700 font-extrabold'>Hello Farmers,</h3>
            <p className='flex flex-wrap w-full lg:w-1/2 '>We invite you to get onboard. Open an account and start
             selling directly to millions of customers today. 
            We are breaking the barriers that comes with traditional market by removing the need 
            for farmers to transport their produce to the market before finding customers to purchase their produce.</p>
            </div>
            
            {/* Form */}
            <div className="text-center w-full lg:w-1/2">
            <h3 className='text-green-700 font-extrabold'>Join our suppliers and start selling to millions of customers today.</h3>
             <form className="flex flex-col justify-center items-center gap-3 py-4">
                <input 
                placeholder="Enter your name" 
                className="border border-green-500 rounded-2xl px-2"
                name='name'
                 />
                 <input 
                placeholder="Enter your email" 
                className="border border-green-500 rounded-2xl px-2"
                name='email'
                 />

                 <Button type='submit' className="bg-green-600 rounded-2xl text-white hover:bg-green-600">Submit</Button>
             </form>
            </div>
            </div>
        </div>
    )
}

export default SupplierPage