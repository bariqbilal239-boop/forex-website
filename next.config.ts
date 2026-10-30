import type { NextConfig } from "next";

const API_URL = process.env.API_URL ?? "http://localhost:5173";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Browser form posts go to /api/backend/* on this site and are proxied to the Node.js API (no CORS needed).
  async rewrites() {
    return [{ source: "/api/backend/:path*", destination: `${API_URL}/api/:path*` }];
  },
};

export default nextConfig;
