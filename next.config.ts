import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force Turbopack to use this directory as the workspace root so it picks up local configs (Tailwind/PostCSS).
  turbopack: {
    root: __dirname,
  },
  devIndicators: false,
};

export default nextConfig;
