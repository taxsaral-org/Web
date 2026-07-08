import type { Metadata } from "next";
import { DetailedListingClient } from "./_components/detailed-listing-client";

export const metadata: Metadata = {
  title: "Detailed Tax Explainer — In-Depth Section Analysis | TaxSaral",
  description:
    "Deep-dive analyses of specific Income Tax Act 2025 sections — full tax treatment, worked examples, tables, and calculation walk-throughs in plain English.",
};

export default function DetailedExplainerPage() {
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
          Detailed Explainer
        </h1>
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
          In-depth analyses of specific Income Tax Act 2025 provisions — full tax treatment
          with tables, calculation walk-throughs, and worked examples written in plain English.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-xs">
            <span className="font-medium text-foreground">Tip:</span>
            <span className="text-muted-foreground">
              Each entry covers a single topic end-to-end — tax treatment, rates, exceptions, and examples.
            </span>
          </div>
        </div>
      </div>

      <DetailedListingClient />

      <p className="mt-8 text-xs text-muted-foreground text-center leading-relaxed">
        Content is based on the Income Tax Act 2025 as applicable to Tax Year 2026-27.
        This is an educational reference — not legal or tax advice. Verify with a Chartered Accountant before filing.
      </p>
    </div>
  );
}
