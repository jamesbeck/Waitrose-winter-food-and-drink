/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['knex'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.waitrosecellar.com',
      },
      {
        protocol: 'https',
        hostname: 'ecom-su-static-prod.wtrecom.com',
      },
      {
        protocol: 'https',
        hostname: 's7e5a.scene7.com',
      },
      {
        protocol: 'https',
        hostname: 'media.johnlewiscontent.com',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;
