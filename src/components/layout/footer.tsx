import Link from "next/link";
import { Mail, MapPin, ChevronRight } from "lucide-react";
import { BackToTop } from "@/components/ui/back-to-top";

interface FooterProps {
  siteName: string;
  slogan: string;
  t: Record<string, string>;
  lang: string;
}

const footerProducts = [
  { labelKey: "dds800", zh: "DDS-800 直驱供油系统", en: "DDS-800 Direct-Drive System" },
  { labelKey: "mjs06", zh: "MJS06 智能流量传感器", en: "MJS06 Smart Flow Sensor" },
  { labelKey: "mjv06", zh: "MJV06 振动监测模块", en: "MJV06 Vibration Monitor" },
  { labelKey: "ltm01", zh: "低温解冻保温模块", en: "Low-Temp Thawing Module" },
];

const footerSolutions = [
  { labelKey: "auto", zh: "汽车制造", en: "Automotive" },
  { labelKey: "food", zh: "食品加工", en: "Food Processing" },
  { labelKey: "pharma", zh: "制药GMP", en: "Pharma GMP" },
  { labelKey: "mining", zh: "矿山机械", en: "Mining Machinery" },
];

const footerAbout = [
  { labelKey: "tech", zh: "核心技术", en: "Core Technology" },
  { labelKey: "ip", zh: "知识产权", en: "IP Portfolio" },
  { labelKey: "team", zh: "核心团队", en: "Core Team" },
  { labelKey: "contact", zh: "联系我们", en: "Contact Us" },
];

export function Footer({ siteName, slogan, t, lang }: FooterProps) {
  const isZh = lang === "zh";

  const productLinks = footerProducts.map((p) => ({
    label: isZh ? p.zh : p.en,
    href: `/${lang}/products`,
  }));

  const solutionLinks = footerSolutions.map((s) => ({
    label: isZh ? s.zh : s.en,
    href: `/${lang}/solutions`,
  }));

  const aboutLinks = footerAbout.map((a) => ({
    label: isZh ? a.zh : a.en,
    href: a.labelKey === "contact" ? `/${lang}/contact` : `/${lang}/about`,
  }));

  const allCols = [
    { title: t.colProducts, links: productLinks },
    { title: t.colSolutions, links: solutionLinks },
    { title: t.colAbout, links: aboutLinks },
  ];

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-end mb-12">
          <BackToTop />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">LM</div>
              <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">{siteName}</span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm mb-6">{t.description}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-[var(--muted)]">
                <MapPin className="w-4 h-4 flex-shrink-0" /> <span>{t.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--muted)]">
                <Mail className="w-4 h-4 flex-shrink-0" /> <span>{t.contact}</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {allCols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors flex items-center gap-1 group">
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">{t.company}</p>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}/privacy`} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors">{t.privacy}</Link>
            <Link href={`/${lang}/terms`} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors">{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
