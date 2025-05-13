'use client';

import Link from "next/link";
import { useState, useEffect, FormEvent, useContext } from 'react';
import { login } from "../../../../../components/auth";
import ReactMarkdown from 'react-markdown';
import { GeneralContext } from "../../../../../contextProviders/GeneralProvider";
import LoadingState from "../../../../../components/LoadingState";


const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('Login to your account for a faster checkout.');
  const generalContextContext = useContext(GeneralContext);
  const { isLoading, setIsLoading} = generalContextContext;

  const handleLogin = async (e: FormEvent) => {
    try{
    e.preventDefault();
    setIsLoading(true)
    setError('');
    if(!email){
      setError('Please input email')
      return
    }
    const response: any = await login(email);
    if(!response) {
      setError('No response from server')
      return
    }
    
    if (response.ok) {
      setMessage(response.message);
      setEmail('');
    } else {
      console.log(response.error)
      setError('Error response');
    }
  }catch(err){
    setError('Something went wrong');
    console.log(err)
  }finally{
    setIsLoading(false)
  }
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const user: any = getUser()
  //     if(user){
  //     window.location.href = `/dashboard/${user.type}`
  //     }
  //   }
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <section className="relative z-10 overflow-hidden py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full max-w-md">
              <div className="shadow-lg rounded-xl bg-white/90 backdrop-blur-sm px-8 py-12 dark:bg-gray-900/80">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sign in to your account
                  </p>
                </div>

                <div className={`mb-6 text-center text-md font-medium ${
                  error ? "text-red-600 dark:text-red-400" : "text-green-700 "
                }`}>
                  {error ? error : <ReactMarkdown>{message}</ReactMarkdown>}
                </div>

                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Get Magic Link
                    {isLoading ? <LoadingState /> : null}
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/authpages/signup"
                    className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-100/30 to-green-200/20 dark:from-green-900/10 dark:to-green-800/10"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/images/auth-pattern.svg')] bg-repeat opacity-10 dark:opacity-5"></div>
        </div>
      </section>
    </div>
  );
};

export default SigninPage;