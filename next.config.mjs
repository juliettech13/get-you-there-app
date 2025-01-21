// import type { NextConfig } from "next";

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src'
    }
    return config
  }
};

export default nextConfig;
