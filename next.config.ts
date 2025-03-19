import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // ✅ Disable Strict Mode
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com"], // ✅ Add domains inside `images`
  },
};

export default nextConfig;
