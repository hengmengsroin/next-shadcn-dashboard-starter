import('./env');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io']
  },
  experimental: {
    swcPlugins: [['next-superjson-plugin', {}]],
    missingSuspenseWithCSRBailout: false
  }
};

module.exports = nextConfig;
