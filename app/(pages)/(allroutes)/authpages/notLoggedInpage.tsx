const NotLoggedInPage = () => {
    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <svg 
                            className="w-12 h-12 text-green-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
                <p className="text-gray-600 mb-6">Please log in to access this page</p>
                <a href='/authpages/signin'>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                    Log In
                    </button>
                </a>
                <p className="mt-4 text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <a href="/authpages/signup" className="text-green-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    )
}

export default NotLoggedInPage