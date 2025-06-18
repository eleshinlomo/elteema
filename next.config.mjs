/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  swcMinifyMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "via.placeholder.com",
      "localhost",
      "elteemaserver-production.up.railway.app",
      "elteema.vercel.app",
      "elteema.com",
      "store.myafros.com"
    ],
  }
};

// Import next-pwa using ES Modules syntax
import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true
});

export default pwaConfig(nextConfig);