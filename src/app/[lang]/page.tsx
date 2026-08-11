import { hasLocale, getDictionary } from "./dictionaries";
import { notFound } from "next/navigation";
import { ArrowRight, Zap, Cpu, Thermometer, ShieldCheck, Gauge, Clock, Globe, DollarSign, Factory, UtensilsCrossed, Pill, Hammer, Anchor, CircuitBoard, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionTitle } from "@/components/ui/section-title";
import { DataCard } from "@/components/ui/data-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "润滑精控 LubeMaster",
  url: "https://www.lubemaster.cn",
  logo: "https://www.lubemaster.cn/favicon.svg",
  description: "全球领先的直驱多点智能润滑系统，99.5%系统可靠性，-40°C~70°C全温域覆盖。",
  address: {
    "@type": "PostalAddress",
    streetAddress: "西三环路289号7幢2层5号",
    addressLocality: "郑州市",
    addressRegion: "河南省",
    addressCountry: "CN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "3496622752@qq.com",
    contactType: "sales",
  },
  sameAs: ["https://www.lubemaster.cn"],
};

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--primary)]/5 blur-[120px] animate-orb-drift" />
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/5 blur-[100px] animate-orb-drift-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,204,0.04)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in mb-6">
              <Badge variant="primary" size="md">{t.site.slogan}</Badge>
            </div>
            <h1 className="animate-fade-in-up text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.1]">
              <span className="gradient-text animate-glow-pulse">{t.hero.title1}</span><br />{t.hero.title2}
            </h1>
            <p className="animate-fade-in-up animate-delay-200 mt-6 sm:mt-8 text-lg sm:text-xl text-[var(--muted)] leading-relaxed max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="animate-fade-in-up animate-delay-300 mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/${lang}/products`}>
                <Button size="lg">{t.hero.cta1}<ArrowRight className="w-5 h-5" /></Button>
              </Link>
              <Link href={`/${lang}/contact`}>
                <Button variant="outline" size="lg">{t.hero.cta2}</Button>
              </Link>
            </div>

            {/* Hero stats with animated counters */}
            <div className="animate-fade-in-up animate-delay-500 mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <DataCard variant="hero-stat" icon={<ShieldCheck className="w-5 h-5" />} value="99.5%" label={t.advantages.reliability} />
              <DataCard variant="hero-stat" icon={<Gauge className="w-5 h-5" />} value="15MPa" label={t.advantages.pressure} />
              <DataCard variant="hero-stat" icon={<Clock className="w-5 h-5" />} value=">50,000h" label={t.advantages.mtbf} />
              <DataCard variant="hero-stat" icon={<Thermometer className="w-5 h-5" />} value="-40~70°C" label={t.advantages.temp} />
            </div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════ CORE TECHNOLOGY ═══════════════ */}
      <section className="py-24 sm:py-32 bg-industrial-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal stagger>
            <SectionTitle badge={t.tech.badge} title={t.tech.title} subtitle={t.tech.subtitle} />
          </ScrollReveal>
          <ScrollReveal stagger className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              icon: <Zap className="w-7 h-7 text-[var(--primary)]" />,
              bg: "bg-[var(--primary)]/10",
              data: t.tech.direct,
              accent: "text-[var(--primary)]"
            }, {
              icon: <Cpu className="w-7 h-7 text-[var(--accent)]" />,
              bg: "bg-[var(--accent)]/10",
              data: t.tech.modular,
              accent: "text-[var(--accent)]"
            }, {
              icon: <Thermometer className="w-7 h-7 text-[var(--primary)]" />,
              bg: "bg-[var(--primary)]/10",
              data: t.tech.lowtemp,
              accent: "text-[var(--primary)]"
            }].map((item, i) => (
              <div key={i} className="group relative p-8 rounded-2xl bg-[var(--surface)] shadow-sm hover:shadow-lg hover:-translate-y-0.5 card-lift">
                <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>{item.icon}</div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">{item.data.title}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{item.data.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                  <span className={item.accent}>{item.data.statValue}</span>
                  <span className="text-[var(--muted)]">{item.data.stat}</span>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ ADVANTAGES ═══════════════ */}
      <section className="py-24 sm:py-32 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal stagger>
            <SectionTitle badge={t.advantages.badge} title={t.advantages.title} subtitle={t.advantages.subtitle} />
          </ScrollReveal>
          <ScrollReveal stagger className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { icon: <ShieldCheck className="w-6 h-6" />, value: "99.5%", label: t.advantages.reliability },
              { icon: <Gauge className="w-6 h-6" />, value: "15MPa", label: t.advantages.pressure },
              { icon: <Clock className="w-6 h-6" />, value: "50,000h+", label: t.advantages.mtbf },
              { icon: <Globe className="w-6 h-6" />, value: "-40~70°C", label: t.advantages.temp },
              { icon: <Zap className="w-6 h-6" />, value: "<0.5s", label: t.advantages.response },
              { icon: <DollarSign className="w-6 h-6" />, value: "1/3~1/2", label: t.advantages.cost },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl bg-[var(--background)] shadow-sm hover:shadow-md hover:-translate-y-0.5 card-lift">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mb-3">{item.icon}</div>
                <div className="text-2xl font-extrabold display-stat text-[var(--foreground)] mb-1">{item.value}</div>
                <div className="text-xs text-[var(--muted)] leading-tight">{item.label}</div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ INDUSTRIES ═══════════════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal stagger>
            <SectionTitle badge={t.industries.badge} title={t.industries.title} subtitle={t.industries.subtitle} />
          </ScrollReveal>
          <ScrollReveal stagger className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: <Factory className="w-8 h-8" />, label: t.industries.automotive },
              { icon: <UtensilsCrossed className="w-8 h-8" />, label: t.industries.food },
              { icon: <Pill className="w-8 h-8" />, label: t.industries.pharma },
              { icon: <Hammer className="w-8 h-8" />, label: t.industries.mining },
              { icon: <Anchor className="w-8 h-8" />, label: t.industries.port },
              { icon: <CircuitBoard className="w-8 h-8" />, label: t.industries.electronics },
            ].map((item, i) => (
              <Link key={i} href={`/${lang}/solutions`}
                className="group flex flex-col items-center text-center p-6 rounded-xl bg-[var(--surface)] shadow-sm hover:shadow-lg hover:-translate-y-0.5 card-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2">
                <div className="w-16 h-16 rounded-2xl bg-[var(--background)] shadow-sm flex items-center justify-center text-[var(--primary)] mb-4 group-hover:scale-110 group-hover:text-[var(--accent)] transition-all duration-300">{item.icon}</div>
                <span className="text-sm font-medium text-[var(--foreground)]">{item.label}</span>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ CASE PREVIEWS ═══════════════ */}
      <section className="py-24 sm:py-32 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal stagger>
            <SectionTitle badge={t.cases.badge} title={t.cases.title} subtitle={t.cases.subtitle} />
          </ScrollReveal>
          <ScrollReveal stagger className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { data: t.cases.case1, icon: <Factory className="w-6 h-6" />, metrics: [{ icon: <TrendingDown className="w-4 h-4 text-green-500" />, text: t.cases.case1.metrics[0] }, { icon: <TrendingDown className="w-4 h-4 text-green-500" />, text: t.cases.case1.metrics[1] }, { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: t.cases.case1.metrics[2] }] },
              { data: t.cases.case2, icon: <UtensilsCrossed className="w-6 h-6" />, metrics: [{ icon: <TrendingUp className="w-4 h-4 text-green-500" />, text: t.cases.case2.metrics[0] }, { icon: <TrendingUp className="w-4 h-4 text-green-500" />, text: t.cases.case2.metrics[1] }, { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: t.cases.case2.metrics[2] }] },
              { data: t.cases.case3, icon: <Pill className="w-6 h-6" />, metrics: [{ icon: <TrendingUp className="w-4 h-4 text-green-500" />, text: t.cases.case3.metrics[0] }, { icon: <TrendingDown className="w-4 h-4 text-green-500" />, text: t.cases.case3.metrics[1] }, { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: t.cases.case3.metrics[2] }] },
            ].map((item, i) => (
              <Link key={i} href={`/${lang}/cases`}
                className="group relative p-8 rounded-2xl bg-[var(--background)] shadow-sm hover:shadow-xl hover:-translate-y-0.5 card-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2">
                <div className="absolute top-4 right-4 text-6xl font-extrabold text-[var(--surface-alt)] select-none">{String(i + 1).padStart(2, "0")}</div>
                <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{item.data.title}</h3>
                <div className="text-3xl font-extrabold gradient-text mb-3">{item.data.value}</div>
                <p className="text-sm text-[var(--muted)] mb-6">{item.data.result}</p>
                <div className="space-y-2">
                  {item.metrics.map((m, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-[var(--foreground)]">{m.icon}<span>{m.text}</span></div>
                  ))}
                </div>
              </Link>
            ))}
          </ScrollReveal>
          <ScrollReveal className="mt-10 text-center">
            <Link href={`/${lang}/cases`}>
              <Button variant="outline" size="lg">{t.cases.viewAll}<ArrowRight className="w-5 h-5" /></Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="relative p-12 sm:p-16 rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] overflow-hidden bg-industrial-grain shadow-xl shadow-[var(--primary)]/20">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-[100px] animate-orb-drift" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-[100px] animate-orb-drift-slow" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">{t.cta.title}</h2>
                <p className="mt-4 text-lg text-white/80 max-w-lg mx-auto">{t.cta.subtitle}</p>
                <div className="mt-8">
                  <Link href={`/${lang}/contact`}>
                    <Button size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90 shadow-xl">{t.cta.button}<ArrowRight className="w-5 h-5" /></Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
