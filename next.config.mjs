// import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Only initialize Cloudflare simulation in production
// if (process.env.NODE_ENV === "production") {
//   initOpenNextCloudflareForDev();
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;

