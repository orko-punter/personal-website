import type { NextConfig } from "next";

// GitHub Pages serves this repo at /personal-website/, not the domain root,
// so every asset/link needs that prefix baked in at build time.
const basePath = "/personal-website";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
