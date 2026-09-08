import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bypasses strict linting rules on Vercel during production compilation
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

