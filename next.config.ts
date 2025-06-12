import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntlPlugin = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/admin',
        destination: '/admin/users',
        permanent: false,
      },
    ];
  },
};

export default withNextIntlPlugin(nextConfig);
