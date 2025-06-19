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
        <div className={`relative min-h-screen transition-colors duration-300 ${sticky ? 'pt-10' : 'pt-10'}`}
             style={{
                 background: "linear-gradient(135deg, #f0fff4 0%, #e6fffa 50%, #f0fff4 100%)",
                 backgroundImage: "radial-gradient(circle at 10% 20%, rgba(178, 245, 234, 0.2) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(178, 245, 234, 0.2) 0%, transparent 20%)"
             }}>
            {/* Subtle leaf pattern in the background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                 style={{
                     backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 12.627a4 4 0 0 0-5.656 0L36 25.657l-4.971-4.971a4 4 0 0 0-5.657 0L12.627 36.97a4 4 0 0 0 0 5.657L25.657 54.6a4 4 0 0 0 5.657 0l12.728-12.728a4 4 0 0 0 0-5.657L36 30.343l12.627-12.627a4 4 0 0 0 0-5.657l-4.971-4.971z' fill='%2348bb78' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")"
                 }}>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 w-full pt-6 relative z-10">

                {/* Left Sidebar - Fixed */}
                <div className="">
                    <motion.div 
                        className={`hidden md:block sticky ${sticky ? 'top-16' : 'top-4'} h-[calc(100vh-2rem)]`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 h-full border border-green-200/50 mr-2 hover:shadow-green-200/50 transition-all duration-300">
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
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 h-full border border-green-200/50 ml-2 hover:shadow-green-200/50 transition-all duration-300">
                        <Trending />
                    </div>
                </motion.div>
            </div>

            {/* Mobile Overlay */}
            {windowWidth < 1024 && showSearch && 
                <motion.div 
                    className="fixed inset-0 bg-white/95 z-30 overflow-y-auto transition-colors duration-300 pt-6"
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