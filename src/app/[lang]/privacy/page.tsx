import { hasLocale, getDictionary } from "../dictionaries";
import { notFound } from "next/navigation";

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className="pt-24 pb-16">
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-8">{t.footer.privacy}</h1>
          <div className="prose prose-lg max-w-none text-[var(--muted)] space-y-6">
            <p>Last updated: January 2026</p>
            <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">1. Information Collection</h2>
            <p>We collect information you provide when filling out contact forms, including your name, company, email address, phone number, and industry details. This information is used solely for responding to your inquiries and providing relevant product information.</p>
            <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">2. Data Usage</h2>
            <p>Your data is used exclusively for business communication purposes. We do not sell, rent, or share your personal information with third parties for marketing purposes. Data may be shared with authorized distributors when necessary to fulfill your specific inquiry.</p>
            <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">3. Data Storage & Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Data is stored on secure servers with encryption at rest and in transit.</p>
            <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">4. Cookies</h2>
            <p>This site uses essential cookies for session management and locale preferences. We do not use tracking cookies or third-party analytics services. You may disable cookies in your browser settings, though this may affect site functionality.</p>
            <h2 className="text-xl font-bold text-[var(--foreground)] mt-8 mb-4">5. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal data. To exercise these rights or ask questions about our privacy practices, please contact us at {t.footer.contact}.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
