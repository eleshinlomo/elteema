'use client';

import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

export default function PWAInstallButton() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = async () => {
    if (!promptInstall) {
      // Fallback for browsers that don't support the install prompt
      alert('To install the app, look for the "Add to Home Screen" option in your browser\'s menu.');
      return;
    }
    
    // Show the install prompt
    promptInstall.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await promptInstall.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the saved prompt since it can't be used again
    setPromptInstall(null);
  };

  if (!supportsPWA) {
    return null; // Don't show button if PWA isn't supported
  }

  return (
    <button
      onClick={onClick}
      className="mr-6 whitespace-nowrap ease-in-up shadow-btn hover:shadow-btn-hover rounded-md flex flex-col justify-center items-center
              py-1  text-xs font-medium text-gray-500 transition duration-300 hover:bg-opacity-90
              md:py-1.5 md:px-4"
      aria-label="Install app"
    >
      <FiDownload className=' h-5 w-5' />
      Install App
    </button>
  );
}