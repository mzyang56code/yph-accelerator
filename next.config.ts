import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Team member photos live in Supabase Storage, which is always on
      // *.supabase.co regardless of which project is configured.
      { protocol: "https", hostname: "**.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  async redirects() {
    return [
      // /team was renamed to /about (now covers mission + team roster).
      { source: "/team", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
