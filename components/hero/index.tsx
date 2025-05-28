'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeroData } from './herodata';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-advance slides
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HeroData.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [HeroData.length, isAutoPlaying]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // Optionally, restart auto-play after manual interaction
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % HeroData.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToPrev = () => {
        setCurrentSlide((prev) => (prev - 1 + HeroData.length) % HeroData.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden group">
            {/* Slides */}
            {HeroData.map((hero, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <Image
                        src={hero.src}
                        alt="hero image"
                        fill
                        className="object-cover"
                        priority={index === currentSlide}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center">
                        <p className="text-white text-2xl md:text-4xl font-extrabold mb-4 px-4">
                            {hero.content}
                        </p>
                        {/* <a href={hero.path}>
                            <button className="bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 px-6 text-lg transition-all duration-300 transform hover:scale-105">
                                SHOP NOW
                            </button>
                        </a> */}
                    </div>
                </div>
            ))}

            {/* Navigation arrows */}
            <button 
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
            >
                &lt;
            </button>
            <button 
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
            >
                &gt;
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {HeroData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-green-500 w-6' : 'bg-white bg-opacity-50 hover:bg-opacity-100'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;