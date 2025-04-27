import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'iyssu-backend-main-aaup01.laravel.cloud',
      },
      {
        hostname: 'iyssu-front.vercel.app',
      },
    ],
  }
};

export default nextConfig;
