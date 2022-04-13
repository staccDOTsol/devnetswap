const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  webpack5: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      os: false,
    };
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
  
    config.resolve.alias = {
      ...config.resolve.alias,
     
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/swap",
        permanent: false,
      }
    ];
  },
};
