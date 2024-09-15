'use client'
import React from "react"
import dresses from '@/public/images/dresses.jpg'
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
           <div className="relative w-full h-[500px]">
           <Image src={data.src} alt='image' fill />
           <div className="absolute top-12 left-0 right-0 bottom-0 md:top-56 md:left-0 lg:top-56 lg:left-0">
            <p className={`text-white py-12 px-4  text-2xl font-extrabold`}>{data.content}</p>
           <Button className=" bg-green-600 text-white ">SHOP NOW</Button>
            </div>

           </div>)
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