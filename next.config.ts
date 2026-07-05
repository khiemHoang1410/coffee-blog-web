import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN — tất cả ảnh upload qua Sanity Studio
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      // Giữ lại Unsplash cho ảnh hero fallback
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  reactStrictMode: true,
  // Cho phép kết nối HMR từ mọi tên miền ngrok trong quá trình phát triển (dev)
  allowedDevOrigins: ["*.ngrok-free.app"],
};

export default nextConfig;
