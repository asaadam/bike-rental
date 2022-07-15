/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET || "",
    DATABASE_URL: process.env.DATABASE_URL || "",
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
