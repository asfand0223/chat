import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CHAT_HUB_URL: process.env.NEXT_PUBLIC_CHAT_HUB_URL,
  },
};

export default nextConfig;
