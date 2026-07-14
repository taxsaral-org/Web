import type { MetadataRoute } from "next";
import { SECTIONS } from "@/app/section-explainer/_components/sections-data";
import { DETAILED_ENTRIES } from "@/app/detailed-explainer/_components/detailed-data";

const BASE = "https://taxsaral.org";
const NOW = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                                        lastModified: NOW, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/guide`,                             lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/section-explainer`,                 lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/detailed-explainer`,                lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/section-mapping`,                   lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/tax-calendar`,                      lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/regime-optimizer`,      lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/hra`,                   lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/house-property-income`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/multiple-employer`,     lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/advance-tax`,           lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/residential-status`,    lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ask`,                               lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
  ];

  const sectionPages: MetadataRoute.Sitemap = SECTIONS.map((s) => ({
    url: `${BASE}/section-explainer/${s.slug}`,
    lastModified: NOW,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const detailedPages: MetadataRoute.Sitemap = DETAILED_ENTRIES.map((e) => ({
    url: `${BASE}/detailed-explainer/${e.slug}`,
    lastModified: new Date(e.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...detailedPages, ...sectionPages];
}
