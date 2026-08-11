import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { hasLocale, getDictionary } from "./dictionaries";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <>
      <Header siteName={dict.site.name} nav={dict.nav} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer
        siteName={dict.site.name}
        slogan={dict.site.slogan}
        t={dict.footer}
        lang={lang}
      />
    </>
  );
}
