import { NextResponse } from "next/server";

const locales = ["zh", "en"];
const defaultLocale = "zh";

function getLocale(request) {
  // Check cookie first
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  if (acceptLanguage.startsWith("en")) return "en";
  if (acceptLanguage.startsWith("zh")) return "zh";

  return defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Skip internal paths and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Internal rewrite — no browser redirect, clean history
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
