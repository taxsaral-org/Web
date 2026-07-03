import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { HraClient } from "./_components/hra-client";

export const metadata: Metadata = {
  title: "HRA Exemption Calculator — TaxSaral",
  description:
    "Calculate your House Rent Allowance exemption under the Income Tax Act 2025 (Schedule III), Tax Year 2026-27.",
};

export default function HraPage() {
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
          <span>Schedule III</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">HRA Exemption Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Find how much of your House Rent Allowance is exempt from tax under the optional regime.
        </p>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For guidance only.</span> HRA exemption applies only
            under the optional (old) regime. Verify with a CA before filing.
          </p>
        </div>
      </div>

      <HraClient />
    </div>
  );
}
