import { hasLocale, getDictionary } from "../dictionaries";
import { notFound } from "next/navigation";

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className="pt-24 pb-16">
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-8">{t.footer.terms}</h1>
          <div className="prose prose-lg max-w-none text-[var(--muted)] space-y-6">
            <p>Last updated: January 2026</p>
            <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">1. Website Use</h2>
            <p>By accessing this website, you agree to these terms of service. The content on this website is for general informational purposes only and is subject to change without notice. We reserve the right to modify or discontinue any aspect of the website at our sole discretion.</p>
            <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">2. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, images, and software, is the property of LubeMaster or its content suppliers and is protected by applicable intellectual property laws. The LubeMaster name and logo are registered trademarks.</p>
            <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">3. Product Information</h2>
            <p>Product specifications, pricing, and availability are subject to change without notice. Technical data provided on this website is for reference only. Contact our sales team for the most current product information and to discuss your specific requirements.</p>
            <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">4. Limitation of Liability</h2>
            <p>LubeMaster shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of or inability to use this website or its content. This includes, but is not limited to, damages for loss of profits, data, or business interruption.</p>
            <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">5. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the People&apos;s Republic of China. Any disputes arising from these terms shall be subject to the jurisdiction of the courts in Beijing, China.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
