import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { HpClient } from "./_components/hp-client";

export const metadata: Metadata = {
  title: "House Property Income Calculator — TaxSaral",
  description:
    "Calculate income or loss from house property under Sections 20-25, Income Tax Act 2025. Covers self-occupied, let-out, deemed let-out, co-ownership, and arrears.",
};

export default function HousePropertyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Tax Year 2026-27
          </span>
          <span>·</span>
          <span>Income Tax Act 2025</span>
          <span>·</span>
          <span>Sections 20-25</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          House Property Income Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Compute income or loss from house property under the entire Chapter IV-C
          (Sections 20–25). Supports multiple properties, co-ownership, and arrears
          of rent.
        </p>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For guidance only.</span> Calculations
            are estimates based on published IT Act 2025 rates. Verify with a CA
            before filing your return. Foreign property income is noted but DTAA
            relief is not computed here.
          </p>
        </div>
      </div>

      <HpClient />
    </div>
  );
}
