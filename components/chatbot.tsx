// components/FloatingChat.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createWaitList } from './api/waitlist';
import { chatbot } from './api/ai';


interface Message {
  id: string;
  text: string | any;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you with your Elteema experience today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInputText('');

   
    
    const payload = {
        userMessage,
        
    }
    const response = await chatbot(payload)
    console.log('CHATBOT', response)
    if(response.ok){

        const botMessage: Message = {
        id: Date.now().toString(),
        text: response.data,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);

    }
  };


  const handleSubmit = async (email: string)=>{
    const payload = {
       email
    }
      const response = await createWaitList(payload)
      console.log(response)
      if(response.ok){
        setMessage(response.message)
        setEmail('')
        setError('')
      }else{
        setError(response.error)
      }
     
  }

  const getBotResponse = (userInput: string | any)=> {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('order') || lowerInput.includes('track')) {
      return 'To check your order status, please provide your order number or visit the "My Orders" section in your account.';
    } else if (lowerInput.includes('return') || lowerInput.includes('exchange')) {
      return 'Our return policy allows returns within 30 days of purchase. Would you like me to help you initiate a return?';
    } else if (lowerInput.includes('shipping') || lowerInput.includes('delivery') || lowerInput.includes('deliver') || lowerInput.includes('get my product')) {
      return 'We deliver in and outside Nigeria. Standard delivery takes 3-5 business days and up to 30days for deliveries outside Nigeria.';
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return 'Hello, my name is Teema, how can I help you today ?';
    } 
    else if (lowerInput.includes('sell') || lowerInput.includes('store') || lowerInput.includes('open store')) {
      return (<div>Click here to open a store and begin to sell on Elteema 
        <a href='/dashboard' className='text-blue underline pl-2'>Sell on Elteema</a></div>)
    } 
      else if (lowerInput.includes('register') || lowerInput.includes('sign up') || lowerInput.includes('join')) {
      return (<div>To sign up, please visit 
        <a href='/authpages/signup' className='text-blue underline pl-2'>Join Elteema</a></div>)
    } 
      else if (lowerInput.includes('login') || lowerInput.includes('sign in') || lowerInput.includes('dashboard')) {
      return (<div>To sign into your dashboard, please visit 
        <a href='/authpages/signin' className='text-blue underline pl-2'>Sign in</a></div>)
    } 
    else if (lowerInput.includes('payment') || lowerInput.includes('credit') || lowerInput.includes('cash')) {
      return 'Currently, orders are fulfilled by payment on delivery. Online payment will be activated in few weeks. All payments are securely processed.';
    } else if (lowerInput.includes('product') || lowerInput.includes('item') || lowerInput.includes('buy') || lowerInput.includes('shopping') || lowerInput.includes('shop')) {
      return 'I can help you find products. Could you please specify what you\'re looking for?';
    } else {
      return (
        <div>
         Thank you for your message. Our customer service team will get back to you shortly. 
         <p>Please enter your email below</p>
         <input placeholder='email' 
         className='border border-green-500 rounded-2xl mt-2 px-2'
         onChange={(e)=>setEmail(e.target.value)}
          />
         <button onClick={()=>handleSubmit(email)}>Submit</button>
         <p>{error ? error : message}</p>
        </div>)
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <i className="fas fa-comments text-white text-2xl"></i>
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
          </span>
        </button>
      )}

      {/* Chat container */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-200 animate-fade-in-up">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <h3 className="font-semibold">Elteema Agent</h3>
                <p className="text-xs text-green-100">Online • Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-green-200 transition-colors"
              aria-label="Close chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-2 ${message.sender === 'user'
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                    }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={inputText.trim() === ''}
                className="bg-green-600 text-white px-4 py-3 rounded-r-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;