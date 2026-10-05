import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CASE_LAWS, CASE_CATEGORIES, toCaseIndex } from "./_components/case-law-data";
import { CaseLawClient } from "./_components/case-law-client";

const BASE = "https://taxsaral.org";
const PAGE_URL = `${BASE}/case-law`;

export const metadata: Metadata = {
  title: "Landmark Income Tax Case Laws — Full Summaries | TaxSaral",
  description:
    "100 landmark Supreme Court and High Court judgments on capital gains, charitable trusts, transfer pricing, international taxation, business deductions, TDS, reassessment, penalties and cash credits — each with facts, arguments, reasoning and principles, mapped to Income Tax Act 2025 sections.",
  keywords: [
    "income tax case law",
    "capital gains case law",
    "charitable trust case law",
    "transfer pricing case law",
    "international taxation judgments",
    "permanent establishment case law",
    "reassessment case law",
    "penalty case law",
    "section 68 cash credits",
    "TDS case law",
    "IT Act 2025 case law",
    "Supreme Court income tax",
    "landmark tax judgments",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Landmark Income Tax Case Laws — Full Summaries | TaxSaral",
    description:
      "Capital gains, NPOs, transfer pricing, international tax, business deductions and reassessment — facts, arguments, reasoning and principles, mapped to IT Act 2025 sections.",
    url: PAGE_URL,
    type: "website",
    siteName: "TaxSaral",
  },
  twitter: {
    card: "summary",
    title: "Landmark Income Tax Case Laws — IT Act 2025 | TaxSaral",
    description:
      "Detailed judgment summaries across six subject areas, mapped to the new sections.",
  },
};

export default function CaseLawPage() {
  const byCategory = CASE_CATEGORIES.map((cat) => ({
    cat,
    count: CASE_LAWS.filter((c) => c.category === cat).length,
  })).filter((x) => x.count > 0);

  const courts = new Set(CASE_LAWS.map((c) => c.court)).size;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Landmark Income Tax Case Laws",
    description:
      "Leading judgments on capital gains and charitable trusts, mapped to Income Tax Act 2025 sections.",
    url: PAGE_URL,
    publisher: { "@type": "Organization", name: "TaxSaral", url: BASE },
    hasPart: CASE_LAWS.map((c) => ({
      "@type": "Article",
      headline: c.caseName,
      about: `${c.section2025} — ${c.sectionTopic}`,
      datePublished: String(c.year),
      description: c.held,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <PageHeader
        kicker="Judicial precedent"
        title="Landmark case law"
        stats={[
          { value: CASE_LAWS.length, label: "judgments" },
          { value: byCategory.length, label: "subject areas" },
          { value: courts, label: "courts" },
        ]}
      >
        <p>
          Leading judgments set out in full: the facts, how the matter reached the court,
          the arguments on both sides, the reasoning, and the principles established. Every
          case is mapped from the Income Tax Act 1961 provision it was decided under to the
          corresponding section of the Income Tax Act 2025, with a note on how far the
          principle still holds under the new Act.
        </p>
      </PageHeader>

      {/* Listing */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        <CaseLawClient index={toCaseIndex(CASE_LAWS)} />

        <div className="mt-10 border-t pt-5 text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Note on section references: </span>
          Each judgment was decided under the Income Tax Act 1961. The corresponding
          Income Tax Act 2025 sections shown here are drawn from the section mapping used
          across this site. Where a provision has been recast rather than merely renumbered,
          the note explains how far the principle still applies. Citations are given for
          verification against the full text of the judgment — this page is a summary for
          educational use and is not a substitute for reading the judgment or for
          professional advice.
        </div>
      </section>
    </main>
  );
}
