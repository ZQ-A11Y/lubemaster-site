import { hasLocale, getDictionary } from "../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Cog, Cloud, Wrench, ArrowRight, Check, ShieldCheck, Gauge, Vibrate, ThermometerSnowflake, Cpu, Syringe } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

const ICONS = [Cog, Gauge, Vibrate, ThermometerSnowflake, Cpu, Syringe];

export async function generateMetadata({ params }: PageProps<"/[lang]/products">): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang as "zh" | "en");
  return {
    title: t.products.title,
    description: t.products.subtitle,
    alternates: { canonical: `${SITE_URL}/${lang}/products` },
  };
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className="pt-24 pb-16">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle badge={t.products.badge} title={t.products.title} subtitle={t.products.subtitle} />
        </div>
      </section>

      {/* Hardware */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
              <Cog className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t.products.categories.hardware}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.products.list.map((p: { name: string; nameEn: string; desc: string; specs: string[] }, i: number) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={i} className="group p-6 rounded-2xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)]/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">{p.name}</h3>
                  <p className="text-xs text-[var(--muted)] mb-3">{p.nameEn}</p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">{p.desc}</p>
                  <div className="space-y-2">
                    {p.specs.map((s: string, j: number) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-[var(--foreground)]">
                        <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Software */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
              <Cloud className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t.products.categories.software}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.products.software.map((p: { name: string; nameEn: string; desc: string; features: string[] }, i: number) => (
              <div key={i} className="group p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/30 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-5 group-hover:scale-110 transition-transform">
                  <Cloud className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">{p.name}</h3>
                <p className="text-xs text-[var(--muted)] mb-3">{p.nameEn}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">{p.desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {p.features.map((f: string, j: number) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-[var(--foreground)]">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
              <Wrench className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t.products.categories.service}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.products.services.map((s: { name: string; desc: string }, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:border-green-300 hover:shadow-md transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-green-500 mb-3" />
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{s.name}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href={`/${lang}/contact`}>
              <Button size="lg">{t.products.cta}<ArrowRight className="w-5 h-5" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
