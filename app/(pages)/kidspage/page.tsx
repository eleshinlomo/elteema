import { Button } from "../../../components/ui/button"

const KidsPage = ()=>{
    return (
        <div className="px-4">
            <h1 className=" mt-32 text-green-700 font-extrabold text-center pt-8">ARE YOU A FARMER OR DO YOU HAVE A FARM?</h1>

            <div className=" gap-5 py-2">
            {/* Text */}
            <div className="pb-4">
            <h3 className='text-green-700 font-extrabold'>Hello Farmers,</h3>
            <p className='flex flex-col flex-wrap w-full '>We invite you to join us and start selling directly to millions of customers today.
             By opening an account, you&apos;ll benefit from our innovative platform that eliminates the traditional barriers in the market. 
             We simplify the process by removing the need 
            for farmers to transport their produce to the market before finding buyers.</p>
            </div>
            
            {/* Form */}
            <div className="text-center w-full mt-5 ">
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

export default KidsPage