'use client';

import { FormEvent, useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingState from "../../../../../../components/LoadingState";
import { GeneralContext } from "../../../../../../contextProviders/GeneralProvider";
import { register } from "../../../../../../components/api/users";

const SignupPage = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('It is totally free and super fast');
  const [isRegistered, setIsRegistered] = useState(false)
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const generalContext = useContext(GeneralContext)
  const {isLoading, setIsLoading} = generalContext

  const handleRegister = async (e: FormEvent) => {
    try{
    e.preventDefault();
    setIsLoading(true)
    if (!username) {
      setError('Please provide a username');
      return;
    }
    if (!email) {
      setError('Please provide an email');
      return;
    }
    if (!termsChecked) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setError('');
    const payload = { email, username };
    const response: any = await register(payload);

    if (response.ok) {
      setMessage(response.message);
      setUsername('');
      setEmail('');
      setIsRegistered(true)
      window.location.href = '#signup-top';
    } else {
      setError(response.error);
    }
  }catch(err){
    console.log(err)
  }finally{
    setIsLoading(false)
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100" id='signup-top'>
      <section className="relative z-10 overflow-hidden py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full max-w-md">
              <div className="shadow-lg rounded-xl bg-white/90 backdrop-blur-sm px-8 py-12 dark:bg-gray-900/80">
                <div className="relative h-16 w-24">
                    <Image
                                    src='/images/logos/elteema_logo.png'
                                    alt="logo"
                                    width={180}
                                    height={100}
                                    className="w-12 dark:hidden"
                                  />
                </div>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {!isRegistered ? 'Create Driver Account' : 'Please sign in'}
                  </h1>
                  {!isRegistered ? <p className="text-gray-600 dark:text-gray-300">
                    Join us today - it&apos;s free and only takes a minute
                  </p>: null}
                </div>

                <div className={`mb-6 text-center text-md font-medium ${
                  error ? "text-red-600 dark:text-red-400" : "text-green-800 font-extrabold dark:text-gray-400"
                }`}>
                  {error || message}
                </div>

                {/* Form */}
               {!isRegistered ?
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={username.toLowerCase()}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

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

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={termsChecked}
                        onChange={(e) => setTermsChecked(e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                        I agree to the{' '}
                        <a href="#" className="text-green-600 hover:text-green-500 dark:text-green-400">
                          Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-green-600 hover:text-green-500 dark:text-green-400">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={handleRegister}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Sign Up
                    {isLoading ? <LoadingState /> : null}
                  </button>
                </form>: null}
                {/* Form end */}

                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400" id='signup-bottom'>
                  Already have an account?{' '}
                  <Link
                    href="/authpages/signin"
                    className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
                  >
                    Sign in
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

export default SignupPage;