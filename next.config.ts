import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'ig-api-prod.incasinowetrust.com',
      // другие домены, если нужно
    ],
  },
};

export default nextConfig;
