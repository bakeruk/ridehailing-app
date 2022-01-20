/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcFileReading: false,
  eslint: {
    // We use our own eslint.
    ignoreDuringBuilds: true
  },
  poweredByHeader: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
