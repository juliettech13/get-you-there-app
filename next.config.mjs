const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src'
    }
    return config
  },
  images: {
    domains: ['flagcdn.com']
  }
};

export default nextConfig;
