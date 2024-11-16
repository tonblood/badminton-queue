/** @type {import('next').NextConfig} */
const nextConfig = {};
const withTypescript = require('@next/plugin-typescript');

module.exports = withTypescript({
  typescript: {
    ignoreBuildErrors: true,
  },
});

export default nextConfig;
