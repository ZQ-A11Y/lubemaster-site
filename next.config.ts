import type { NextConfig } from "next";

// BUILD_TARGET=gh-pages 时输出纯静态站点（部署到 GitHub Pages，国内可直接访问）
const isGitHubPages = process.env.BUILD_TARGET === "gh-pages";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath: "/lubemaster-site",
      trailingSlash: true,
      images: { unoptimized: true },
      // 供页面代码在构建时内联 basePath（如根路径 meta refresh 跳转目标）
      env: { NEXT_PUBLIC_BASE_PATH: "/lubemaster-site" },
    }
  : {};

export default nextConfig;
