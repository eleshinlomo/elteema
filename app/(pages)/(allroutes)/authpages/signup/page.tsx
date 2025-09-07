'use client';

import { FormEvent, useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingState from "../../../../../components/LoadingState";
import { GeneralContext } from "../../../../../contextProviders/GeneralProvider";
import { register } from "../../../../../components/api/users";

const SignupPage = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('It is totally free and super fast');
  const [isRegistered, setIsRegistered] = useState(false);
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const generalContext = useContext(GeneralContext);
  const { isLoading, setIsLoading } = generalContext;

  const handleRegister = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
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
        setIsRegistered(true);
        window.location.href = '#signup-top';
      } else {
        setError(response.error);
      }
    } catch (err) {
      console.log(err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12" id="signup-top">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Illustration */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-green-600 to-green-800 p-8 text-white flex flex-col justify-center items-center hidden md:flex">
          <div className="w-full max-w-xs mb-8">
            <div className="relative h-64">
              <svg viewBox="0 0 500 500" className="w-full h-full">
                <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
                  <path d="M2320 4990 c-494 -48 -942 -251 -1315 -595 -226 -209 -418 -486 -528 -760 -117 -291 -162 -567 -152 -935 6 -250 28 -395 85 -565 204 -613 712 -1098 1345 -1280 294 -85 610 -105 915 -60 577 85 1077 437 1340 949 142 276 200 539 200 901 0 362 -58 625 -200 901 -263 512 -763 864 -1340 949 -125 18 -385 27 -500 15z m440 -330 c576 -80 1050 -438 1240 -938 75 -199 95 -308 95 -522 0 -214 -20 -323 -95 -522 -192 -505 -670 -861 -1215 -900 -187 -13 -396 6 -565 51 -573 152 -1020 598 -1165 1160 -19 75 -23 118 -23 261 0 143 4 186 23 261 145 562 592 1008 1165 1160 169 45 378 64 565 51 77 -5 155 -13 175 -18 20 -6 65 -14 100 -19 35 -5 85 -14 110 -19z"/>
                  <path d="M2325 3985 c-305 -50 -567 -215 -758 -478 -144 -199 -217 -417 -217 -657 0 -240 73 -458 217 -657 191 -263 453 -428 758 -478 126 -21 374 -21 500 0 305 50 567 215 758 478 144 199 217 417 217 657 0 240 -73 458 -217 657 -191 263 -453 428 -758 478 -126 21 -374 21 -500 0z m475 -330 c230 -38 430 -155 570 -332 202 -255 202 -603 0 -858 -140 -177 -340 -294 -570 -332 -126 -21 -374 -21 -500 0 -230 38 -430 155 -570 332 -202 255 -202 603 0 858 140 177 340 294 570 332 126 21 374 21 500 0z"/>
                  <path d="M2370 3230 c-169 -31 -312 -118 -420 -255 -168 -213 -168 -512 0 -725 108 -137 251 -224 420 -255 126 -23 324 -23 450 0 169 31 312 118 420 255 168 213 168 512 0 725 -108 137 -251 224 -420 255 -126 23 -324 23 -450 0z m270 -300 c93 -25 170 -77 235 -160 124 -158 124 -382 0 -540 -65 -83 -142 -135 -235 -160 -103 -28 -257 -28 -360 0 -93 25 -170 77 -235 160 -124 158 -124 382 0 540 65 83 142 135 235 160 103 28 257 28 360 0z"/>
                </g>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Join Our Community</h2>
          <p className="text-green-100 text-center">Create an account to enjoy all our features</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Fast and secure checkout
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Personalized recommendations
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Order tracking
            </li>
          </ul>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full md:w-3/5 p-8 md:p-12">
          <div className="flex justify-between items-start mb-6">
        
            <Link
              href="/authpages/signin"
              className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 flex items-center"
            >
              Already have an account?
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {!isRegistered ? 'Create Your Account' : 'Check Your Email!'}
            </h1>
            <p className="text-gray-600">
              {!isRegistered ? 'Join us today - it\'s free and only takes a minute' : 'We sent a verification link to your email'}
            </p>
          </div>

          <div className={`mb-6 p-4 rounded-lg text-center ${
            error ? "bg-red-50 text-red-600" : isRegistered ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
          }`}>
            <p className="font-medium">{error || message}</p>
          </div>

          {/* Form */}
          {!isRegistered ? (
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
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
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <a href="/policies/terms" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/policies/privacypolicy" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(opens in a new window)</p>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-1">
              
              <Link href='/authpages/signin'
              
                className="text-green-600 hover:text-green-700 font-medium flex items-center justify-center mx-auto"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Please sign in
              </Link>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;