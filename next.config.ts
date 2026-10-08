import type { NextConfig } from "next";

// Al publicar en GitHub Pages (scripts/publicar.mjs) se exporta como sitio estático y se sirve
// desde /<repositorio>. En local (`npm run dev` o `npm run produccion`) no cambia nada.
const exportar = process.env.EXPORTAR === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(exportar ? { output: "export" as const, trailingSlash: true } : {}),
  basePath,
  // El prerenderizado parcial no existe en la exportación estática; la página no lo usa.
  cacheComponents: !exportar,
  partialPrefetching: !exportar,
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
