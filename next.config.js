/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@usecapsule/web-sdk', '@usecapsule/user-management-client'],
}

module.exports = nextConfig
