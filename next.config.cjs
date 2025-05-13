/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  env: {
    // Environment variables can be accessed from .env.local
  },
};

module.exports = nextConfig; 