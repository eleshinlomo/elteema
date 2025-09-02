import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  swcMinifyMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        // Optional: add port if you're using non-standard ports
        port: '3000',
      },
        {
        protocol: 'http',
        hostname: 'localhost',
        // Optional: add port if you're using non-standard ports
        port: '3001',
      },
      {
        protocol: 'https',
        hostname: 'elteemaserver-production.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: 'elteema.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'elteema.com',
      },
      {
        protocol: 'https',
        hostname: 'elteema.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'store.myafros.com',
      }
    ],
  }
};

const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true
});

export default pwaConfig(nextConfig);