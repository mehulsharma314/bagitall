/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Prisma 7 + pg adapter — tell Turbopack to treat these as server-only externals
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],
  // Disable dev overlay (removes the "1 Issue" badge)
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;
