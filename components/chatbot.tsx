'use client';

import React, { useEffect, useRef, useState } from 'react';
import { chatbot } from './api/ai'; 

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you with your Elteema experience today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  // refs
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  // when input focuses (keyboard opens), scroll messages to bottom after a short delay
  useEffect(() => {
    const inputEl = inputRef.current;
    if (!inputEl) return;
    const onFocus = () => {
      // small delay allows keyboard to appear on many devices
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 250);
    };
    inputEl.addEventListener('focus', onFocus);
    return () => inputEl.removeEventListener('focus', onFocus);
  }, []);

  const toggleChat = () => {
    setIsOpen((s) => !s);
    // focus input when opening
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

    // call your chatbot API (same logic)
    try {
      const payload = { userMessage };
      const res = await chatbot(payload);
      if (res?.ok) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: res.data ?? 'Response received',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((m) => [...m, botMessage]);
      } else {
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: 'Sorry — the assistant failed to respond.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((m) => [...m, botMessage]);
      }
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id: (Date.now() + 3).toString(),
          text: 'Network error. Please try again.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }

    // ensure we scroll to bottom after messages appended
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div
      className="z-[200]"
      // container placement: full-screen modal on mobile; floating at bottom-right on desktop
      style={{
        position: 'fixed',
        ...(isMobileView && isOpen
          ? {
              inset: 0,
              height: 'calc(var(--vh, 1vh) * 100)',
              width: '100%',
            }
          : {
              bottom: '5.5rem',
              right: '1.5rem',
            }),
      }}
    >
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          aria-label="Open chat"
          className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full shadow-lg hover:scale-105 transition-transform text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.7 9.7 0 01-4-.9L3 20l1.1-3.2A7.7 7.7 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className="bg-white border border-gray-200 shadow-xl rounded-2xl md:rounded-2xl flex flex-col"
          style={{
            // on mobile take full width/height (already set on outer). on desktop use fixed size
            width: isMobileView ? '100%' : 320,
            height: isMobileView ? 'calc(var(--vh, 1vh) * 100)' : 520,
            borderRadius: isMobileView ? 0 : undefined,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2h-5l-4 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-sm">Elteema Agent</div>
                <div className="text-xs text-green-100">Online — typically replies instantly</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  // minimize/close
                  setIsOpen(false);
                }}
                className="p-1 rounded-md hover:bg-white/10"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-auto bg-gray-50 px-4 py-4"
            style={{
              // leave room at bottom for the sticky input + safe area
              paddingBottom: isMobileView
                ? 'calc(env(safe-area-inset-bottom, 12px) + 96px)'
                : '12px',
            }}
            onClick={() => inputRef.current?.blur()}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`mb-3 flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
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

          {/* Sticky input area */}
          <div
            className="sticky bottom-0 bg-white border-t"
            style={{
              // ensure input sits above mobile keyboard & safe area
              padding: '12px',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 12px) + 8px)',
              zIndex: 2,
            }}
          >
            <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                aria-label="Type a message"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-h-[40px] px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={inputText.trim() === ''}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-green-600 text-white disabled:opacity-50"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-45" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.94 2.94a1.5 1.5 0 012.12 0L17 14.88 11.12 9 2.94 2.94zM2 13.5V18h4.5L18 6.5 13.5 2 2 13.5z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
