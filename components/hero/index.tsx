'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeroData } from './herodata';
import { Button } from '../ui/button';

const Hero = () => {
    const [herocontent, setHerocontent] = useState<React.ReactNode>();

    const loadImages = () => {
        
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <div className="w-full  hover-bg-green-300 transition-all duration-200 transform hover:scale-100">

          {HeroData.map((data, index) => 
            
              <div key={index} className="relative w-full h-[200px] md:h-[200px] lg:h-[200px] overflow-hidden">
                <Image
                  src={data.src}
                  alt="hero image"
                  fill
                  className="object-cover"
                  />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center">
                  <p className="text-white text-2xl font-extrabold mb-4 px-4">
                      {data.content}
                  </p>
                  <a href="/">
                            <Button className="bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 px-6 text-lg transition-all duration-300 transform hover:scale-105">
                                SHOP NOW
                            </Button>
                        </a>
                </div>
              </div>
            )
          };
          
            
        </div>
    );
};

export default Hero;