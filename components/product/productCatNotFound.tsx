interface CatNotFoundProps {
    category: string;
}

const CategoryNotFound = ({ category }: CatNotFoundProps) => {
    const decodedCategory = decodeURIComponent(category);
    
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-center">
                    <div className="inline-flex items-center justify-center bg-white/20 rounded-full p-4 mb-4">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-12 w-12 text-white" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        No items found in {decodedCategory}
                    </h2>
                    <p className="text-white/90">
                        We couldn&apos;t find any products matching this category
                    </p>
                </div>
                
                {/* Main content */}
                <div className="p-8 text-center">
                 
                    
                    <h3 className="text-2xl font-extrabold text-gray-800 mb-4">
                        Be the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">first</span> to sell {decodedCategory}!
                    </h3>
                    
                    <p className="text-gray-600 mb-8">
                        Join our marketplace and reach thousands of customers looking for {decodedCategory}.
                    </p>
                    
                    <div className="space-y-4">
                        <a 
                            href="/sellerspage" 
                            className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            SELL ON ELTEEMA
                        </a>
                        
                        <p className="text-sm text-gray-500">
                            or <a href="/allstorespage" className="text-green-600 hover:underline">browse other categories</a>
                        </p>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
                    Can&apos;t find what you&apos;re looking for? <a href="/contactpage" className="text-green-600 hover:underline">Let us know</a>
                </div>
            </div>
        </div>
    );
};

export default CategoryNotFound;