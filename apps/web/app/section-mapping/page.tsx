import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";
import { MappingClient } from "./_components/mapping-client";
import { MAPPINGS } from "./_components/mapping-data";

export const metadata: Metadata = {
  title: "Income Tax Section Mapping: 1961 Act → 2025 Act | TaxSaral",
  description:
    "Searchable mapping of every section from the Income Tax Act 1961 to its equivalent in the Income Tax Act 2025. Find the new section number for any old provision.",
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
            IT Act 1961 → IT Act 2025 · {MAPPINGS.length}+ section mappings
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
          <span className="font-semibold">Authoritative source: </span>
          The official cross-reference utility is maintained by the Income Tax Department of India.
          Always verify critical section numbers against the official source before filing or advising.
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
          <p className="text-sm text-muted-foreground leading-relaxed">The old section number from the Income Tax Act 1961 that practitioners are familiar with.</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">2025 Act Column</p>
          <p className="text-sm text-muted-foreground leading-relaxed">The new section number in the Income Tax Act 2025, applicable from Tax Year 2026-27 onwards.</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Search & Filter</p>
          <p className="text-sm text-muted-foreground leading-relaxed">Type any old section (e.g. &ldquo;80C&rdquo;), new section (e.g. &ldquo;123&rdquo;), or keyword (e.g. &ldquo;HRA&rdquo;).</p>
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
        Mappings compiled from the Income Tax Act 2025 (536 sections) and official cross-reference
        resources. Some provisions were consolidated, split, or restructured — the mapping reflects
        the closest equivalent. Verify with the official utility or a Chartered Accountant for
        legal accuracy.
      </p>
    </main>
  );
}
