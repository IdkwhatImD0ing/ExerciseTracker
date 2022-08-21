/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["d205bpvrqc9yn1.cloudfront.net"],
  },
};

module.exports = nextConfig;
