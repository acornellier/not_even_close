/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [{ hostname: 'wow.zamimg.com' }, { hostname: 'www.wowhead.com' }],
  },
}

module.exports = nextConfig
