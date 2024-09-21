'use client'
import React from "react"
import Image from "next/image"
import { HeroData } from "./herodata"
import {useState, useEffect} from 'react'
import { Button } from "../ui/button"

interface HeroProps {
    herocontent: string | React.ReactNode
}

const Hero = ()=>{

    const [herocontent, setHerocontent] = useState<React.ReactNode>()

    const loadImages = ()=>{

        HeroData.map((data)=>{
         setTimeout(()=>{
           setHerocontent(
            
            <div className="relative text-center grid grid-row w-full h-[500px]">
           <Image src={data.src} alt='image' fill />
           <p className={`absolute top-[200px] right-[0px] left-[0px] z-[50] text-white py-12 px-4  
            text-2xl font-extrabold`}>{data.content}</p>
           <a className="absolute top-[350px] left-0 right-0  md:top-[350px] lg:top-[350px]" href="/"><Button className=" 
           bg-green-600 hover:bg-green-600 text-white font-extrabold ">SHOP NOW</Button></a>

           
           </div>
           
           )
         }, 0)



        })
    }

    useEffect(()=>{
        loadImages()
    }, [])
    
  return (
    <div className="flex flex-col justify-center items-center shadow-2xl mt-4 "> 
    
     {herocontent}
    </div>
  )
}

export default Hero