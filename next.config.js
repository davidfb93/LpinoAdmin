/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@heroui/theme", "@heroui/button", "@heroui/input", "@heroui/card", "@heroui/divider", "@heroui/link"],
  experimental: {
    optimizePackageImports: ["@heroui/react"]
  }
};

module.exports = nextConfig;
