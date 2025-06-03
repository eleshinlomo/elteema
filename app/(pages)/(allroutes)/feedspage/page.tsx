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

    useEffect(() => {
        const handleScroll = () => {
            const isPast20 = window.scrollY > window.innerHeight * 0.2;
            if (isPast20 !== scrolledPast20) {
                setScrolledPast20(isPast20);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolledPast20]);

    return (
        <div className="bg-gray-50  text-gray-800">
            {/* Left Sidebar */}
            <aside
                className={`hidden sm:block w-[450px]  fixed left-0 bottom-0 z-20 transition-all duration-300 ease-in-out
                    ${sticky ? "top-[10%]" : "top-[25%]"}`}
            >
                <div className="h-full p-4">
                    <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
                        <Featured />
                    </div>
                </div>
            </aside>

            {/* Main Content - Centered */}
            <main className={`mx-auto transition-all duration-300 ${sticky ? "" : ""}`}>
                <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
                    {showSearch ? (
                        <FeaturedMobile setShowSearch={setShowSearch} />
                    ) : (
                        <Feeds setShowSearch={setShowSearch} />
                    )}
                </div>
            </main>

            {/* Right Sidebar */}
            <aside
                className={`hidden sm:block w-[450px] fixed right-0 bottom-0 z-20 transition-all duration-300 ease-in-out
                    ${sticky ? "top-[10%]" : "top-[25%]"}`}
            >
                <div className="h-full p-4">
                    <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
                        <Trending />
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default FeedsPage;