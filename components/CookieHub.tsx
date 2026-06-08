'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    cookiehub?: {
      load: (config: Record<string, unknown>) => void;
    };
  }
}

export function CookieHub() {
  const domainCode = process.env.NEXT_PUBLIC_COOKIEHUB_DOMAIN_CODE;
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.cookiehub) {
        clearInterval(interval);
        window.cookiehub.load({});
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Script
      id="cookiehub"
      src={`https://cdn.cookiehub.eu/c2/${domainCode}.js`}
      strategy="afterInteractive"
    />
  );
}