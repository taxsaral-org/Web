"use client";

import { useState, useMemo } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getRuleForYear } from "@taxsaral/tax-rules";
import { computeTaxResult } from "@taxsaral/tax-engine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrefillBadge } from "@/components/prefill-badge";
import { cn } from "@/lib/utils";

const rule = getRuleForYear("TY-2026-27");
const inrFmt = new Intl.NumberFormat("en-IN");
const fmt = (n: number) => `₹${inrFmt.format(Math.round(Math.abs(n)))}`;

interface Props {
  initialIncome?: number;
  initialTds?: number;
  prefillSource?: string;
}

export function AdvanceTaxClient({
  initialIncome = 0,
  initialTds = 0,
  prefillSource,
}: Props) {
  const [income, setIncome] = useState(initialIncome);
  const [tds, setTds] = useState(initialTds);
  const [prefilled, setPrefilled] = useState(initialIncome > 0 || initialTds > 0);

  const result = useMemo(() => {
    if (income <= 0) return null;

    const taxResult = computeTaxResult(
      income,
      rule.standardDeduction.default,
      "default",
      rule
    );
    const netLiability = Math.max(0, taxResult.totalTax - tds);
    const needsAdvanceTax = netLiability > rule.advanceTax.threshold;

    if (!needsAdvanceTax) {
      return { taxResult, netLiability, needsAdvanceTax, installments: [] };
    }

    const installments = rule.advanceTax.installments.map((inst, i) => {
      const prevCumulative =
        i > 0 ? (rule.advanceTax.installments[i - 1]?.cumulative ?? 0) : 0;
      const thisCumulative = Math.ceil(netLiability * inst.cumulative);
      const prevAmount = Math.ceil(netLiability * prevCumulative);
      return {
        ...inst,
        dueAmount: thisCumulative - prevAmount,
        cumulativeAmount: thisCumulative,
      };
    });

    return { taxResult, netLiability, needsAdvanceTax, installments };
  }, [income, tds]);

  function handleDismissPrefill() {
    setPrefilled(false);
  }

  return (
    <div className="space-y-6">
      {/* Discovery link */}
      <p className="text-sm text-muted-foreground">
        Switched jobs this year?{" "}
        <Link
          href="/calculators/multiple-employer"
          className="text-primary underline-offset-4 hover:underline"
        >
          Use the Multiple Employer calculator to get an accurate income figure →
        </Link>
      </p>

      {/* Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estimated Income & TDS</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your expected annual income and TDS for TY 2026-27
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Income field */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Label htmlFor="at-income">Estimated Annual Income (Salary)</Label>
              {prefilled && prefillSource && (
                <PrefillBadge source={prefillSource} onDismiss={handleDismissPrefill} />
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ₹
              </span>
              <Input
                id="at-income"
                type="number"
                min={0}
                value={income || ""}
                onChange={(e) => {
                  setIncome(Math.max(0, Number(e.target.value) || 0));
                  if (prefilled) setPrefilled(false);
                }}
                className="pl-7"
                placeholder="e.g. 1500000"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Standard deduction of {fmt(rule.standardDeduction.default)} will be applied
            </p>
          </div>

          {/* TDS field */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Label htmlFor="at-tds">Expected TDS for the Year</Label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ₹
              </span>
              <Input
                id="at-tds"
                type="number"
                min={0}
                value={tds || ""}
                onChange={(e) => {
                  setTds(Math.max(0, Number(e.target.value) || 0));
                  if (prefilled) setPrefilled(false);
                }}
                className="pl-7"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Include TDS already deducted plus TDS yet to be deducted by your employer
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result === null ? (
        <div className="flex h-36 items-center justify-center rounded-lg border border-dashed text-center text-muted-foreground">
          <p>Enter your estimated income to see the advance tax schedule</p>
        </div>
      ) : (
        <>
          {/* Tax summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tax Liability Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {[
                { label: "Estimated Gross Income", amount: income },
                {
                  label: `Standard Deduction (S. ${rule.sections["newRegime"]})`,
                  amount: rule.standardDeduction.default,
                  isNeg: true,
                },
                {
                  label: "Taxable Income",
                  amount: result.taxResult.taxableIncome,
                  isBold: true,
                },
              ].map(({ label, amount, isNeg, isBold }) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-baseline justify-between gap-2 py-1.5 text-sm",
                    isBold && "mt-1 border-t pt-2.5 font-semibold"
                  )}
                >
                  <span className={cn(!isBold && "text-muted-foreground")}>{label}</span>
                  <span
                    className={cn(
                      "tabular-nums",
                      isNeg && "text-emerald-700 dark:text-emerald-400"
                    )}
                  >
                    {isNeg ? `−${fmt(amount)}` : fmt(amount)}
                  </span>
                </div>
              ))}

              <div className="my-3 border-t" />

              {[
                { label: "Income Tax", amount: result.taxResult.taxBeforeCess },
                ...(result.taxResult.surcharge > 0
                  ? [{ label: "Surcharge", amount: result.taxResult.surcharge }]
                  : []),
                { label: "Cess (4%)", amount: result.taxResult.cess },
                {
                  label: "Total Tax Liability",
                  amount: result.taxResult.totalTax,
                  isBold: true,
                },
                { label: "Less: TDS", amount: tds, isNeg: true },
                {
                  label: "Net Advance Tax Liability",
                  amount: result.netLiability,
                  isBold: true,
                },
              ].map(({ label, amount, isNeg, isBold }) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-baseline justify-between gap-2 py-1.5 text-sm",
                    isBold && "mt-1 border-t pt-2.5 font-semibold"
                  )}
                >
                  <span className={cn(!isBold && "text-muted-foreground")}>{label}</span>
                  <span
                    className={cn(
                      "tabular-nums",
                      isNeg && "text-emerald-700 dark:text-emerald-400"
                    )}
                  >
                    {isNeg ? `−${fmt(amount)}` : fmt(amount)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* No advance tax needed */}
          {!result.needsAdvanceTax && (
            <div className="flex items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-medium text-emerald-800 dark:text-emerald-200">
                  No advance tax required
                </p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Net liability {fmt(result.netLiability)} is within the{" "}
                  {fmt(rule.advanceTax.threshold)} threshold (Section{" "}
                  {rule.sections["advanceTax"]}).
                </p>
              </div>
            </div>
          )}

          {/* Quarterly schedule */}
          {result.needsAdvanceTax && result.installments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quarterly Instalment Schedule</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Section {rule.sections["advanceTax"]} — each instalment is the incremental
                  amount due by that date
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {result.installments.map((inst) => (
                    <div
                      key={inst.label}
                      className="flex items-center justify-between px-6 py-4"
                    >
                      <div>
                        <p className="font-medium">{inst.label}</p>
                        <p className="text-sm text-muted-foreground">Due by {inst.dueDate}</p>
                        <p className="text-xs text-muted-foreground">
                          Cumulative: {fmt(inst.cumulativeAmount)} (
                          {Math.round(inst.cumulative * 100)}% of liability)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold tabular-nums">
                          {fmt(inst.dueAmount)}
                        </p>
                        <p className="text-xs text-muted-foreground">pay by this date</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cross-link back */}
          <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Compare tax regimes: </span>
            <Link
              href="/calculators/regime-optimizer"
              className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
            >
              Open Regime Optimizer <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
