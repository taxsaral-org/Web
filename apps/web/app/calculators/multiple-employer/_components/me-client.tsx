"use client";

import { useState, useMemo } from "react";
import { Plus, Trash2, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getRuleForYear } from "@taxsaral/tax-rules";
import { computeTaxResult } from "@taxsaral/tax-engine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calcUrl } from "@/lib/cross-link";
import { cn } from "@/lib/utils";

const rule = getRuleForYear("TY-2026-27");
const inrFmt = new Intl.NumberFormat("en-IN");
const fmt = (n: number) => `₹${inrFmt.format(Math.round(Math.abs(n)))}`;

interface Employer {
  id: string;
  name: string;
  salary: number;
  tds: number;
}

let _nextId = 1;
function newEmployer(): Employer {
  return { id: String(_nextId++), name: "", salary: 0, tds: 0 };
}

function parseNum(raw: string | number): number {
  if (typeof raw === "number") return raw;
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : Math.max(0, n);
}

function EmployerRow({
  employer,
  index,
  canRemove,
  onChange,
  onRemove,
}: {
  employer: Employer;
  index: number;
  canRemove: boolean;
  onChange: (updated: Employer) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Employer {index + 1}</span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            aria-label="Remove employer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Employer / Company Name</Label>
        <Input
          type="text"
          value={employer.name}
          onChange={(e) => onChange({ ...employer, name: e.target.value })}
          placeholder="e.g. ABC Technologies"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Salary Received (annual)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              type="text"
              inputMode="numeric"
              value={employer.salary || ""}
              onChange={(e) =>
                onChange({ ...employer, salary: parseNum(e.target.value) })
              }
              className="pl-7"
              placeholder="0"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>TDS Deducted (annual)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              type="text"
              inputMode="numeric"
              value={employer.tds || ""}
              onChange={(e) =>
                onChange({ ...employer, tds: parseNum(e.target.value) })
              }
              className="pl-7"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MultipleEmployerClient() {
  const [employers, setEmployers] = useState<Employer[]>([newEmployer(), newEmployer()]);

  function updateEmployer(id: string, updated: Employer) {
    setEmployers((prev) => prev.map((e) => (e.id === id ? updated : e)));
  }

  function removeEmployer(id: string) {
    setEmployers((prev) => prev.filter((e) => e.id !== id));
  }

  function addEmployer() {
    setEmployers((prev) => [...prev, newEmployer()]);
  }

  const result = useMemo(() => {
    const totalSalary = employers.reduce((s, e) => s + e.salary, 0);
    const totalTds = employers.reduce((s, e) => s + e.tds, 0);
    if (totalSalary === 0) return null;

    const taxResult = computeTaxResult(
      totalSalary,
      rule.standardDeduction.default,
      "default",
      rule
    );
    const netPayable = Math.max(0, taxResult.totalTax - totalTds);
    const refund = Math.max(0, totalTds - taxResult.totalTax);
    const needsAdvanceTax = netPayable > rule.advanceTax.threshold;

    return { totalSalary, totalTds, taxResult, netPayable, refund, needsAdvanceTax };
  }, [employers]);

  const advanceTaxLink = result
    ? calcUrl("advance-tax", { income: result.totalSalary, tds: result.totalTds })
    : "/calculators/advance-tax";

  return (
    <div className="space-y-6">
      {/* Discovery link */}
      <p className="text-sm text-muted-foreground">
        Not sure about the correct regime?{" "}
        <Link
          href="/calculators/regime-optimizer"
          className="text-primary underline-offset-4 hover:underline"
        >
          Use the Regime Optimizer →
        </Link>
      </p>

      {/* Employer rows */}
      <div className="space-y-4">
        {employers.map((emp, i) => (
          <EmployerRow
            key={emp.id}
            employer={emp}
            index={i}
            canRemove={employers.length > 1}
            onChange={(updated) => updateEmployer(emp.id, updated)}
            onRemove={() => removeEmployer(emp.id)}
          />
        ))}

        <button
          type="button"
          onClick={addEmployer}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed py-3 text-sm text-muted-foreground hover:border-primary/50 hover:text-primary"
        >
          <Plus className="h-4 w-4" />
          Add another employer
        </button>
      </div>

      {/* Results */}
      {result === null ? (
        <div className="flex h-36 items-center justify-center rounded-lg border border-dashed text-center text-muted-foreground">
          <p>Enter salary details above to see your tax position</p>
        </div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aggregated Tax Summary</CardTitle>
              <p className="text-xs text-muted-foreground">
                Default regime · Standard deduction {fmt(rule.standardDeduction.default)} applied
              </p>
            </CardHeader>
            <CardContent className="space-y-0">
              {[
                { label: "Total Salary (all employers)", amount: result.totalSalary },
                { label: `Standard Deduction (S. ${rule.sections["newRegime"]})`, amount: rule.standardDeduction.default, isNeg: true },
                { label: "Taxable Income", amount: result.taxResult.taxableIncome, isBold: true },
              ].map(({ label, amount, isNeg, isBold }) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-baseline justify-between gap-2 py-1.5 text-sm",
                    isBold && "mt-1 border-t pt-2.5 font-semibold"
                  )}
                >
                  <span className={cn(!isBold && "text-muted-foreground")}>{label}</span>
                  <span className={cn("tabular-nums", isNeg && "text-emerald-700 dark:text-emerald-400")}>
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
                { label: "Total Tax Liability", amount: result.taxResult.totalTax, isBold: true },
                { label: "TDS Deducted (all employers)", amount: result.totalTds, isNeg: true },
              ].map(({ label, amount, isNeg, isBold }) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-baseline justify-between gap-2 py-1.5 text-sm",
                    isBold && "mt-1 border-t pt-2.5 font-semibold"
                  )}
                >
                  <span className={cn(!isBold && "text-muted-foreground")}>{label}</span>
                  <span className={cn("tabular-nums", isNeg && "text-emerald-700 dark:text-emerald-400")}>
                    {isNeg ? `−${fmt(amount)}` : fmt(amount)}
                  </span>
                </div>
              ))}

              <div className="mt-3 rounded-md px-3 py-3 text-center">
                {result.refund > 0 ? (
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">Expected Refund</p>
                    <p className="text-2xl font-bold text-emerald-600 tabular-nums">
                      {fmt(result.refund)}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <p className="text-xs text-muted-foreground">Net Tax Payable</p>
                    <p
                      className={cn(
                        "text-2xl font-bold tabular-nums",
                        result.netPayable > 0 ? "text-destructive" : "text-foreground"
                      )}
                    >
                      {fmt(result.netPayable)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Advance tax callout */}
          {result.needsAdvanceTax && (
            <Card className="border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950">
              <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">
                      You may owe advance tax on this amount
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Net payable {fmt(result.netPayable)} exceeds {fmt(rule.advanceTax.threshold)}{" "}
                      — advance tax instalments apply (Section {rule.sections["advanceTax"]}).
                    </p>
                  </div>
                </div>
                <Link
                  href={advanceTaxLink}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
                >
                  Calculate Quarterly Schedule
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
