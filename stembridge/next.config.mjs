/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images from external sources (e.g. Supabase Storage) go here
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
