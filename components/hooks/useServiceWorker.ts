// useServiceWorker.ts
import { useEffect, useState } from 'react';

export function useServiceWorker() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then((reg) => {
        setRegistration(reg);
        
        // Check for updates immediately
        reg.update();
        
        // Listen for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available
                  setUpdateAvailable(true);
                }
              }
            });
          }
        });
      });
      
      // Listen for controller change (when update is activated)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  const updateApp = () => {
    if (registration?.waiting) {
      // Tell the waiting service worker to take control
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  return { updateAvailable, updateApp };
}