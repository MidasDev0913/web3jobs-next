/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  env: {
    SKIP_PREFLIGHT_CHECK: true,
    REACT_APP_ENV: 'dev',
    REACT_APP_API_URL: 'https://staging-web3jobs-api-p7ewh.ondigitalocean.app/api',

    REACT_APP_PAYMENT_RECEIVER: '0xE68BD3778E783B7a1c0fe2A8c11f2dE0eB05fa69',
    REACT_APP_FIREBASE_KEY: '{"apiKey": "AIzaSyABjeZnSnoEubAX5H6YgelDYVsPmyOi2Ng","authDomain": "web3jobs-8b4b5.firebaseapp.com","projectId": "web3jobs","storageBucket": "web3jobs.appspot.com","messagingSenderId": "640509171502","appId": "1:640509171502:web:4ef55e0c534037abb98cbf","measurementId": "G-HS5GM5T835"}'
  }
}

module.exports = nextConfig
