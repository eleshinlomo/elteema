import { Button } from "./ui/button"

const CookieWarningPage = ()=>{
    return (
        <div className="relative">
            <div className="absolute   z-50 md:flex gap-5 px-4 transition duration-800 ease-out">
            <p className=" flex flex-wrap mt-8">This website uses cookies and other tracking technologies to enhance user experience and
                 to analyze performance and traffic on our website. We also share information about your use of 
                 our site with our social media, advertising and analytics partners. 
                 If we have detected an opt-out preference signal then 
                it will be honored. Further information is available in our Cookie Policy</p>

                <div className="flex flex-col gap-5">
                    <Button className="bg-green-600 text-white ">Do not sell or share my personal information</Button>
                    <Button className="bg-green-600 text-white">Reject All</Button>
                    <Button className="bg-green-600 text-white">Accept Cookies</Button>
                </div>
            </div>
        </div>
    )
}

export default CookieWarningPage