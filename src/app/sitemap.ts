import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const pages = [
  { path: "", priority: 1.0 },
  { path: "/products", priority: 0.9 },
  { path: "/solutions", priority: 0.9 },
  { path: "/cases", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of ["zh", "en"]) {
    for (const page of pages) {
      entries.push({
        url: `${SITE_URL}/${lang}${page.path}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: page.priority,
      });
    }
  }

  return entries;
}
