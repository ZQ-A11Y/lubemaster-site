import { hasLocale, getDictionary } from "../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Factory, UtensilsCrossed, Pill, Hammer, Anchor, CircuitBoard, Check, ArrowRight, Settings2, ShieldCheck, Zap } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

const SOLUTION_ICONS = [Factory, UtensilsCrossed, Pill, Hammer, Anchor, CircuitBoard];

export async function generateMetadata({ params }: PageProps<"/[lang]/solutions">): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang as "zh" | "en");
  return {
    title: t.solutions.title,
    description: t.solutions.subtitle,
    alternates: { canonical: `${SITE_URL}/${lang}/solutions` },
  };
}

export default async function SolutionsPage({ params }: PageProps<"/[lang]/solutions">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className="pt-24 pb-16">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle badge={t.solutions.badge} title={t.solutions.title} subtitle={t.solutions.subtitle} />
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {t.solutions.list.map((sol: { name: string; nameEn: string; desc: string; pains: string[]; fixes: string[]; results: { label: string; value: string }[] }, i: number) => {
            const IconComp = SOLUTION_ICONS[i];
            return (
              <div key={i} id={`sol-${i}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/20 transition-all duration-300 scroll-mt-24">
                <div className="lg:col-span-3">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--foreground)]">{sol.name}</h2>
                  <p className="text-sm text-[var(--muted)] mt-1">{sol.nameEn}</p>
                  <p className="text-sm text-[var(--muted)] mt-4 leading-relaxed">{sol.desc}</p>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {sol.results.map((r: { label: string; value: string }, j: number) => (
                      <div key={j} className="text-center p-2 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                        <div className="text-lg font-extrabold gradient-text">{r.value}</div>
                        <div className="text-xs text-[var(--muted)]">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-red-500 mb-4">
                    <Zap className="w-4 h-4" /> {t.solutions.painTitle}
                  </h3>
                  <ul className="space-y-3">
                    {sol.pains.map((p: string, j: number) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-2" /> <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-green-500 mb-4">
                    <ShieldCheck className="w-4 h-4" /> {t.solutions.solutionTitle}
                  </h3>
                  <ul className="space-y-3">
                    {sol.fixes.map((s: string, j: number) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors">
                    {t.solutions.detailLink} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[var(--surface)] to-[var(--surface-alt)] border border-[var(--border)]">
            <Settings2 className="w-12 h-12 text-[var(--primary)] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">{t.solutions.ctaTitle}</h2>
            <p className="text-[var(--muted)] mb-6">{t.solutions.ctaDesc}</p>
            <Link href={`/${lang}/contact`}>
              <Button size="lg">{t.solutions.ctaButton}<ArrowRight className="w-5 h-5" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
