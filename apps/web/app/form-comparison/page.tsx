import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FormComparisonClient } from "./_components/form-comparison-client";
import { FORMS, RULES_2026_PDF } from "./_components/form-data";

const BASE     = "https://taxsaral.org";
const PAGE_URL = `${BASE}/form-comparison`;

export const metadata: Metadata = {
  title: "New Income Tax Form Numbers 2026 — Old vs New Forms | TaxSaral",
  description:
    "Find the new form number for any old income tax form under the Income-tax Rules, 2026 — Form 16 is now Form 130, Form 26AS is Form 168, Form 3CD is Form 26. Each new form links to the official notified PDF.",
  keywords: [
    "income tax form names 2025",
    "IT Act 2025 new forms",
    "ITR form comparison",
    "Form 16 to Form 130",
    "Form 26AS to Form 168",
    "Form 3CD to Form 26",
    "Income-tax Rules 2026 forms",
    "TDS forms IT Act 2025",
    "income tax forms India",
    "tax form number change 2025",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "New Income Tax Form Numbers — Income-tax Rules, 2026 | TaxSaral",
    description:
      "Old and new income tax form numbers side by side, with links to the official notified forms.",
    url: PAGE_URL,
    type: "website",
    siteName: "TaxSaral",
  },
  twitter: {
    card: "summary",
    title: "Income Tax Form Comparison — IT Act 1961 vs 2025 | TaxSaral",
    description: "Old and new income tax form numbers under the Income-tax Rules, 2026, with links to the official forms.",
  },
};

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Table",
  name: "Income Tax Forms Comparison — IT Act 1961 vs IT Act 2025",
  description:
    "Income tax forms under the Income-tax Rules, 1962 and their new numbers under the Income-tax Rules, 2026 (G.S.R. 198(E), 20 March 2026).",
  url: PAGE_URL,
  about: {
    "@type": "Legislation",
    name: "Income Tax Act 2025",
    jurisdiction: "India",
  },
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",            item: BASE },
    { "@type": "ListItem", position: 2, name: "Form Comparison", item: PAGE_URL },
  ],
};

const STATUS_COUNTS = {
  Renumbered: FORMS.filter((f) => f.status === "Renumbered").length,
  Merged:     FORMS.filter((f) => f.status === "Merged").length,
  Same:       FORMS.filter((f) => f.status === "Same").length,
  Renamed:    FORMS.filter((f) => f.status === "Renamed").length,
};

export default function FormComparisonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />

      <main>
        <PageHeader
          kicker="Income-tax Rules, 2026 · Tax Year 2026-27"
          title="Income tax forms, old and new"
          width="max-w-5xl"
          stats={[
            { value: FORMS.length, label: "forms" },
            { value: STATUS_COUNTS.Renumbered, label: "renumbered" },
            { value: STATUS_COUNTS.Merged, label: "merged" },
            { value: STATUS_COUNTS.Same + STATUS_COUNTS.Renamed, label: "ITRs (same or renamed)" },
          ]}
        >
          <p>
            The Income-tax Rules, 2026 renumbered almost every income tax form from 1 April 2026.
            Form 16 is now Form No. 130, Form 26AS is Form No. 168, and the tax audit Forms 3CA,
            3CB and 3CD are combined into Form No. 26. Find the new number for any old form, and
            click it to open the official form as notified by CBDT.
          </p>
        </PageHeader>

        {/* ── Table ────────────────────────────────────────────────────── */}
        <section className="container mx-auto max-w-5xl px-4 py-8">
          <FormComparisonClient />

          <div className="mt-10 border-t pt-5 text-xs leading-relaxed text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Source: </span>
              Income-tax Rules, 2026, notified by CBDT vide G.S.R. 198(E) dated 20 March 2026
              (forms in Appendix III). Each new form number links to that form in the official copy
              published on the e-filing portal; Forms 132 and 141 were later amended by the
              Income-tax (Fifth Amendment) Rules, 2026 with effect from 1 October 2026, and the block
              assessment return ITR-BN was notified by the Income-tax (Third Amendment) Rules, 2026. Old-to-new
              pairings follow the Income Tax Department&rsquo;s form documents and Form Mapping Guide.
              Forms under the 1962 Rules continue for years before Tax Year 2026-27.
            </p>
            <a
              href={RULES_2026_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-semibold text-primary underline-offset-2 hover:underline"
            >
              Income-tax Rules, 2026 — official PDF (incometax.gov.in)
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
