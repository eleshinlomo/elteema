'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { chatbot } from './api/ai';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Faq {
  id: number;
  question: string;
  answer: string | React.ReactNode;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you with your Elteema experience today? I am still in BETA version so talking to me helps me learn faster.I speak Yoruba, Igbo, Hausa, English, French and more.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // refs
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Example FAQs
  const faqs: Faq[] = [
  
    { id: 1, question: 'Is Elteema free to use?', 
      answer: 'Yes! Elteema is free for both buyers and sellers.'
    },
    { 
      id: 2, question: 'Do you accept online payment ?', 
      answer: `Elteema offers various payment methods including, online and pay on delivery payment methods.
       Acceptable payment methods are often determined by the store listed on Elteema.`
    },
     { id:3, question: 'How do I delete my account?', 
      answer: (<div>To delete your account, visit 
      <a href='/dashboard/settingspage'  className='text-blue-500 px-1'>Settings</a></div>)
    },
   { id: 4, question: 'How to see my pending orders and status?', 
      answer: (<div>To see your orders, visit 
      <a href='/dashboard/orders/userorderpage'  className='text-blue-500 px-1'>Orders</a></div>)
    },
    { 
      id: 5, question: 'How do I open a store?', 
      answer: (<div>To open a store, visit <a href='/dashboard' className='text-blue-500 px-1'>Open Store</a></div>)
    },
    { id: 6, question: 'How do I contact someone at Elteema?', 
      answer: (<div>For the most part, our chatbot agent can answer and complete most tasks. However, if you still need to speak with someone, your best bet is to use our online form <a href='/contactpage' 
        className='text-blue-500'>Send message</a>. We will reach out instantly. You can also send emails to 
        <p className='text-blue-500'>support@elteema.com</p></div>)
    },
    { id: 7, question: 'How can I register?', 
      answer: (<div>To register, visit 
      <a href='/authpages/signup'  className='text-blue-500 px-1'>Register</a></div>)
    },
   
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const FaqPage = (
    <div className="mb-4">
      <h4 className="font-semibold text-gray-700 mb-2">Common Questions</h4>
      <div className="space-y-2">
        {faqs.map((f) => (
          <div key={f.id} className="border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleFaq(f.id)}
              className="w-full text-left px-3 py-2 font-medium text-sm text-gray-800 flex justify-between items-center"
            >
              {f.question}
              <span>{openFaq === f.id ? '−' : '+'}</span>
            </button>
            {openFaq === f.id && (
              <div className="px-3 pb-2 text-sm text-gray-600">
                {f.answer}
              </div>
            )}
          </div>
        ))}
        <div className='flex justify-between text-sm text-center text-blue-800 px-4 gap-2'>
          <a href='/faqpage'>faq</a>
          <a href='/supermarketpage'>supermarket</a>
          <a href='/categorypage/fabrics & textiles'>fabrics</a> 
        </div>
      </div>
    </div>
  );

  // --vh fix for mobile browsers (helps when keyboard appears)
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  // detect mobile width
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = () => setIsMobileView(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen((s) => !s);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((m) => [...m, userMessage]);
    setInputText('');

    try {
      const payload = { userMessage };
      const res = await chatbot(payload);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: res?.ok ? res.data ?? 'Response received' : 'Sorry — the assistant failed to respond.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((m) => [...m, botMessage]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: (Date.now() + 2).toString(),
          text: 'Network error. Please try again.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div
      className="z-[200]"
      style={{
        position: 'fixed',
        ...(isMobileView && isOpen
          ? { inset: 0, height: 'calc(var(--vh, 1vh) * 100)', width: '100%' }
          : { bottom: isMobileView ? '5.5rem' : '1.5rem', right: '0.5rem' }),
      }}
    >
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          aria-label="Open chat"
          className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full shadow-lg hover:scale-105 transition-transform text-white"
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className="bg-white border border-gray-200 shadow-xl flex flex-col"
          style={{
            width: isMobileView ? '100%' : 320,
            height: isMobileView ? 'calc(var(--vh, 1vh) * 100)' : 520,
            borderRadius: isMobileView ? 0 : 16,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white">
            <div className="font-semibold text-sm">Elteema Agent</div>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Messages area with FAQ section at top */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-auto bg-gray-50 px-4 py-4 space-y-4"
          >
            {FaqPage}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    m.sender === 'user'
                      ? 'bg-green-500 text-white rounded-br-none'
                      : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <div>{m.text}</div>
                  <div className="mt-1 text-[10px] text-gray-400 text-right">
                    {formatTime(m.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-2">
            <form onSubmit={(e) => handleSendMessage(e)} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-full text-sm"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-full disabled:opacity-50"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
