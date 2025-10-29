import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress-1541287-5956292.cloudwaysapps.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
