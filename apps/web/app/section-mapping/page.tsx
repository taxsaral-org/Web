import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/page-header";
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
    <main>
      <PageHeader
        kicker={<>Income Tax Act 1961 &rarr; Income Tax Act 2025</>}
        title="Old and new section mapping"
        width="max-w-6xl"
        stats={[{ value: SECTIONS_IN_FORCE, label: "sections in force, with official headings" }]}
      >
        <p>
          The Income Tax Act 2025 replaces the Income Tax Act 1961 from Tax Year 2026-27, and
          almost every provision has a new number. Find the 2025 equivalent of any 1961 section,
          or look up what a 2025 section used to be. Search by old number (&ldquo;80C&rdquo;),
          new number (&ldquo;123&rdquo;) or a word from the heading (&ldquo;depreciation&rdquo;).
          Where one new section consolidates several old ones, all of them are listed.
        </p>
      </PageHeader>

      <section className="container mx-auto max-w-6xl py-8">
        <MappingClient />

        <div className="mt-10 grid gap-8 border-t pt-6 text-xs leading-relaxed text-muted-foreground md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-foreground">Sources</p>
            <p className="mt-2">
              Section numbers, chapters and headings are taken from the Income-tax Act, 2025 as published
              in the Gazette of India (21 August 2025), updated for the Finance Act, 2026 (Gazette, 30 March
              2026), which substituted sections 150, 217, 218, 283, 427, 428, 446, 454, 480, 481 and 522,
              inserted section 354A, omitted sections 443 and 447, and amended the headings of sections
              440, 467, 473 and 474. The corresponding 1961 sections follow ICAI&rsquo;s tabular mapping of the
              Act (September 2025). Where ICAI maps a group of sections together (marked &ldquo;group&rdquo;),
              the reference applies to the group as a whole.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Check before you rely on it</p>
            <p className="mt-2">
              Many provisions were consolidated, split or restructured. The Income Tax Department maintains
              an official cross-reference utility; verify critical section numbers there, or with a
              Chartered Accountant, before filing or advising.
            </p>
            <a
              href="https://www.incometaxindia.gov.in/utility-to-check-provisions-of-income-tax-act-1961-vis-a-vis-income-tax-act-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4"
            >
              Official utility on incometaxindia.gov.in
              <ExternalLink className="h-3 w-3" />
            </a>
            <p className="mt-4">
              For what a section actually says, see the{" "}
              <Link href="/section-explainer" className="text-primary underline underline-offset-4">Section Explainer</Link>{" "}
              or the{" "}
              <Link href="/guide" className="text-primary underline underline-offset-4">beginner&rsquo;s guide</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
