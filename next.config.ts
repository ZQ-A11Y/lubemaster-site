import type { NextConfig } from "next";

// BUILD_TARGET=gh-pages 时输出纯静态站点（部署到 GitHub Pages，国内可直接访问）
const isGitHubPages = process.env.BUILD_TARGET === "gh-pages";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath: "/lubemaster-site",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
