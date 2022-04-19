/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'firebasestorage.googleapis.com'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],

  async rewrites() {
    return [
      {
        source: '/',
        destination: '/companies',
      },
    ]
  },
}

module.exports = nextConfig
