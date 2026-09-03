import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | 润滑精控 LubeMaster",
    default: "润滑精控 LubeMaster — 智能润滑精密控制系统",
  },
  description:
    "全球领先的直驱多点智能润滑系统，99.5%系统可靠性，-40°C~70°C全温域覆盖，为高端制造业提供智能化润滑解决方案。",
  keywords: [
    "智能润滑",
    "精密控制",
    "工业润滑",
    "润滑系统",
    "LubeMaster",
    "润滑精控",
  ],
  openGraph: {
    title: "润滑精控 LubeMaster — 智能润滑精密控制系统",
    description:
      "全球领先的直驱多点智能润滑系统，99.5%系统可靠性，-40°C~70°C全温域覆盖。",
    url: SITE_URL,
    siteName: "LubeMaster 润滑精控",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "润滑精控 LubeMaster — 智能润滑精密控制系统",
    description:
      "全球领先的直驱多点智能润滑系统，99.5%系统可靠性。",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      zh: `${SITE_URL}/zh`,
      en: `${SITE_URL}/en`,
    },
  },
  verification: {
    // Add your search console verification codes here
    // google: "your-google-verification-code",
    // baidu: "your-baidu-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
