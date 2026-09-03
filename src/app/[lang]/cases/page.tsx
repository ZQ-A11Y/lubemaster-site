import { hasLocale, getDictionary } from "../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Quote, Factory, UtensilsCrossed, Pill } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

const CASE_ICONS = [Factory, UtensilsCrossed, Pill];

export async function generateMetadata({ params }: PageProps<"/[lang]/cases">): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang as "zh" | "en");
  return {
    title: t.casesPage.title,
    description: t.casesPage.subtitle,
    alternates: { canonical: `${SITE_URL}/${lang}/cases` },
  };
}

export default async function CasesPage({ params }: PageProps<"/[lang]/cases">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className="pt-24 pb-16">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle badge={t.casesPage.badge} title={t.casesPage.title} subtitle={t.casesPage.subtitle} />
        </div>
      </section>

      <section className="pb-16 space-y-16">
        {t.casesPage.list.map((c: { title: string; titleEn: string; num: string; clientLabel: string; client: string; challengeLabel: string; challenge: string; solutionLabel: string; solution: string[]; results: { label: string; value: string }[]; quote: string; quoteBy: string }, i: number) => {
          const IconComp = CASE_ICONS[i];
          return (
            <div key={i} id={`case-${i}`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
                <div className="p-8 sm:p-12 pb-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--muted)] font-medium">{c.num}</div>
                      <h2 className="text-2xl font-bold text-[var(--foreground)]">{c.title}</h2>
                      <p className="text-sm text-[var(--muted)] mt-0.5">{c.titleEn}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">{c.clientLabel}</h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">{c.client}</p>
                      <h3 className="text-sm font-semibold text-[var(--foreground)] mt-6 mb-2">{c.challengeLabel}</h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">{c.solutionLabel}</h3>
                      <ul className="space-y-2.5">
                        {c.solution.map((s: string, j: number) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-8 sm:p-12 pt-0 mt-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {c.results.map((r: { label: string; value: string }, j: number) => (
                      <div key={j} className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] text-center">
                        <div className="text-xl font-extrabold text-[var(--foreground)]">{r.value}</div>
                        <div className="text-xs text-[var(--muted)] mt-0.5">{r.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                    <Quote className="w-8 h-8 text-[var(--primary)]/30 mb-2" />
                    <blockquote className="text-base text-[var(--foreground)] italic leading-relaxed">&ldquo;{c.quote}&rdquo;</blockquote>
                    <p className="text-sm text-[var(--muted)] mt-2">{c.quoteBy}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[var(--surface)] to-[var(--surface-alt)] border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">{t.casesPage.ctaTitle}</h2>
            <p className="text-[var(--muted)] mb-6 max-w-md mx-auto">{t.casesPage.ctaDesc}</p>
            <Link href={`/${lang}/contact`}>
              <Button size="lg">{t.casesPage.ctaButton}<ArrowRight className="w-5 h-5" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
