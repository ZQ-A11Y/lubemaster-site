"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// 静态部署（GitHub Pages）没有 proxy 中间件，由本页把根路径 / 重定向到 /zh 或 /en
export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const locale = navigator.language?.toLowerCase().startsWith("en")
      ? "en"
      : "zh";
    router.replace(`/${locale}`);
  }, [router]);

  return null;
}
