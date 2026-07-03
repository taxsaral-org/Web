import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { parseParam } from "@/lib/cross-link";
import { OptimizerClient } from "./_components/optimizer-client";

export const metadata: Metadata = {
  title: "Tax Regime Optimizer — TaxSaral",
  description:
    "Compare Default vs Optional income tax regimes under the Income Tax Act 2025 for Tax Year 2026-27. Real-time calculation with Section 156 rebate and marginal relief.",
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function RegimeOptimizerPage({ searchParams }: Props) {
  const initialHra = parseParam(searchParams, "hra");
  const initialHpIncome = parseParam(searchParams, "hpIncome", true); // can be negative (HP loss)

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Tax Year 2026-27
          </span>
          <span>·</span>
          <span>Income Tax Act 2025</span>
          <span>·</span>
          <span>Section 202</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Income Tax Regime Optimizer
        </h1>
        <p className="mt-2 text-muted-foreground">
          Compare your tax liability under the default and optional regimes. Results update as
          you type.
        </p>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For guidance only.</span> Tax calculations are
            estimates based on published IT Act 2025 rates. Verify with a CA before filing your
            return.
          </p>
        </div>
      </div>

      <OptimizerClient initialHra={initialHra} initialHpIncome={initialHpIncome} />
    </div>
  );
}
