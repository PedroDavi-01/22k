import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Aumenta o limite para 10MB
    },
  },
};

export default nextConfig;