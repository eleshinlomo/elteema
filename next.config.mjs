/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "via.placeholder.com",
      "localhost",
      "elteema.vercel.app",
      "store.myafros.com"
    ],
  }
};

export default nextConfig;
