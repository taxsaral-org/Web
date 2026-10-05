import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { DetailedListingClient } from "./_components/detailed-listing-client";
import { DETAILED_ENTRIES } from "./_components/detailed-data";

export const metadata: Metadata = {
  title: "Detailed Tax Explainer — In-Depth IT Act 2025 Analysis | TaxSaral",
  description: "Deep-dive analyses of Income Tax Act 2025 provisions — full tax treatment, worked examples, case laws, computation tables, and step-by-step calculation walk-throughs in plain English.",
  keywords: ["income tax act 2025 analysis", "detailed tax explainer", "IT Act 2025 provisions", "capital gains tax India", "business deduction analysis", "TDS detailed guide"],
  alternates: { canonical: "https://taxsaral.org/detailed-explainer" },
  openGraph: { title: "Detailed IT Act 2025 Explainer | TaxSaral", description: "Deep-dive analyses of IT Act 2025 sections — worked examples, case laws, and computation tables.", url: "https://taxsaral.org/detailed-explainer", type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "Detailed IT Act 2025 Explainer | TaxSaral", description: "In-depth analyses of IT Act 2025 provisions with worked examples." },
};

export default function DetailedExplainerPage() {
  return (
    <main>
      <PageHeader
        kicker="Income Tax Act 2025 · Tax Year 2026-27"
        title="Detailed Explainer"
        stats={[{ value: DETAILED_ENTRIES.length, label: "analyses" }]}
      >
        <p>
          Longer analyses of the provisions that are hard to apply from the bare text.
          Each one sets out the complete tax treatment with tables, a step-by-step
          computation, diagrams where they help, and worked examples, citing the
          section at every step.
        </p>
      </PageHeader>

      {/* ── Listing ──────────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        <DetailedListingClient />

        <p className="mt-10 border-t pt-5 text-xs leading-relaxed text-muted-foreground">
          Based on the Income Tax Act 2025 for Tax Year 2026-27. Educational reference only —
          verify with a Chartered Accountant before filing.
        </p>
      </section>
    </main>
  );
}
