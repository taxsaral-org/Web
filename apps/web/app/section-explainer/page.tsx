import type { Metadata } from "next";
import { ExplainerClient } from "./_components/explainer-client";

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
    <div className="container mx-auto max-w-4xl px-4 py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            IT Act 2025
          </span>
          <span>·</span>
          <span>Tax Year 2026-27</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Section Explainer
        </h1>
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
          Search any section of the Income Tax Act 2025 in plain English. Each entry shows the
          new 2025 section number, the old IT Act 1961 equivalent, and a clear explanation of
          what the provision means and who it applies to.
        </p>

        {/* Old vs New pill */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-xs">
            <span className="font-medium text-foreground">Tip:</span>
            <span className="text-muted-foreground">
              Know an old section (like &ldquo;80C&rdquo; or &ldquo;234B&rdquo;)? Search for it — we show the new IT Act 2025 equivalent.
            </span>
          </div>
        </div>
      </div>

      <ExplainerClient />

      <p className="mt-8 text-xs text-muted-foreground text-center leading-relaxed">
        Section references are based on the Income Tax Act 2025 as applicable to Tax Year 2026-27.
        This is an educational reference — not legal or tax advice. Verify with a Chartered Accountant before filing.
      </p>
    </div>
  );
}
