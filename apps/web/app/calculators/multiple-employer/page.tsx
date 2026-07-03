import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { MultipleEmployerClient } from "./_components/me-client";

export const metadata: Metadata = {
  title: "Multiple Employer Tax Calculator — TaxSaral",
  description:
    "Aggregate salary from multiple employers and check advance tax liability. Income Tax Act 2025, Tax Year 2026-27.",
};

export default function MultipleEmployerPage() {
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
          <span>Section 392 (TDS)</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Multiple Employer Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Switched jobs this year? Aggregate your salary income and TDS from all employers to
          find your net tax position.
        </p>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For guidance only.</span> Computed under the default
            regime with standard deduction only. Include Form 16 from each employer. Verify with a
            CA before filing.
          </p>
        </div>
      </div>

      <MultipleEmployerClient />
    </div>
  );
}
