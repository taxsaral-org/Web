import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { FormComparisonClient } from "./_components/form-comparison-client";
import { FORMS } from "./_components/form-data";

const BASE     = "https://taxsaral.org";
const PAGE_URL = `${BASE}/form-comparison`;

export const metadata: Metadata = {
  title: "Income Tax Form Names — Old IT Act 1961 vs New IT Act 2025 | TaxSaral",
  description:
    `Compare all income tax form names under the old IT Act 1961 and new IT Act 2025. See what's renamed, what's new, and what stayed the same — ITR forms, TDS returns, audit reports, declarations, and more.`,
  keywords: [
    "income tax form names 2025",
    "IT Act 2025 new forms",
    "ITR form comparison",
    "Form 3CA to Form 6A",
    "Form 26AS AIS comparison",
    "TDS forms IT Act 2025",
    "income tax forms India",
    "tax form number change 2025",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Income Tax Forms — Old IT Act 1961 vs IT Act 2025 | TaxSaral",
    description:
      "Compare old and new income tax form names side-by-side. See what's renamed, new, or unchanged across ITR, TDS, audit, and declaration forms.",
    url: PAGE_URL,
    type: "website",
    siteName: "TaxSaral",
  },
  twitter: {
    card: "summary",
    title: "Income Tax Form Comparison — IT Act 1961 vs 2025 | TaxSaral",
    description: "Side-by-side comparison of old and new income tax form names. See what changed under IT Act 2025.",
  },
};

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Table",
  name: "Income Tax Forms Comparison — IT Act 1961 vs IT Act 2025",
  description:
    "A comprehensive table comparing income tax form names under the old Income Tax Act 1961 and the new Income Tax Act 2025, showing what has been renamed, newly introduced, or retained.",
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
  Same:        FORMS.filter((f) => f.status === "Same").length,
  Renamed:     FORMS.filter((f) => f.status === "Renamed").length,
  "New in 2025": FORMS.filter((f) => f.status === "New in 2025").length,
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
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="border-b bg-gradient-to-br from-indigo-50/60 via-background to-background dark:from-indigo-950/20">
          <div className="container mx-auto max-w-5xl px-4 py-10">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-900/40">
                <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
                  IT Act 2025 · Tax Year 2026-27
                </p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Income Tax Form Comparison
                </h1>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground mb-6">
              The Income Tax Act 2025 renumbered sections and revised several form names.
              This page helps you find the new equivalent for any old form — and spot what&apos;s
              genuinely new under the 2025 Act.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                {FORMS.length} forms covered
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                {STATUS_COUNTS.Same} unchanged
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                {STATUS_COUNTS.Renamed} renamed
              </span>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                {STATUS_COUNTS["New in 2025"]} new in 2025
              </span>
            </div>
          </div>
        </section>

        {/* ── Table ────────────────────────────────────────────────────── */}
        <section className="container mx-auto max-w-5xl px-4 py-8">
          <FormComparisonClient />

          <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground">
            Based on IT Act 2025 as applicable to Tax Year 2026-27. Form names for some
            categories (e.g., audit forms) are subject to final CBDT notification. Verify
            with a Chartered Accountant or the official Income Tax Portal before filing.
          </p>
        </section>
      </main>
    </>
  );
}
