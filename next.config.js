/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{ hostname: 'wow.zamimg.com' }],
  },
}

module.exports = nextConfig
