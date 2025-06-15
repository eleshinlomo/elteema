/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  devIndicators: false,
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

export default nextConfig;
