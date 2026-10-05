import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ExplainerClient } from "./_components/explainer-client";
import { SECTIONS } from "./_components/sections-data";

export const metadata: Metadata = {
  title: "IT Act 2025 Section Explainer — Plain-English Guide | TaxSaral",
  description: "Look up any Income Tax Act 2025 section in plain English. See the old IT Act 1961 equivalent, what the section means, worked examples, and who it applies to.",
  keywords: ["IT Act 2025 sections", "income tax act 2025 guide", "section explainer", "IT Act 1961 to 2025 mapping", "income tax plain english"],
  alternates: { canonical: "https://taxsaral.org/section-explainer" },
  openGraph: { title: "IT Act 2025 Section Explainer | TaxSaral", description: "Every Income Tax Act 2025 section explained in plain English with worked examples.", url: "https://taxsaral.org/section-explainer", type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "IT Act 2025 Section Explainer | TaxSaral", description: "Every IT Act 2025 section in plain English with worked examples." },
};

export default function SectionExplainerPage() {
  return (
    <main>
      <PageHeader
        kicker="Income Tax Act 2025 · Tax Year 2026-27"
        title="Section Explainer"
        stats={[{ value: SECTIONS.length, label: "sections explained" }]}
      >
        <p>
          The sections that come up most in practice, in plain English. Each entry gives the
          new section number, its 1961 equivalent, what the provision means and who it applies
          to, with worked examples on the full page. Searching an old number such as
          &ldquo;80C&rdquo; or &ldquo;234B&rdquo; finds the new section.
        </p>
      </PageHeader>

      <section className="container mx-auto max-w-4xl py-8">
        <ExplainerClient />

        <p className="mt-10 border-t pt-5 text-xs leading-relaxed text-muted-foreground">
          Section references are based on the Income Tax Act 2025 as applicable to Tax Year 2026-27.
          This is an educational reference, not legal or tax advice. Verify with a Chartered Accountant before filing.
        </p>
      </section>
    </main>
  );
}
