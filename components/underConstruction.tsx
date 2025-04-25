
interface UnderConstructionProps {
    message: string
}


const PageUnderConstruction = ({message}: UnderConstructionProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-peach-600">
            <div className="text-center p-8 bg-white rounded-lg shadow-2xl transform transition-all hover:scale-105">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-pulse">
                    🚧 Under Construction 🚧
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    {message}
                </p>
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center animate-bounce">
                        <svg
                            className="w-8 h-8 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageUnderConstruction;