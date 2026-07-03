"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { getRuleForYear } from "@taxsaral/tax-rules";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calcUrl } from "@/lib/cross-link";
import { cn } from "@/lib/utils";

const rule = getRuleForYear("TY-2026-27");
const inrFmt = new Intl.NumberFormat("en-IN");
const fmt = (n: number) => `₹${inrFmt.format(Math.round(Math.abs(n)))}`;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

function parseNum(raw: string): number {
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : Math.max(0, n);
}

function CurrencyInput({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          ₹
        </span>
        <Input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-7"
          placeholder="0"
        />
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ResultRow({
  label,
  amount,
  isMin,
  isTotal,
}: {
  label: string;
  amount: number;
  isMin?: boolean;
  isTotal?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-2 py-1.5 text-sm",
        isTotal && "mt-1 border-t pt-2.5 font-semibold text-base",
        isMin && "text-amber-700 dark:text-amber-400"
      )}
    >
      <span className={cn(!isTotal && "text-muted-foreground", isMin && "text-amber-700 dark:text-amber-400")}>
        {label}
      </span>
      <span className="tabular-nums">{fmt(amount)}</span>
    </div>
  );
}

export function HraClient() {
  const [basicRaw, setBasicRaw] = useState("");
  const [hraRaw, setHraRaw] = useState("");
  const [rentRaw, setRentRaw] = useState("");
  const [isMetro, setIsMetro] = useState(true);

  const basic = useMemo(() => parseNum(basicRaw), [basicRaw]);
  const hraReceived = useMemo(() => parseNum(hraRaw), [hraRaw]);
  const rentPaid = useMemo(() => parseNum(rentRaw), [rentRaw]);

  const result = useMemo(() => {
    if (basic === 0 || hraReceived === 0) return null;

    const rate = isMetro ? rule.hra.metroRate : rule.hra.nonMetroRate;
    const metroComponent = basic * rate;
    const rentComponent = Math.max(0, rentPaid - 0.10 * basic);
    const exemption = Math.min(hraReceived, metroComponent, rentComponent);
    const taxableHra = Math.max(0, hraReceived - exemption);

    // Which component is the binding constraint?
    const minVal = Math.min(hraReceived, metroComponent, rentComponent);

    return { exemption, taxableHra, metroComponent, rentComponent, minVal };
  }, [basic, hraReceived, rentPaid, isMetro]);

  const optimizerLink = result && result.exemption > 0
    ? calcUrl("regime-optimizer", { hra: result.exemption })
    : "/calculators/regime-optimizer";

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Salary & Rent Details</CardTitle>
          <p className="text-sm text-muted-foreground">Enter annual amounts (monthly × 12)</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <CurrencyInput
            id="basic"
            label="Annual Basic Salary"
            hint="HRA exemption is calculated as a percentage of your basic salary"
            value={basicRaw}
            onChange={setBasicRaw}
          />
          <CurrencyInput
            id="hra"
            label="Annual HRA Received from Employer"
            value={hraRaw}
            onChange={setHraRaw}
          />
          <CurrencyInput
            id="rent"
            label="Annual Rent Actually Paid"
            hint="Must be paying rent to claim HRA exemption"
            value={rentRaw}
            onChange={setRentRaw}
          />

          <div className="space-y-1.5">
            <Label>City Type</Label>
            <div className="flex rounded-lg border p-0.5">
              {[
                { label: `Metro (${rule.hra.metroRate * 100}% of basic)`, value: true },
                { label: `Non-Metro (${rule.hra.nonMetroRate * 100}% of basic)`, value: false },
              ].map(({ label, value }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setIsMetro(value)}
                  className={cn(
                    "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isMetro === value
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Metro cities: {rule.hraMetroCities.join(", ")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result === null ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-center text-muted-foreground">
          <p>Enter your basic salary and HRA to see the exemption</p>
        </div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">HRA Exemption Breakdown</CardTitle>
              <p className="text-xs text-muted-foreground">
                Exemption = minimum of the three components below ({rule.sections["hra"]})
              </p>
            </CardHeader>
            <CardContent className="space-y-0">
              <ResultRow
                label="① HRA received from employer"
                amount={hraReceived}
                isMin={hraReceived === result.minVal}
              />
              <ResultRow
                label={`② ${isMetro ? rule.hra.metroRate * 100 : rule.hra.nonMetroRate * 100}% of annual basic salary`}
                amount={result.metroComponent}
                isMin={result.metroComponent === result.minVal}
              />
              <ResultRow
                label="③ Rent paid − 10% of basic salary"
                amount={result.rentComponent}
                isMin={result.rentComponent === result.minVal}
              />

              <div className="my-3 border-t" />

              <ResultRow label="HRA Exemption (minimum of ①②③)" amount={result.exemption} isTotal />
              <div className="mt-2 flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm">
                <span className="text-muted-foreground">Taxable HRA</span>
                <span className="font-semibold tabular-nums text-destructive">
                  {fmt(result.taxableHra)}
                </span>
              </div>

              {result.rentComponent === 0 && (
                <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
                  ⚠ Rent paid is less than 10% of basic salary — no HRA exemption is available.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Cross-link to Regime Optimizer */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Home className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">See your full regime comparison</p>
                  <p className="text-sm text-muted-foreground">
                    Your HRA exemption of {fmt(result.exemption)} will be pre-filled as an
                    optional-regime deduction in the Regime Optimizer.
                  </p>
                </div>
              </div>
              <Link
                href={optimizerLink}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Open Regime Optimizer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          {/* Discovery link */}
          <p className="text-center text-sm text-muted-foreground">
            Want to check the full tax picture?{" "}
            <Link href="/calculators/regime-optimizer" className="text-primary underline-offset-4 hover:underline">
              Go to Regime Optimizer →
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
