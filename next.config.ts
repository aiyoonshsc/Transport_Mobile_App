import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['readdy.ai'],
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
