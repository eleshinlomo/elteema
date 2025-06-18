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
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      aria-label="Install app"
    >
      <FiDownload />
      Install App
    </button>
  );
}