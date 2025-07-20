// PWAInstallButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { useServiceWorker } from './hooks/useServiceWorker';

export default function PWAInstallButton() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const { updateAvailable, updateApp } = useServiceWorker();

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = async () => {
    if (updateAvailable) {
      updateApp();
      return;
    }
    
    if (!promptInstall) {
      alert('To install the app, look for the "Add to Home Screen" option in your browser\'s menu.');
      return;
    }
    
    promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setPromptInstall(null);
  };

  if (!supportsPWA && !updateAvailable) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="mr-6 whitespace-nowrap ease-in-up shadow-btn hover:shadow-btn-hover rounded-md flex flex-col justify-center items-center
                py-1 text-xs font-medium text-gray-500 transition duration-300 hover:bg-opacity-90
                md:py-1.5 md:px-4"
      aria-label={updateAvailable ? "Update app" : "Install app"}
    >
      <FiDownload className='h-5 w-5' />
      {updateAvailable ? 'Update App' : 'Install App'}
    </button>
  );
}