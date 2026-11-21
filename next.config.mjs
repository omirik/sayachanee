/** @type {import('next').NextConfig} */
const nextConfig = {
  // Paylaşım görselleri Türkçe karakterli yazı tipini dosyadan okur;
  // Vercel'deki sunucu fonksiyonlarına bu dosyalar da eklensin.
  outputFileTracingIncludes: {
    "/api/og/ozel": ["./src/assets/fonts/**"],
    "/api/hikaye": ["./src/assets/fonts/**"],
    "/**/opengraph-image": ["./src/assets/fonts/**"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
