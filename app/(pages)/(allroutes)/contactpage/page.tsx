'use client'

import Link from "next/link";
import { useState, useEffect, useContext, FormEvent } from 'react'
import { GeneralContext } from "../../../../contextProviders/GeneralProvider";

const ContactPage = () => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('We will get back to you as soon as possible')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const generalContext = useContext(GeneralContext)
  const { user } = generalContext

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  useEffect(() => {
    if (user) {
      setEmail(user.email)
      if (user.name) setName(user.name)
    }
  }, [user])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try{
    setIsSubmitting(true)
    setError('')
    const payload = {
       name,
       email,
       message
    }

    console.log('PAYLOAD', payload)
    const response = await fetch(`${BASE_URL}/sendcontactmessage`, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(payload)

    })

    if(!response){
      setError('No response from server')
      setIsSubmitting(false)
      return
    }

    const data = await response.json()
    if(data.ok){
      console.log(data)
      setIsSubmitting(false)
      setError('')
      setSuccess(data.message)
      setName('')
      setEmail('')
      setMessage('')
    }else{
      setError('Server error. Unable to send message now')
      console.log(data.error)
      setIsSubmitting(false)
    }

    }catch(err){
      console.log(err)
      setIsSubmitting(false)
      setError('Server error. Message not sent')
    }
    return

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12 my-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900  sm:tracking-tight ">
            Contact Us
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            We&apos;re here to help and answer any questions you might have.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white">
              {error ? 'Oops! Something went wrong' : 'Send us a message'}
            </h2>
            <p className="mt-2 text-green-100">
              {error || success}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={user && user.name ? user.name : name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 transition duration-150"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 transition duration-150"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What would you like to talk about?"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 transition duration-150"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 animate-spin">↻</span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>

            {!user && (
              <div className="mt-6 text-center text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="/authpages/signup" className="font-medium text-green-600 hover:text-green-500 hover:underline">
                  Sign up here
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">Prefer other methods?</h3>
          <div className="mt-4 md:flex justify-center space-x-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <span className="text-green-600 font-bold block">Email</span>
              <span className="text-gray-600">support@petrolagegroup.com</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <span className="text-green-600 font-bold block">Phone</span>
              <div>
              <span className="text-gray-600">Nigeria: (+234) 808-381-7440</span><br/>
              <span className="text-gray-600">US: (+1) 443-626-9889</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;