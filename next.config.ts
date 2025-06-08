import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'ig-api-prod.incasinowetrust.com',
    ],
  },
};

export default nextConfig;
