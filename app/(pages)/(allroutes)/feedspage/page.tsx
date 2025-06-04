'use client'
import { useContext, useEffect, useState } from "react";
import Feeds from "../../../../components/feed/feeds";
import Featured from "../../../../components/product/featured";
import Trending from "../../../../components/product/trending";
import { GeneralContext } from "../../../../contextProviders/GeneralProvider";
import FeaturedMobile from "../../../../components/product/featuredMobile";

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

    // Calculate main content margin based on window width
    const getMainContentMargin = () => {
        if (windowWidth >= 1536) { // xl screens
            return 'mx-auto';
        } else if (windowWidth >= 1280) { // lg screens
            return 'mx-auto';
        } else if (windowWidth >= 1024) { // md screens
            return 'ml-[450px] mr-[450px]';
        } else {
            return 'mx-auto';
        }
    };

    return (
        <div className="bg-gray-50 text-gray-800">
            {/* Left Sidebar - Hidden on small screens */}
            <aside
                className={`hidden lg:block w-[450px] fixed left-0 bottom-0 z-20 transition-all duration-300 ease-in-out
                    ${sticky ? "top-[10%]" : "top-[25%]"}`}
            >
                <div className="h-full p-4">
                    <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
                        <Featured />
                    </div>
                </div>
            </aside>

            {/* Main Content - Responsive margins */}
            <main className={`transition-all duration-300 ${getMainContentMargin()}`}>
                <div className={`max-w-xl mx-auto px-4 sm:px-6 mt-8 ${windowWidth < 1024 ? 'w-full' : ''}`}>
                    {showSearch ? (
                        <FeaturedMobile setShowSearch={setShowSearch} />
                    ) : (
                        <Feeds setShowSearch={setShowSearch} />
                    )}
                </div>
            </main>

            {/* Right Sidebar - Hidden on small screens */}
            <aside
                className={`hidden lg:block w-[450px] fixed right-0 bottom-0 z-20 transition-all duration-300 ease-in-out
                    ${sticky ? "top-[10%]" : "top-[25%]"}`}
            >
                <div className="h-full p-4">
                    <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
                        <Trending />
                    </div>
                </div>
            </aside>

            {/* Mobile overlays - Only show on mobile screens */}
            {windowWidth < 1024 && (
                <>
                    {showSearch && (
                        <div className="fixed inset-0 bg-white z-30 overflow-y-auto">
                            <FeaturedMobile setShowSearch={setShowSearch} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FeedsPage;