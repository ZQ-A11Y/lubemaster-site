import { hasLocale, getDictionary } from "../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ShieldCheck, FileText, Award, Users, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang as "zh" | "en");
  return {
    title: t.about.title,
    description: t.about.subtitle,
    alternates: { canonical: `${SITE_URL}/${lang}/about` },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className="pt-24 pb-16">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle badge={t.about.badge} title={t.about.title} subtitle={t.about.subtitle} />
        </div>
      </section>

      {/* IP Section */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t.about.ipTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="col-span-full grid grid-cols-3 gap-4 mb-4">
              {[FileText, Award, ShieldCheck].map((Icon, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                  <div className="flex justify-center text-[var(--primary)] mb-3"><Icon className="w-6 h-6" /></div>
                  <div className="text-3xl font-extrabold text-[var(--foreground)]">{t.about.ipSummary[i].value}</div>
                  <div className="text-sm text-[var(--muted)]">{t.about.ipSummary[i].label}</div>
                </div>
              ))}
            </div>
            <div className="col-span-full">
              <div className="rounded-xl bg-[var(--background)] border border-[var(--border)] overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-[var(--border)]">
                  {t.about.patents.map((p: { name: string; type: string; status: string }, i: number) => (
                    <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-[var(--surface-alt)] transition-colors">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-[var(--foreground)]">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="primary" size="sm">{p.type}</Badge>
                        <span className="text-xs text-green-600 font-medium">{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t.about.teamTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.about.teamMembers.map((m: { name: string; role: string; dept: string; bio: string }, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/20 hover:shadow-md transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[var(--primary)]">{m.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">{m.name}</h3>
                <p className="text-sm font-medium text-[var(--primary)] mb-1">{m.role}</p>
                <p className="text-xs text-[var(--muted)] mb-3">{m.dept}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {t.about.teamStats.map((s: { value: string; label: string }, i: number) => (
              <div key={i} className="text-center p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
                <div className="text-xs text-[var(--muted)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600"><Lightbulb className="w-5 h-5" /></div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t.about.milestonesTitle}</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border)] lg:-translate-x-px" />
            <div className="space-y-8">
              {t.about.milestones.map((m: { year: string; title: string; desc: string }, i: number) => (
                <div key={m.year} className={`relative flex flex-col lg:flex-row gap-4 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-[var(--surface)] -translate-x-1/2 z-10 mt-1" />
                  <div className={`ml-10 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                    <div className="p-5 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)]/20 transition-all">
                      <span className="text-xs font-bold text-[var(--primary)]">{m.year}</span>
                      <h3 className="text-lg font-bold text-[var(--foreground)] mt-1">{m.title}</h3>
                      <p className="text-sm text-[var(--muted)] mt-1">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[var(--surface)] to-[var(--surface-alt)] border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">{t.about.ctaTitle}</h2>
            <p className="text-[var(--muted)] mb-6 max-w-md mx-auto">{t.about.ctaDesc}</p>
            <Link href={`/${lang}/contact`}>
              <Button size="lg">{t.about.ctaButton}<ArrowRight className="w-5 h-5" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
