import { hasLocale, getDictionary } from "../dictionaries";
import { notFound } from "next/navigation";

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const legal = t.legal.terms;

  return (
    <div className="pt-24 pb-16">
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-8">{t.footer.terms}</h1>
          <div className="prose prose-lg max-w-none text-[var(--muted)] space-y-6">
            <p>{legal.lastUpdated}</p>
            {legal.sections.map((s: { heading: string; body: string }, i: number) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">{s.heading}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
