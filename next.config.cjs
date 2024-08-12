import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
// Import env here to validate during build. Using jiti we can import .ts files :)
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
