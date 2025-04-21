import { ArrowUp } from "lucide-react"

const ScrollTopButton = ()=>{
    
    return (

        <div className="relative">
           <div className="fixed left-[70%] md:left-[90%] lg:left-[90%] bottom-[10%] z-[9999]">
            <a href='#top'>
            <button className="bg-green-400 p-4"><ArrowUp /></button>
            </a>
           </div>
        </div>
    )
}

export default ScrollTopButton