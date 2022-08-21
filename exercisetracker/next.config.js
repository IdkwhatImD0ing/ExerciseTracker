/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    domains: ["d205bpvrqc9yn1.cloudfront.net"],
  },
};

module.exports = nextConfig;
