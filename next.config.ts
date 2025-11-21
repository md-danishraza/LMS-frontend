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
      {
        protocol: "https",
        hostname: '"placehold.co"', // or any other image host
        pathname: "/**", // use wildcards for subpaths
      },
      {
        protocol: "https",
        hostname: "dh181s0qk4f6x.cloudfront.net", // CloudFront Domain
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", // For Clerk user profile images
      },
    ],
  },
};

export default nextConfig;
