import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // swcMinify is no longer needed in Next.js 15 as it's enabled by default
  poweredByHeader: false,
  // Disable static optimization during development to prevent caching issues
  experimental: {
    // Turbopack specific settings
    turbo: {
      // Turbopack configuration
      // Note: Available options may vary based on Next.js version
    },
  },
  // Configure webpack (will only be used when not using Turbopack)
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable caching in development
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
