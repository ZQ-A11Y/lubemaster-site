import type { Metadata } from "next";

// 静态部署（GitHub Pages）没有 proxy 中间件，由本页把根路径 / 重定向到 /zh。
// 用纯 HTML 的 <meta http-equiv="refresh">，不依赖 JS——微信内置浏览器等任何环境都能跳转。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Lubemaster",
  description: "Lubemaster lubrication solutions",
};

export default function RootRedirectPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${basePath}/zh/`} />
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-lg">正在进入网站…</p>
        <div className="flex gap-6">
          <a href={`${basePath}/zh/`} className="underline">
            进入中文站
          </a>
          <a href={`${basePath}/en/`} className="underline">
            English
          </a>
        </div>
      </main>
    </>
  );
}
