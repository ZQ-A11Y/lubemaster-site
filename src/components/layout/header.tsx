"use client";

import { cn } from "@/lib/cn";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  siteName: string;
  nav: Record<string, string>;
}

function getNavItems(nav: Record<string, string>): NavItem[] {
  return [
    { label: nav.home, href: "/" },
    { label: nav.products, href: "/products" },
    { label: nav.solutions, href: "/solutions" },
    { label: nav.cases, href: "/cases" },
    { label: nav.about, href: "/about" },
    { label: nav.contact, href: "/contact" },
  ];
}

export function Header({ siteName, nav }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = getNavItems(nav);
  const currentLocale = pathname.startsWith("/en") ? "en" : "zh";
  const nextLocale = currentLocale === "zh" ? "en" : "zh";

  // Get the path without locale for switching
  const pathWithoutLocale = pathname.replace(/^\/(zh|en)/, "") || "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--glass-bg)] backdrop-blur-2xl border-b border-[var(--glass-border)] shadow-md after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-[var(--primary)]/20 after:to-transparent"
          : "bg-transparent"
      )}
    >
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--primary)] focus:text-white focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href={`/${currentLocale}`}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[var(--primary)]/30" aria-hidden="true">
              LM
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
              {siteName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const itemPath = `/${currentLocale}${item.href === "/" ? "" : item.href}`;
              const isActive =
                item.href === "/"
                  ? pathname === `/${currentLocale}`
                  : pathname.startsWith(`/${currentLocale}${item.href}`);

              return (
                <Link
                  key={item.href}
                  href={itemPath}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
                    isActive
                      ? "text-[var(--primary)] bg-[var(--primary)]/10"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Language Switcher */}
            <Link
              href={`/${nextLocale}${pathWithoutLocale}`}
              className="ml-2 p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors duration-200 flex items-center gap-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
              aria-label={`Switch to ${nextLocale === "zh" ? "Chinese" : "English"}`}
            >
              <Globe className="w-4 h-4" />
              <span>{nextLocale === "zh" ? "中文" : "EN"}</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[var(--border)] bg-[var(--background)]" aria-label="Mobile navigation">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const itemPath = `/${currentLocale}${item.href === "/" ? "" : item.href}`;
              const isActive =
                item.href === "/"
                  ? pathname === `/${currentLocale}`
                  : pathname.startsWith(`/${currentLocale}${item.href}`);

              return (
                <Link
                  key={item.href}
                  href={itemPath}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                    isActive
                      ? "text-[var(--primary)] bg-[var(--primary)]/10"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Language Switcher */}
            <Link
              href={`/${nextLocale}${pathWithoutLocale}`}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              aria-label={`Switch to ${nextLocale === "zh" ? "Chinese" : "English"}`}
            >
              <Globe className="w-5 h-5" />
              <span>{nextLocale === "zh" ? "中文" : "English"}</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
