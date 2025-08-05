import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ESLint hatalarını build sırasında yok say
  },
  typescript: {
    ignoreBuildErrors: true, // Geçici çözüm
  },
};

export default nextConfig;
