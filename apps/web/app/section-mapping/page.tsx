import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";
import { MappingClient } from "./_components/mapping-client";
import { SECTIONS_IN_FORCE } from "./_components/mapping-data";

export const metadata: Metadata = {
  title: "Income Tax Section Mapping: 1961 Act → 2025 Act | TaxSaral",
  description:
    "Searchable mapping of every section from the Income Tax Act 1961 to its equivalent in the Income Tax Act 2025. Find the new section number for any old provision.",
  alternates: { canonical: "https://taxsaral.org/section-mapping" },
};

export default function SectionMappingPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            Reference
          </span>
          <span className="text-xs text-muted-foreground">
            IT Act 1961 → IT Act 2025 · all {SECTIONS_IN_FORCE} sections in force, with official headings
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          New and Old Income Tax Section Mapping
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
          The Income Tax Act 2025 replaces the Income Tax Act 1961 with effect from Tax Year 2026-27.
          Every provision has been renumbered. Use this reference to find the 2025 equivalent of any
          1961 section, or look up what a 2025 section number used to be.
        </p>
      </div>

      {/* Official source banner */}
      <div className="mb-6 flex flex-col gap-2 rounded-xl border border-blue-200 bg-blue-50/60 px-5 py-4 sm:flex-row sm:items-start sm:gap-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
        <div className="flex-1 text-sm text-blue-800 leading-relaxed">
          <span className="font-semibold">Sources: </span>
          Section numbers, chapters and headings are taken from the Income-tax Act, 2025 as published
          in the Gazette of India (21 August 2025), updated for the Finance Act, 2026 (Gazette, 30 March
          2026), which substituted sections 150, 217, 218, 283, 427, 428, 446, 454, 480, 481 and 522,
          inserted section 354A, omitted sections 443 and 447, and amended the headings of sections
          440, 467, 473 and 474. The corresponding 1961 sections follow ICAI&rsquo;s tabular mapping of the
          Act (September 2025). The Income Tax Department also maintains an official cross-reference
          utility — verify critical section numbers there before filing or advising.
          <br />
          <a
            href="https://www.incometaxindia.gov.in/utility-to-check-provisions-of-income-tax-act-1961-vis-a-vis-income-tax-act-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
          >
            incometaxindia.gov.in — Official Utility
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* How to read this table */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">1961 Act Column</p>
          <p className="text-sm text-muted-foreground leading-relaxed">The corresponding section(s) of the Income Tax Act 1961. Where one new section consolidates several old ones, all of them are listed.</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">2025 Act Column</p>
          <p className="text-sm text-muted-foreground leading-relaxed">The section of the Income Tax Act 2025 (applicable from Tax Year 2026-27) with its official heading and chapter.</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Search & Filter</p>
          <p className="text-sm text-muted-foreground leading-relaxed">Type any old section (e.g. &ldquo;80C&rdquo;), new section (e.g. &ldquo;123&rdquo;), or keyword (e.g. &ldquo;depreciation&rdquo;).</p>
        </div>
      </div>

      {/* Interactive mapping table */}
      <MappingClient />

      {/* Section explainer CTA */}
      <div className="mt-8 rounded-xl border bg-muted/30 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-sm">Want a plain-English explanation of any section?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              The Section Explainer covers key 2025 Act sections with worked examples and real-money scenarios.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              href="/section-explainer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Section Explainer
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              IT Act 2025 Guide
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground text-center leading-relaxed">
        Sections and headings: Income-tax Act, 2025 (No. 30 of 2025) as amended by the Finance Act, 2026 —
        {SECTIONS_IN_FORCE} sections in force. Corresponding 1961 provisions: ICAI&rsquo;s tabular mapping. Many provisions were consolidated,
        split or restructured; where ICAI maps a group of sections together (marked &ldquo;group&rdquo;),
        the reference applies to the group as a whole. Verify with the official utility or a Chartered
        Accountant for legal accuracy.
      </p>
    </main>
  );
}
