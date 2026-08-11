import { hasLocale, getDictionary } from "../dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Mail, MapPin, Phone, Globe, Clock, CheckCircle2 } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ContactForm } from "@/components/ui/contact-form";

const INFO_ICONS = [MapPin, Mail, Phone, Globe, Clock];

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang as "zh" | "en");
  return {
    title: t.contact.title,
    description: t.contact.subtitle,
    alternates: { canonical: `/${lang}/contact` },
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className="pt-24 pb-16">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle badge={t.contact.badge} title={t.contact.title} subtitle={t.contact.subtitle} />
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-6">{t.contact.infoTitle}</h3>
                <div className="space-y-5">
                  {t.contact.infoItems.map((item: { label: string; value: string }, i: number) => {
                    const IconComp = INFO_ICONS[i];
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                          <IconComp className="w-5 h-5 text-[var(--primary)]" />
                        </div>
                        <div>
                          <div className="text-xs text-[var(--muted)] font-medium">{item.label}</div>
                          <div className="text-sm text-[var(--foreground)] whitespace-pre-line mt-0.5">{item.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">{t.contact.whyTitle}</h3>
                <ul className="space-y-3">
                  {t.contact.whyItems.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm t={t.contact} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
