import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/careers',
        destination: '/career',
      },
    ];
  },
};

export default nextConfig;
