/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeDetection: false
  },
  experimental: {
    swcMinify: true
  }
}

module.exports = nextConfig
