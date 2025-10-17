import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: '"images.pexels.com"', // or any other image host
        pathname: "/**", // use wildcards for subpaths
      },
    ],
  },
};

export default nextConfig;
