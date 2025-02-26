/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! ATENÇÃO: Isso ignora erros de TypeScript durante a build
    // Isso é útil para desenvolvimento, mas não recomendado para produção
    ignoreBuildErrors: true,
  },
  eslint: {
    // Isso ignora erros de ESLint durante a build
    // Também útil para desenvolvimento, mas não recomendado para produção
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
};

module.exports = nextConfig; 