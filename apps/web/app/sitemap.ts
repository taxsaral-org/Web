import type { MetadataRoute } from "next";
import { SECTIONS } from "@/app/section-explainer/_components/sections-data";
import { DETAILED_ENTRIES } from "@/app/detailed-explainer/_components/detailed-data";

const BASE = "https://taxsaral.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                                         changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/guide`,                              changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/section-explainer`,                  changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/detailed-explainer`,                 changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/section-mapping`,                    changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/calculators/regime-optimizer`,       changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/hra`,                    changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/house-property-income`,  changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/multiple-employer`,      changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/advance-tax`,            changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/calculators/residential-status`,     changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ask`,                                changeFrequency: "monthly", priority: 0.7 },
  ];

  const sectionPages: MetadataRoute.Sitemap = SECTIONS.map((s) => ({
    url: `${BASE}/section-explainer/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const detailedPages: MetadataRoute.Sitemap = DETAILED_ENTRIES.map((e) => ({
    url: `${BASE}/detailed-explainer/${e.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...detailedPages, ...sectionPages];
}
