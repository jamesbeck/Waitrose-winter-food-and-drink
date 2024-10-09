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
    ],
  },
};

export default nextConfig;
