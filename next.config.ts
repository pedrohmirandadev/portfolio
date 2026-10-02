import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  devIndicators: false,
  turbopack: { root: process.cwd() },
};

export default nextConfig;
