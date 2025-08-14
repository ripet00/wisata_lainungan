/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: [
      'githubusercontent.com',
      'res.cloudinary.com'
    ],
  },
};

module.exports = nextConfig;
