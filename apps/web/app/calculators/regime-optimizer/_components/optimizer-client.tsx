"use client";

import { useState, useMemo } from "react";
import { CheckCircle2, TrendingDown, Info, Home } from "lucide-react";
import Link from "next/link";
import { getRuleForYear } from "@taxsaral/tax-rules";
import { computeTaxResult } from "@taxsaral/tax-engine";
import type { TaxResult } from "@taxsaral/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { PrefillBadge } from "@/components/prefill-badge";
import { cn } from "@/lib/utils";

// ── rule and derived limits (pulled from config — never hardcoded) ────────────
const rule = getRuleForYear("TY-2026-27");
const hpLossSetOffCap = rule.houseProperty.lossSetOffCapOptional;

const s123Max = rule.deductions["section123"] as number;
const s127Max = rule.deductions["section127"] as number;
const s130 = rule.deductions["section130"] as {
  self: number;
  parents: number;
  seniorParents: number;
};
const s71 = rule.deductions["section71"] as {
  selfOccupied: number;
  letOut: number | null;
};

// ── formatting helpers ────────────────────────────────────────────────────────
const inrFmt = new Intl.NumberFormat("en-IN");

function fmt(n: number): string {
  return `₹${inrFmt.format(Math.round(Math.abs(n)))}`;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

function parseIncome(raw: string): number {
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : Math.max(0, Math.floor(n));
}

// ── deduction breakeven ───────────────────────────────────────────────────────
function computeDeductionBreakeven(income: number): number | null {
  const defResult = computeTaxResult(income, rule.standardDeduction.default, "default", rule);
  if (defResult.totalTax === 0) return null;

  const MAX_D = 5_000_000;
  const optTaxAtMax = computeTaxResult(
    income,
    rule.standardDeduction.optional + MAX_D,
    "optional",
    rule
  ).totalTax;
  if (optTaxAtMax >= defResult.totalTax) return null;

  let lo = 0;
  let hi = MAX_D;
  for (let i = 0; i < 40; i++) {
    const mid = Math.floor((lo + hi) / 2);
    const optTax = computeTaxResult(
      income,
      rule.standardDeduction.optional + mid,
      "optional",
      rule
    ).totalTax;
    if (optTax > defResult.totalTax) lo = mid;
    else hi = mid;
  }
  return Math.round((lo + hi) / 2);
}

// ── sub-components ────────────────────────────────────────────────────────────

function SliderWithInput({
  label,
  sectionLabel,
  value,
  onChange,
  max,
  step = 1_000,
}: {
  label: string;
  sectionLabel: string;
  value: number;
  onChange: (v: number) => void;
  max: number;
  step?: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label className="leading-snug">{label}</Label>
        <span className="shrink-0 text-xs text-muted-foreground">{sectionLabel}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0] ?? 0)}
        min={0}
        max={max}
        step={step}
      />
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">₹</span>
        <Input
          type="number"
          value={value === 0 ? "" : value}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            onChange(clamp(isNaN(n) ? 0 : n, 0, max));
          }}
          min={0}
          max={max}
          className="h-8 w-28 text-sm"
          placeholder="0"
        />
        <span className="text-xs text-muted-foreground">/ {fmt(max)}</span>
      </div>
    </div>
  );
}

function CurrencyField({
  label,
  labelSuffix,
  value,
  onChange,
  max,
  hint,
}: {
  label: string;
  labelSuffix?: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  max?: number;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <Label>{label}</Label>
        {labelSuffix}
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          ₹
        </span>
        <Input
          type="number"
          value={value === 0 ? "" : value}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            const clamped = isNaN(n) ? 0 : Math.max(0, n);
            onChange(max !== undefined ? Math.min(clamped, max) : clamped);
          }}
          min={0}
          max={max}
          className="pl-7"
          placeholder="0"
        />
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function BreakdownRow({
  label,
  amount,
  isTotal,
  isSaving,
}: {
  label: string;
  amount: number;
  isTotal?: boolean;
  isSaving?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-2 py-0.5 text-sm",
        isTotal && "mt-1 border-t pt-2 font-semibold",
        isSaving && "text-emerald-700 dark:text-emerald-400"
      )}
    >
      <span
        className={cn(
          !isTotal && "text-muted-foreground",
          isSaving && "text-emerald-700 dark:text-emerald-400"
        )}
      >
        {label}
      </span>
      <span className="shrink-0 tabular-nums">
        {isSaving ? `−${fmt(amount)}` : fmt(amount)}
      </span>
    </div>
  );
}

function RegimeCard({
  result,
  isRecommended,
}: {
  result: TaxResult;
  isRecommended: boolean;
}) {
  const isDefault = result.regime === "default";
  const baseTax = Math.max(0, result.taxBeforeCess + result.rebateApplied - result.surcharge);
  const totalDeductions = result.grossIncome - result.taxableIncome;

  return (
    <Card
      className={cn(
        "relative transition-all",
        isRecommended ? "border-emerald-500 shadow-md" : "border-border"
      )}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="gap-1 bg-emerald-600 text-white hover:bg-emerald-600">
            <CheckCircle2 className="h-3 w-3" />
            Recommended
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3 pt-6">
        <CardTitle className="text-base">
          {isDefault ? "Default Regime" : "Optional Regime"}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {isDefault ? "Section 202 · Std. deduction ₹75,000" : "With itemised deductions"}
        </p>
      </CardHeader>

      <CardContent className="space-y-0 pb-5">
        <BreakdownRow label="Gross Income" amount={result.grossIncome} />
        <BreakdownRow label="Deductions" amount={totalDeductions} isSaving />
        <BreakdownRow label="Taxable Income" amount={result.taxableIncome} isTotal />

        <div className="my-3 border-t" />

        <BreakdownRow label="Base Tax" amount={baseTax} />
        {result.surcharge > 0 && (
          <BreakdownRow label="Surcharge" amount={result.surcharge} />
        )}
        {result.rebateApplied > 0 && (
          <BreakdownRow
            label={`Rebate (S. ${rule.rebate.section})`}
            amount={result.rebateApplied}
            isSaving
          />
        )}
        <BreakdownRow label="Cess (4%)" amount={result.cess} />
        <BreakdownRow label="Total Tax" amount={result.totalTax} isTotal />

        <div className="mt-4 rounded-md bg-muted px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground">Effective Rate</p>
          <p className="text-2xl font-bold tabular-nums">
            {result.effectiveRate.toFixed(2)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export function OptimizerClient({
  initialHra = 0,
  initialHpIncome = 0,
}: {
  initialHra?: number;
  initialHpIncome?: number;
}) {
  const [grossRaw, setGrossRaw] = useState("");
  const [s123, setS123] = useState(0);
  const [s130Self, setS130Self] = useState(0);
  const [s130Parents, setS130Parents] = useState(0);
  const [s127NPS, setS127NPS] = useState(0);
  const [s71HomeLoan, setS71HomeLoan] = useState(0);
  const [hraExemption, setHraExemption] = useState(initialHra);
  const [hraPrefilled, setHraPrefilled] = useState(initialHra > 0);
  const [hpAbsIncome, setHpAbsIncome] = useState(Math.abs(initialHpIncome));
  const [hpIsLoss, setHpIsLoss] = useState(initialHpIncome < 0);
  const [hpPrefilled, setHpPrefilled] = useState(initialHpIncome !== 0);
  const [other, setOther] = useState(0);

  const income = useMemo(() => parseIncome(grossRaw), [grossRaw]);

  // hpIncome: positive = additional income, negative = loss
  const hpIncome = hpIsLoss ? -hpAbsIncome : hpAbsIncome;

  const totalItemised = useMemo(
    () => s123 + s130Self + s130Parents + s127NPS + s71HomeLoan + hraExemption + other,
    [s123, s130Self, s130Parents, s127NPS, s71HomeLoan, hraExemption, other]
  );

  const comparison = useMemo(() => {
    if (income <= 0 && hpIncome === 0) return null;
    // HP income is regime-sensitive:
    //   Default regime: losses not deductible against other income
    //   Optional regime: loss set-off capped at ₹2L
    const hpDefault = Math.max(0, hpIncome);
    const hpOptional =
      hpIncome < 0 ? Math.max(hpIncome, -hpLossSetOffCap) : hpIncome;

    const defaultIncome = Math.max(0, income + hpDefault);
    const optionalIncome = Math.max(0, income + hpOptional);

    const defaultResult = computeTaxResult(
      defaultIncome,
      rule.standardDeduction.default,
      "default",
      rule
    );
    const optionalResult = computeTaxResult(
      optionalIncome,
      rule.standardDeduction.optional + totalItemised,
      "optional",
      rule
    );
    const saving = defaultResult.totalTax - optionalResult.totalTax;
    return {
      default: defaultResult,
      optional: optionalResult,
      saving,
      recommendation:
        defaultResult.totalTax <= optionalResult.totalTax
          ? ("default" as const)
          : ("optional" as const),
    };
  }, [income, hpIncome, s123, s130Self, s130Parents, s127NPS, s71HomeLoan, hraExemption, other, totalItemised]);

  // Breakeven only meaningful when no HP income adjustment
  const deductionBreakeven = useMemo(
    () => (income > 0 && hpIncome === 0 ? computeDeductionBreakeven(income) : null),
    [income, hpIncome]
  );

  const hasRebate = comparison !== null && comparison.default.rebateApplied > 0;
  const isFullRebate =
    comparison !== null && comparison.default.taxableIncome <= rule.rebate.limit;
  const savingsAmount = comparison !== null ? Math.abs(comparison.saving) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">

        {/* ── INPUT FORM ───────────────────────────────────────────────── */}
        <div className="space-y-6 lg:col-span-2">

          {/* Income card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Income</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="gross-salary">Gross Annual Salary (CTC)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    id="gross-salary"
                    type="text"
                    inputMode="numeric"
                    value={grossRaw}
                    onChange={(e) => setGrossRaw(e.target.value)}
                    className="pl-7"
                    placeholder="e.g. 1500000"
                    aria-label="Gross annual salary in rupees"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Standard deduction auto-applied: {fmt(rule.standardDeduction.default)} (default)
                  {" / "}
                  {fmt(rule.standardDeduction.optional)} (optional)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* House property income / loss */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-lg">House Property</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Income or loss from house property (Sections 20-25)
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Income / Loss toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHpIsLoss(false)}
                  className={cn(
                    "flex-1 rounded-md border px-3 py-1.5 text-sm transition-colors",
                    !hpIsLoss
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setHpIsLoss(true)}
                  className={cn(
                    "flex-1 rounded-md border px-3 py-1.5 text-sm transition-colors",
                    hpIsLoss
                      ? "border-primary bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  Loss
                </button>
              </div>

              <CurrencyField
                label={hpIsLoss ? "HP Loss (absolute amount)" : "HP Income"}
                labelSuffix={
                  hpPrefilled ? (
                    <PrefillBadge
                      source="House Property Calculator"
                      onDismiss={() => {
                        setHpAbsIncome(0);
                        setHpIsLoss(false);
                        setHpPrefilled(false);
                      }}
                    />
                  ) : undefined
                }
                value={hpAbsIncome}
                onChange={(v) => {
                  setHpAbsIncome(v);
                  if (hpPrefilled) setHpPrefilled(false);
                }}
                hint={
                  hpIsLoss
                    ? `Default regime: loss not set off. Optional regime: up to ${fmt(hpLossSetOffCap)} set off against other income.`
                    : "Net income from all let-out properties (after standard deduction and interest)"
                }
              />

              {hpAbsIncome === 0 && (
                <p className="text-xs text-muted-foreground border-t pt-3">
                  Have rental income or home loan on let-out property?{" "}
                  <Link
                    href="/calculators/house-property-income"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Calculate it here →
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Deductions card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Optional Regime Deductions</CardTitle>
              <p className="text-sm text-muted-foreground">
                These apply only under the optional (old) regime
              </p>
            </CardHeader>
            <CardContent className="space-y-6">

              <SliderWithInput
                label="Investments & Savings"
                sectionLabel="Section 123"
                value={s123}
                onChange={setS123}
                max={s123Max}
              />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Health Insurance Premium</Label>
                  <span className="text-xs text-muted-foreground">Section 130</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <CurrencyField
                    label="Self / Family"
                    value={s130Self}
                    onChange={setS130Self}
                    max={s130.self}
                    hint={`Max ${fmt(s130.self)}`}
                  />
                  <CurrencyField
                    label="Parents"
                    value={s130Parents}
                    onChange={setS130Parents}
                    max={s130.seniorParents}
                    hint={`${fmt(s130.parents)} / ${fmt(s130.seniorParents)} senior`}
                  />
                </div>
              </div>

              <SliderWithInput
                label="NPS Contribution"
                sectionLabel="Section 127"
                value={s127NPS}
                onChange={setS127NPS}
                max={s127Max}
              />

              <CurrencyField
                label="Home Loan Interest (Self-Occupied)"
                value={s71HomeLoan}
                onChange={setS71HomeLoan}
                max={s71.selfOccupied}
                hint={`Section 71 · Max ${fmt(s71.selfOccupied)}`}
              />

              {/* HRA exemption — can be pre-filled from HRA calculator */}
              <CurrencyField
                label="HRA Exemption"
                labelSuffix={
                  hraPrefilled ? (
                    <PrefillBadge
                      source="HRA Calculator"
                      onDismiss={() => {
                        setHraExemption(0);
                        setHraPrefilled(false);
                      }}
                    />
                  ) : undefined
                }
                value={hraExemption}
                onChange={(v) => {
                  setHraExemption(v);
                  if (hraPrefilled) setHraPrefilled(false);
                }}
                hint={
                  hraPrefilled
                    ? undefined
                    : "Not sure? Calculate it below ↓"
                }
              />

              <CurrencyField
                label="Other Deductions"
                value={other}
                onChange={setOther}
                hint="Education loan interest (S.133), savings interest (S.149), etc."
              />

              {totalItemised > 0 && (
                <div className="rounded-md bg-muted px-3 py-2 text-sm">
                  <span className="text-muted-foreground">Total itemised deductions: </span>
                  <span className="font-semibold tabular-nums">{fmt(totalItemised)}</span>
                </div>
              )}

              {/* HRA discovery link */}
              <p className="text-xs text-muted-foreground border-t pt-4">
                Not sure about your HRA exemption?{" "}
                <Link
                  href="/calculators/hra"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Calculate it here →
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ── COMPARISON OUTPUT ─────────────────────────────────────────── */}
        <div className="space-y-4 lg:col-span-3">
          {comparison === null ? (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-center">
              <div className="space-y-1 text-muted-foreground">
                <p className="text-lg font-medium">Enter your salary above</p>
                <p className="text-sm">Comparison updates in real-time as you type</p>
              </div>
            </div>
          ) : (
            <>
              {/* Section 156 rebate callout */}
              {hasRebate && (
                <div
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-4",
                    isFullRebate
                      ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950"
                      : "border-sky-300 bg-sky-50 dark:border-sky-700 dark:bg-sky-950"
                  )}
                >
                  <CheckCircle2
                    className={cn(
                      "mt-0.5 h-5 w-5 shrink-0",
                      isFullRebate ? "text-emerald-600" : "text-sky-600"
                    )}
                  />
                  <div className="space-y-0.5">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        isFullRebate
                          ? "text-emerald-800 dark:text-emerald-200"
                          : "text-sky-800 dark:text-sky-200"
                      )}
                    >
                      {isFullRebate
                        ? `Section ${rule.rebate.section} Rebate · Full tax waiver`
                        : `Section ${rule.rebate.section} · Marginal relief applied`}
                    </p>
                    <p
                      className={cn(
                        "text-sm",
                        isFullRebate
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-sky-700 dark:text-sky-300"
                      )}
                    >
                      {isFullRebate
                        ? `Taxable income ${fmt(comparison.default.taxableIncome)} ≤ ${fmt(rule.rebate.limit)} — zero tax under the default regime.`
                        : `Taxable income slightly exceeds ${fmt(rule.rebate.limit)}. Partial rebate of ${fmt(comparison.default.rebateApplied)} applied.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Savings banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="text-sm font-medium">
                    {savingsAmount === 0
                      ? "Both regimes give equal tax"
                      : `${comparison.recommendation === "default" ? "Default" : "Optional"} regime saves you`}
                  </span>
                  {savingsAmount > 0 && (
                    <span className="text-xl font-bold text-emerald-600 tabular-nums">
                      {fmt(savingsAmount)}
                    </span>
                  )}
                </div>
                {savingsAmount > 0 && (
                  <Badge
                    variant="outline"
                    className="border-emerald-500 text-emerald-700 dark:text-emerald-400"
                  >
                    {comparison.recommendation === "default" ? "Default ✓" : "Optional ✓"}
                  </Badge>
                )}
              </div>

              {/* Regime cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <RegimeCard
                  result={comparison.default}
                  isRecommended={comparison.recommendation === "default"}
                />
                <RegimeCard
                  result={comparison.optional}
                  isRecommended={comparison.recommendation === "optional"}
                />
              </div>

              {/* Deduction breakeven */}
              <div className="flex items-start gap-2 rounded-lg border bg-muted/40 px-4 py-3 text-sm">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Deduction breakeven: </span>
                  {deductionBreakeven === null ? (
                    <>
                      The default regime is more tax-efficient for your income regardless of
                      deductions.
                    </>
                  ) : (
                    <>
                      You need{" "}
                      <span className="font-semibold text-foreground">
                        {fmt(deductionBreakeven)}
                      </span>{" "}
                      in total optional-regime deductions to make the optional regime beneficial.
                      {totalItemised > 0 &&
                        (totalItemised >= deductionBreakeven ? (
                          <span className="ml-1 font-medium text-emerald-700 dark:text-emerald-400">
                            Your current deductions ({fmt(totalItemised)}) qualify.
                          </span>
                        ) : (
                          <span className="ml-1">
                            You currently claim {fmt(totalItemised)} (
                            {fmt(deductionBreakeven - totalItemised)} short).
                          </span>
                        ))}
                    </>
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
