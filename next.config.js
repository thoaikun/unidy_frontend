/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unidy.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
