

const CookieWarningPage = ()=>{
    return (
        <div className="">
           
            <div  className="relative md:flex h-[-500px] w-[-500px] z-[1000]   gap-5 px-4 transition duration-800 ease-out">
            <p className="text-center ">This website uses cookies and other tracking technologies to 
                enhance user experience and
                 to analyze performance and traffic on our website. We also share information about your use of 
                 our site with our social media, advertising and analytics partners. 
                 If we have detected an opt-out preference signal then 
                it will be honored. Further information is available in our Cookie Policy</p>

                <div className="absolute right-5 flex flex-col gap-5">
                    <button className="bg-green-600 text-white ">Do not sell or share my personal information</button>
                    <button className="bg-green-600 text-white">Reject All</button>
                    <button className="bg-green-600 text-white">Accept Cookies</button>
                </div>
            </div>
        </div>
    )
}

export default CookieWarningPage