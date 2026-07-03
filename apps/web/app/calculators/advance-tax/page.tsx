import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { parseParam } from "@/lib/cross-link";
import { AdvanceTaxClient } from "./_components/at-client";

export const metadata: Metadata = {
  title: "Advance Tax Calculator — TaxSaral",
  description:
    "Calculate your quarterly advance tax instalments under the Income Tax Act 2025, Tax Year 2026-27.",
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function AdvanceTaxPage({ searchParams }: Props) {
  const initialIncome = parseParam(searchParams, "income");
  const initialTds = parseParam(searchParams, "tds");

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Tax Year 2026-27
          </span>
          <span>·</span>
          <span>Income Tax Act 2025</span>
          <span>·</span>
          <span>Section 425</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Advance Tax Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Calculate your quarterly advance tax instalments to avoid interest on late or short payment.
        </p>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For guidance only.</span> Interest on late payment is
            not computed here. Verify with a CA before making advance tax payments.
          </p>
        </div>
      </div>

      <AdvanceTaxClient
        initialIncome={initialIncome}
        initialTds={initialTds}
        prefillSource={initialIncome > 0 ? "Multiple Employer Calculator" : undefined}
      />
    </div>
  );
}
