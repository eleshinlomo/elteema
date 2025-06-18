'use client';
import { useContext, useEffect, useState } from "react";
import Feeds from "./feeds";
import Featured from "../../../../components/product/featured";
import Trending from "../../../../components/product/trending";
import { GeneralContext } from "../../../../contextProviders/GeneralProvider";
import FeaturedMobile from "../../../../components/product/featuredMobile";
import { motion, AnimatePresence } from "framer-motion";

const FeedsPage = () => {
    const { sticky } = useContext(GeneralContext);
    const [scrolledPast20, setScrolledPast20] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleScroll = () => {
            const isPast20 = window.scrollY > window.innerHeight * 0.2;
            if (isPast20 !== scrolledPast20) {
                setScrolledPast20(isPast20);
            }
        };

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [scrolledPast20]);

    return (
        <div className={`relative bg-green-50 text-green-900 min-h-screen transition-colors duration-300 ${sticky ? 'pt-10' : 'pt-10'} `}>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 w-full pt-6">

                {/* Left Sidebar - Fixed */}
                <div className="">
                    <motion.div 
                        className={`hidden md:block sticky ${sticky ? 'top-16' : 'top-4'} h-[calc(100vh-2rem)]`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="bg-green-100 rounded-2xl shadow-lg p-4 h-full border border-green-200 mr-2">
                            <Featured />
                        </div>
                    </motion.div>
                </div>

                {/* Main Content - Centered */}
                <div className="col-span-1 md:col-span-1">
                    {showSearch ? (
                        <FeaturedMobile setShowSearch={setShowSearch} />
                    ) : (
                        <Feeds setShowSearch={setShowSearch} />
                    )}
                </div>

                {/* Right Sidebar - Fixed */}
                <motion.div 
                    className={`hidden md:block sticky ${sticky ? 'top-16' : 'top-4'} h-[calc(100vh-2rem)]`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <div className=" rounded-2xl shadow-lg p-4 h-full border border-green-200 ml-2">
                        <Trending />
                    </div>
                </motion.div>
            </div>

            {/* Mobile Overlay */}
            {windowWidth < 1024 && showSearch && 
                <motion.div 
                    className="fixed inset-0  z-30 overflow-y-auto transition-colors duration-300 pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FeaturedMobile setShowSearch={setShowSearch} />
                </motion.div>
            }
        </div>
    );
};

export default FeedsPage;