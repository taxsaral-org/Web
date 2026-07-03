"use client";

import { useState, useMemo, useCallback } from "react";
import { Plus, Trash2, ArrowRight, Globe, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getRuleForYear } from "@taxsaral/tax-rules";
import {
  computeHousePropertyIncome,
  type HpPropertyInput,
  type HpArrearsInput,
  type HpPropertyType,
  type HpPropertyResult,
  type HpSummary,
} from "@taxsaral/tax-engine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calcUrl } from "@/lib/cross-link";
import { cn } from "@/lib/utils";

const rule = getRuleForYear("TY-2026-27");
const hp = rule.houseProperty;
const TY_END = new Date("2027-03-31");

const inrFmt = new Intl.NumberFormat("en-IN");
const fmt = (n: number) => `₹${inrFmt.format(Math.round(Math.abs(n)))}`;

const PROPERTY_TYPE_LABELS: Record<HpPropertyType, string> = {
  "self-occupied": "Type A — Self-Occupied",
  "let-out-full": "Type B — Let-Out (Full Year)",
  "let-out-partial-vacant": "Type C — Let-Out then Vacant [Sec. 21(2)]",
  "partly-let-self-occ": "Type D — Partly Let, Partly Self-Occupied (Different Units)",
  "partly-let-vacant": "Type E — Partly Let, Partly Vacant (Different Periods) [Sec. 21(2)]",
  "deemed-let-out": "Type F — Deemed Let-Out (3rd+ Property)",
  "builder-inventory": "Type G — Builder / Developer Inventory [Sec. 21(5)]",
  "business-use": "Type H — Used for Own Business / Profession",
};

const TYPE_BADGE: Record<HpPropertyType, string> = {
  "self-occupied": "bg-sky-100 text-sky-700",
  "let-out-full": "bg-emerald-100 text-emerald-700",
  "let-out-partial-vacant": "bg-teal-100 text-teal-700",
  "partly-let-self-occ": "bg-cyan-100 text-cyan-700",
  "partly-let-vacant": "bg-teal-100 text-teal-700",
  "deemed-let-out": "bg-amber-100 text-amber-700",
  "builder-inventory": "bg-violet-100 text-violet-700",
  "business-use": "bg-slate-100 text-slate-500",
};

// ── State types ───────────────────────────────────────────────────────────────

interface PropertyForm extends HpPropertyInput {
  _open: boolean;
}

type ArrearsForm = HpArrearsInput;

function makeNewProperty(): PropertyForm {
  return {
    id: Math.random().toString(36).slice(2),
    label: "",
    type: "self-occupied",
    isForeign: false,
    municipalValue: 0,
    fairMarketRent: 0,
    hasStandardRent: false,
    standardRent: 0,
    actualRentReceived: 0,
    unrealisedRent: 0,
    municipalTaxesPaid: 0,
    monthsLetOut: 6,
    vacancyReason: "searching-tenant",
    totalUnits: 2,
    selfOccupiedUnits: 1,
    homeLoanInterest: 0,
    isCoOwned: false,
    ownershipSharePct: 50,
    isDeedDocumented: true,
    isDeemedOwnership: false,
    isLiveApartTransfer: false,
    isMinorMarriedDaughter: false,
    builderCompletionDate: "",
    _open: true,
  };
}

function makeNewArrear(): ArrearsForm {
  return {
    id: Math.random().toString(36).slice(2),
    propertyReference: "",
    stillOwner: true,
    amountReceived: 0,
  };
}

function builderWithinWindow(dateStr: string): boolean {
  if (!dateStr) return true;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return true;
  const end = new Date(d);
  end.setFullYear(end.getFullYear() + hp.builderInventoryWindowYears);
  return TY_END <= end;
}

// ── Shared UI primitives ──────────────────────────────────────────────────────

function MoneyInput({
  id, label, value, onChange, hint,
}: { id: string; label: string; value: number; onChange: (v: number) => void; hint?: string }) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
        <Input
          id={id}
          type="number"
          min={0}
          value={value || ""}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="pl-7"
          placeholder="0"
        />
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function SwitchRow({
  id, label, description, value, onChange,
}: { id: string; label: string; description?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <Label htmlFor={id} className="cursor-pointer font-normal">{label}</Label>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={cn(
          "relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
          value ? "bg-primary" : "bg-muted"
        )}
      >
        <span className={cn("inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform", value ? "translate-x-4" : "translate-x-1")} />
      </button>
    </div>
  );
}

function ResultRow({
  label, amount, isDeduction, isBold, isTotal,
}: { label: string; amount: number; isDeduction?: boolean; isBold?: boolean; isTotal?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-2 py-1 text-sm", isTotal && "mt-1 border-t pt-2 font-semibold", isBold && "font-medium")}>
      <span className={cn(!isBold && !isTotal && "text-muted-foreground")}>{label}</span>
      <span className={cn("shrink-0 tabular-nums", isDeduction && "text-emerald-700 dark:text-emerald-400", amount < 0 && !isDeduction && "text-red-600 dark:text-red-400")}>
        {isDeduction ? `−${fmt(amount)}` : amount < 0 ? `(${fmt(amount)})` : fmt(amount)}
      </span>
    </div>
  );
}

function Hr({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="flex-1 border-t" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex-1 border-t" />
    </div>
  );
}

// ── Per-property computation breakdown ───────────────────────────────────────

function PropertyComputation({ r }: { r: HpPropertyResult }) {
  if (r.excluded) {
    return (
      <div className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>{r.excludedReason}</span>
      </div>
    );
  }

  // Type D: two-portion display
  if (r.isPartlyLetSelfOcc) {
    const letPct = Math.round(r.letOutFraction * 100);
    const soPct = Math.round(r.soFraction * 100);
    const letGAV = Math.max(r.expectedRent, r.adjustedActualRent);
    const letInterest = r.homeLoanInterestFull * r.letOutFraction;
    const soInterest = r.soInterestComponent; // 0 if forced deemed let-out
    return (
      <div className="space-y-1 text-sm">
        <p className="text-xs text-muted-foreground mb-2">{r.sectionLabel}</p>
        <Hr label={`Let-out portion (${letPct}% of property)`} />
        {r.municipalValue > 0 && <ResultRow label={`Municipal value (${letPct}% of ${fmt(r.municipalValue)})`} amount={r.municipalValue * r.letOutFraction} />}
        {r.fairMarketRent > 0 && <ResultRow label={`Fair market rent (${letPct}% of ${fmt(r.fairMarketRent)})`} amount={r.fairMarketRent * r.letOutFraction} />}
        <ResultRow label="Expected rent (higher)" amount={r.expectedRent} isBold />
        {r.standardRentCapped && <p className="text-xs text-amber-700 py-0.5">Capped at standard rent {fmt(r.standardRent * r.letOutFraction)}</p>}
        <ResultRow label="Actual rent received (let-out units)" amount={r.actualRentReceived} />
        {r.unrealisedRent > 0 && <ResultRow label="Less: unrealised rent" amount={r.unrealisedRent} isDeduction />}
        {r.unrealisedRent > 0 && <ResultRow label="Adjusted actual rent" amount={r.adjustedActualRent} isBold />}
        <ResultRow label={`GAV (${r.adjustedActualRent > r.expectedRent ? "actual" : "expected"} rent higher)`} amount={letGAV} isBold />
        {r.municipalTaxesDeducted > 0 && <ResultRow label={`Less: municipal taxes (${letPct}%)`} amount={r.municipalTaxesDeducted} isDeduction />}
        <ResultRow label="Net Annual Value" amount={r.netAnnualValue} isBold />
        {r.standardDeduction > 0 && <ResultRow label={`Less: 30% standard deduction (Sec. ${rule.sections["hpDeductions"]})`} amount={r.standardDeduction} isDeduction />}
        {letInterest > 0 && <ResultRow label={`Less: home loan interest (${letPct}%)`} amount={letInterest} isDeduction />}
        <ResultRow label="Let-out income" amount={r.rawIncomeDefault} isTotal />

        <Hr label={`Self-occupied portion (${soPct}% of property)${r.soPortionForcedDeemedLetOut ? " — forced deemed let-out" : ""}`} />
        {r.soPortionForcedDeemedLetOut ? (
          <p className="text-xs text-amber-700 py-1">SO portion treated as deemed let-out (2-property SO limit exceeded). Income included above.</p>
        ) : (
          <>
            <div className="flex justify-between py-1"><span className="text-muted-foreground">Annual value</span><span className="font-semibold">Nil</span></div>
            {soInterest > 0 && <ResultRow label="Less: home loan interest (optional regime only)" amount={soInterest} isDeduction />}
          </>
        )}

        <Hr label="Combined income" />
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Default</p>
            <ResultRow label="Income / (Loss)" amount={r.rawIncomeDefault} isTotal />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Optional</p>
            <ResultRow label="Income / (Loss)" amount={r.rawIncomeOptional} isTotal />
          </div>
        </div>
        {r.coOwnershipShare < 1 && !r.isDeemedOwnershipActive && (
          <p className="text-xs text-muted-foreground mt-1">Your {Math.round(r.coOwnershipShare * 100)}% share applied in the summary below.</p>
        )}
      </div>
    );
  }

  // Self-occupied: nil AV
  if (r.isSelfOccupied) {
    return (
      <div className="space-y-1 text-sm">
        <p className="text-xs text-muted-foreground mb-2">{r.sectionLabel}</p>
        <div className="flex justify-between py-1"><span className="text-muted-foreground">Annual value</span><span className="font-semibold">Nil</span></div>
        {r.homeLoanInterestFull > 0 && (
          <>
            <ResultRow label="Less: home loan interest (optional regime only)" amount={r.homeLoanInterestFull} isDeduction />
            <p className="text-xs text-muted-foreground">Aggregate {fmt(hp.selfOccupiedInterestCapOptional)} cap across all SO properties — applied in summary.</p>
          </>
        )}
      </div>
    );
  }

  // Builder inventory within window: nil AV
  if (r.effectiveType === "builder-inventory" && r.grossAnnualValue === 0) {
    return (
      <div className="space-y-1 text-sm">
        <p className="text-xs text-muted-foreground mb-2">{r.sectionLabel}</p>
        <div className="flex justify-between py-1"><span className="text-muted-foreground">Annual value</span><span className="font-semibold">Nil</span></div>
        {r.homeLoanInterestFull > 0 && (
          <ResultRow label="Less: home loan interest (both regimes)" amount={r.homeLoanInterestFull} isDeduction />
        )}
        {r.homeLoanInterestFull > 0 && (
          <ResultRow label="Income / (Loss)" amount={r.yourShareRawDefault} isTotal />
        )}
      </div>
    );
  }

  // Standard: let-out, deemed let-out, Type C, Type E
  const showActual = ["let-out-full", "let-out-partial-vacant", "partly-let-vacant"].includes(r.effectiveType);
  return (
    <div className="space-y-1 text-sm">
      <p className="text-xs text-muted-foreground mb-2">{r.sectionLabel}</p>
      {r.vacancyReliefApplied && (
        <div className="mb-2 rounded-md bg-teal-50 border border-teal-200 px-3 py-1.5 text-xs text-teal-800">
          Vacancy relief (Section 21(2)): actual rent used as annual value — deeming fiction overridden.
        </div>
      )}
      {r.municipalValue > 0 && <ResultRow label="Municipal value" amount={r.municipalValue} />}
      {r.fairMarketRent > 0 && <ResultRow label="Fair market rent" amount={r.fairMarketRent} />}
      {(r.municipalValue > 0 || r.fairMarketRent > 0) && (
        <ResultRow label={`Expected rent (higher${r.standardRentCapped ? ", capped" : ""})`} amount={r.expectedRent} isBold />
      )}
      {r.standardRentCapped && (
        <p className="text-xs text-amber-700 py-0.5">
          Standard rent {fmt(r.standardRent)} caps expected rent — property governed by Rent Control Act.
        </p>
      )}
      {showActual && (
        <>
          <ResultRow label="Actual rent received" amount={r.actualRentReceived} />
          {r.unrealisedRent > 0 && <ResultRow label="Less: unrealised rent" amount={r.unrealisedRent} isDeduction />}
          {r.unrealisedRent > 0 && <ResultRow label="Adjusted actual rent" amount={r.adjustedActualRent} isBold />}
        </>
      )}
      <ResultRow
        label={r.vacancyReliefApplied ? "Gross Annual Value (actual rent)" : showActual ? `GAV (${r.adjustedActualRent > r.expectedRent ? "actual" : "expected"} rent higher)` : "Gross Annual Value (expected rent)"}
        amount={r.grossAnnualValue}
        isBold
      />
      {r.municipalTaxesDeducted > 0 && <ResultRow label="Less: municipal taxes paid" amount={r.municipalTaxesDeducted} isDeduction />}
      <ResultRow label="Net Annual Value (NAV)" amount={r.netAnnualValue} isBold />
      {r.standardDeduction > 0 && <ResultRow label={`Less: 30% standard deduction (Sec. ${rule.sections["hpDeductions"]})`} amount={r.standardDeduction} isDeduction />}
      {r.homeLoanInterestFull > 0 && <ResultRow label="Less: home loan interest (Sec. 22)" amount={r.homeLoanInterestFull} isDeduction />}
      {r.coOwnershipShare < 1 && !r.isDeemedOwnershipActive ? (
        <>
          <ResultRow label="Income / (Loss) — full property" amount={r.rawIncomeDefault} isTotal />
          <ResultRow label={`Your ${Math.round(r.coOwnershipShare * 100)}% share`} amount={r.yourShareRawDefault} isBold />
        </>
      ) : (
        <ResultRow label="Income / (Loss)" amount={r.yourShareRawDefault} isTotal />
      )}
    </div>
  );
}

// ── Per-property card ─────────────────────────────────────────────────────────

function PropertyCard({
  form, index, result, properties, onUpdate, onRemove,
}: {
  form: PropertyForm;
  index: number;
  result: HpPropertyResult | undefined;
  properties: PropertyForm[];
  onUpdate: (p: Partial<PropertyForm>) => void;
  onRemove: () => void;
}) {
  const t = form.type;
  const builderNil = t === "builder-inventory" && builderWithinWindow(form.builderCompletionDate);

  const showRentFields =
    ["let-out-full", "let-out-partial-vacant", "partly-let-self-occ", "partly-let-vacant", "deemed-let-out"].includes(t) ||
    (t === "builder-inventory" && !builderNil);
  const showActualRent = ["let-out-full", "let-out-partial-vacant", "partly-let-self-occ", "partly-let-vacant"].includes(t);
  const showMonths = ["let-out-partial-vacant", "partly-let-vacant"].includes(t);
  const showUnitSplit = t === "partly-let-self-occ";
  const showMunicipalTaxes = showRentFields;
  const showHomeLoan = t !== "business-use";
  const showOwnership = t !== "business-use";

  return (
    <Card className={cn("transition-all", result?.excluded && "border-dashed opacity-70")}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Property {index + 1}</span>
            {form.isForeign && (
              <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">
                <Globe className="h-3 w-3" /> Foreign
              </span>
            )}
            <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", TYPE_BADGE[t])}>
              {PROPERTY_TYPE_LABELS[t]}
            </span>
            {result?.isDeemedLetOutDueToSOCap && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                Forced deemed let-out
              </span>
            )}
          </div>
          <button type="button" onClick={onRemove} className="rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Remove property">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {result?.isDeemedOwnershipActive && !result.excluded && (
          <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span><strong>Section 25 — Deemed ownership:</strong> Full income attributed to you regardless of legal title. Report in your return, not the transferee&apos;s return.</span>
          </div>
        )}
        {result?.isDeemedLetOutDueToSOCap && (
          <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span><strong>Section 21(6)-(7):</strong> {hp.maxSelfOccupied} self-occupied properties already claimed. This property is automatically treated as deemed let-out.</span>
          </div>
        )}
        {form.isForeign && (
          <div className="flex items-start gap-2 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-xs text-orange-800">
            <Globe className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>Foreign property income is taxable for Resident individuals. Computation is same as an Indian property — DTAA relief must be computed separately.</span>
          </div>
        )}
        {result?.vacancyReliefApplied && (
          <div className="flex items-start gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-xs text-teal-800">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span><strong>Section 21(2) vacancy relief:</strong> Annual value restricted to actual rent received.</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-5 pt-0">
        {/* Name + type */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor={`lbl-${form.id}`}>Property Name (optional)</Label>
            <Input id={`lbl-${form.id}`} value={form.label} onChange={(e) => onUpdate({ label: e.target.value })} placeholder="e.g. Flat in Mumbai" />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`typ-${form.id}`}>Property Type</Label>
            <select
              id={`typ-${form.id}`}
              value={form.type}
              onChange={(e) => onUpdate({ type: e.target.value as HpPropertyType })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {(Object.keys(PROPERTY_TYPE_LABELS) as HpPropertyType[]).map((v) => (
                <option key={v} value={v}>{PROPERTY_TYPE_LABELS[v]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Foreign toggle */}
        {t !== "business-use" && (
          <SwitchRow id={`foreign-${form.id}`} label="Foreign property (outside India)" value={form.isForeign} onChange={(v) => onUpdate({ isForeign: v })} description="Same computation; DTAA relief noted separately" />
        )}

        {/* Builder date */}
        {t === "builder-inventory" && (
          <div className="space-y-1">
            <Label htmlFor={`cc-${form.id}`}>Completion Certificate Date</Label>
            <Input id={`cc-${form.id}`} type="date" value={form.builderCompletionDate} onChange={(e) => onUpdate({ builderCompletionDate: e.target.value })} />
            <p className="text-xs text-muted-foreground">
              Section 21(5): Annual value is Nil within {hp.builderInventoryWindowYears} years of completion. Beyond that, deemed let-out rules apply.
            </p>
            {form.builderCompletionDate && (
              <p className={cn("text-xs font-medium", builderNil ? "text-emerald-700" : "text-amber-700")}>
                {builderNil ? `Within ${hp.builderInventoryWindowYears}-year nil-AV window` : `Beyond ${hp.builderInventoryWindowYears}-year window — taxed as deemed let-out`}
              </p>
            )}
          </div>
        )}

        {/* Unit split (Type D) */}
        {showUnitSplit && (
          <div className="space-y-2 rounded-md border p-3">
            <p className="text-xs font-medium">Unit split</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor={`tu-${form.id}`}>Total Units</Label>
                <Input id={`tu-${form.id}`} type="number" min={2} max={20} value={form.totalUnits} onChange={(e) => onUpdate({ totalUnits: Math.max(2, Number(e.target.value) || 2) })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`su-${form.id}`}>Self-Occupied</Label>
                <Input id={`su-${form.id}`} type="number" min={1} max={form.totalUnits - 1} value={form.selfOccupiedUnits} onChange={(e) => onUpdate({ selfOccupiedUnits: Math.min(form.totalUnits - 1, Math.max(1, Number(e.target.value) || 1)) })} />
              </div>
              <div className="space-y-1">
                <Label>Let-Out</Label>
                <div className="flex h-9 items-center rounded-md border bg-muted px-3 text-sm font-medium">{Math.max(1, form.totalUnits - form.selfOccupiedUnits)}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Municipal value, fair rent, standard rent, and municipal taxes are for the entire property — apportioned by units. Enter actual rent from let-out units only.</p>
          </div>
        )}

        {/* Months let out */}
        {showMonths && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor={`mo-${form.id}`}>Months Let Out</Label>
              <Input id={`mo-${form.id}`} type="number" min={1} max={11} value={form.monthsLetOut} onChange={(e) => onUpdate({ monthsLetOut: Math.min(11, Math.max(1, Number(e.target.value) || 1)) })} />
              <p className="text-xs text-muted-foreground">1–11 months; remainder is vacant. Section 21(2) vacancy relief applies.</p>
            </div>
            {t === "let-out-partial-vacant" && (
              <div className="space-y-1">
                <Label htmlFor={`vr-${form.id}`}>Reason for Vacancy</Label>
                <select id={`vr-${form.id}`} value={form.vacancyReason} onChange={(e) => onUpdate({ vacancyReason: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="searching-tenant">Searching for new tenant</option>
                  <option value="renovation">Under renovation / repairs</option>
                  <option value="other">Other reason</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* Rent inputs */}
        {showRentFields && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MoneyInput
                id={`mv-${form.id}`}
                label={t === "partly-let-self-occ" ? "Municipal Value — entire property (annual)" : "Municipal Value (annual)"}
                value={form.municipalValue}
                onChange={(v) => onUpdate({ municipalValue: v })}
                hint="From property tax bill / municipal corporation"
              />
              <MoneyInput
                id={`fmr-${form.id}`}
                label={t === "partly-let-self-occ" ? "Fair Market Rent — entire property (annual)" : "Fair Market Rent (annual)"}
                value={form.fairMarketRent}
                onChange={(v) => onUpdate({ fairMarketRent: v })}
                hint="Rent for a comparable property in the same area"
              />
            </div>
            <div className="space-y-2 rounded-md border p-3">
              <SwitchRow
                id={`sr-toggle-${form.id}`}
                label="Property is governed by a Rent Control Act"
                value={form.hasStandardRent}
                onChange={(v) => onUpdate({ hasStandardRent: v })}
                description="Standard rent = maximum rent permissible under Rent Control"
              />
              {form.hasStandardRent && (
                <MoneyInput
                  id={`sr-${form.id}`}
                  label="Standard Rent (annual)"
                  value={form.standardRent}
                  onChange={(v) => onUpdate({ standardRent: v })}
                  hint="Caps expected rent when standard rent < max(municipal value, fair market rent)"
                />
              )}
            </div>
          </div>
        )}

        {/* Actual rent + unrealised */}
        {showActualRent && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MoneyInput
              id={`ar-${form.id}`}
              label={
                t === "partly-let-self-occ" ? "Actual Rent Received — let-out units only (annual)" :
                ["let-out-partial-vacant", "partly-let-vacant"].includes(t) ? "Actual Rent Received — during let period" :
                "Actual Rent Received or Receivable (annual)"
              }
              value={form.actualRentReceived}
              onChange={(v) => onUpdate({ actualRentReceived: v })}
            />
            <MoneyInput
              id={`ur-${form.id}`}
              label="Unrealised Rent (annual)"
              value={form.unrealisedRent}
              onChange={(v) => onUpdate({ unrealisedRent: v })}
              hint="Rent due but not collected from tenant — deducted before computing annual value"
            />
          </div>
        )}

        {/* Municipal taxes */}
        {showMunicipalTaxes && (
          <MoneyInput
            id={`mt-${form.id}`}
            label={t === "partly-let-self-occ" ? "Municipal Taxes Paid — entire property (annual)" : "Municipal Taxes Paid by Owner (annual)"}
            value={form.municipalTaxesPaid}
            onChange={(v) => onUpdate({ municipalTaxesPaid: v })}
            hint="Deductible only when actually paid by the owner (payment basis, not accrual)"
          />
        )}

        {/* Home loan interest */}
        {showHomeLoan && (
          <MoneyInput
            id={`hl-${form.id}`}
            label={t === "partly-let-self-occ" ? "Home Loan Interest — entire property (annual)" : "Home Loan Interest (annual)"}
            value={form.homeLoanInterest}
            onChange={(v) => onUpdate({ homeLoanInterest: v })}
            hint={
              t === "self-occupied"
                ? `Optional regime: aggregate ${fmt(hp.selfOccupiedInterestCapOptional)} cap across all SO properties. Default: ₹0.`
                : t === "partly-let-self-occ"
                ? "Apportioned by units: let-out portion deductible both regimes; SO portion: optional regime only, aggregate ₹2L cap"
                : "No cap — fully deductible for let-out / deemed let-out in both regimes"
            }
          />
        )}

        {/* Co-ownership (Section 24) */}
        {showOwnership && (
          <div className="space-y-3 rounded-md border p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Co-Ownership — Section {rule.sections["hpCoOwnership"]}
            </p>
            <SwitchRow id={`co-${form.id}`} label="This is a co-owned property" value={form.isCoOwned} onChange={(v) => onUpdate({ isCoOwned: v })} />
            {form.isCoOwned && (
              <div className="space-y-3 pl-1">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor={`sh-${form.id}`}>Your Ownership Share (%)</Label>
                    <Input id={`sh-${form.id}`} type="number" min={1} max={99} value={form.ownershipSharePct} onChange={(e) => onUpdate({ ownershipSharePct: Math.min(99, Math.max(1, Number(e.target.value) || 50)) })} />
                  </div>
                  <div className="flex flex-col justify-end">
                    <SwitchRow id={`deed-${form.id}`} label="Share documented in sale deed" value={form.isDeedDocumented} onChange={(v) => onUpdate({ isDeedDocumented: v })} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Each co-owner computes their own share independently. This calculator shows your share only.</p>
              </div>
            )}
          </div>
        )}

        {/* Deemed ownership (Section 25) */}
        {showOwnership && (
          <div className="space-y-3 rounded-md border p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Deemed Ownership — Section {rule.sections["hpDeemedOwnership"]}
            </p>
            <SwitchRow
              id={`deemed-${form.id}`}
              label="Was this property transferred to your spouse or minor child without adequate consideration?"
              value={form.isDeemedOwnership}
              onChange={(v) => onUpdate({ isDeemedOwnership: v })}
            />
            {form.isDeemedOwnership && (
              <div className="space-y-3 pl-1">
                <p className="text-xs font-medium">Check if any exception to deemed ownership applies:</p>
                <SwitchRow
                  id={`liveapart-${form.id}`}
                  label="Is this transfer in connection with an agreement to live apart?"
                  value={form.isLiveApartTransfer}
                  onChange={(v) => onUpdate({ isLiveApartTransfer: v })}
                  description="If Yes → deemed ownership does NOT apply"
                />
                <SwitchRow
                  id={`minordau-${form.id}`}
                  label="Is the transferee your minor married daughter?"
                  value={form.isMinorMarriedDaughter}
                  onChange={(v) => onUpdate({ isMinorMarriedDaughter: v })}
                  description="If Yes → deemed ownership does NOT apply"
                />
                {(form.isLiveApartTransfer || form.isMinorMarriedDaughter) ? (
                  <p className="text-xs font-medium text-emerald-700">Exception applies — deemed ownership does NOT apply. Income is split by co-ownership share (if applicable).</p>
                ) : (
                  <p className="text-xs text-amber-700">No exception: you are the deemed owner. Full income will be attributed to you regardless of legal title.</p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>

      {/* Per-property result */}
      {result && (
        <CardContent className="border-t pt-4">
          <PropertyComputation r={result} />
        </CardContent>
      )}
    </Card>
  );
}

// ── Arrear entry card ─────────────────────────────────────────────────────────

function ArrearCard({
  form, index, properties, deduction, taxable, onUpdate, onRemove,
}: {
  form: ArrearsForm;
  index: number;
  properties: PropertyForm[];
  deduction: number;
  taxable: number;
  onUpdate: (p: Partial<ArrearsForm>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Arrears Entry {index + 1}</p>
        <button type="button" onClick={onRemove} className="rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <MoneyInput id={`a-amt-${form.id}`} label="Amount Received" value={form.amountReceived} onChange={(v) => onUpdate({ amountReceived: v })} />
        <div className="space-y-1">
          <Label htmlFor={`a-prop-${form.id}`}>Which property does this relate to?</Label>
          <select id={`a-prop-${form.id}`} value={form.propertyReference} onChange={(e) => onUpdate({ propertyReference: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">— Select property (optional) —</option>
            {properties.map((p, i) => (
              <option key={p.id} value={p.id}>Property {i + 1}{p.label ? ` — ${p.label}` : ""}</option>
            ))}
            <option value="not-owned">Property no longer owned by me</option>
          </select>
        </div>
      </div>
      <SwitchRow
        id={`a-owner-${form.id}`}
        label="Are you still the owner of this property?"
        value={form.stillOwner}
        onChange={(v) => onUpdate({ stillOwner: v })}
        description="Taxable regardless — Section 23(2) taxes arrears even after ownership ends"
      />
      {form.amountReceived > 0 && (
        <div className="rounded-md bg-muted/50 p-3">
          <ResultRow label="Arrears received" amount={form.amountReceived} />
          <ResultRow label={`Less: ${Math.round(hp.arrearsDeductionRate * 100)}% deduction (Sec. ${rule.sections["hpArrears"]}(3))`} amount={deduction} isDeduction />
          <ResultRow label="Taxable arrears" amount={taxable} isTotal />
        </div>
      )}
    </div>
  );
}

// ── Main HpClient ─────────────────────────────────────────────────────────────

export function HpClient() {
  const [properties, setProperties] = useState<PropertyForm[]>([]);
  const [arrears, setArrears] = useState<ArrearsForm[]>([]);

  const inputs: HpPropertyInput[] = properties.map(({ _open: _o, ...rest }) => rest);

  const summary = useMemo<HpSummary | null>(() => {
    if (inputs.length === 0 && arrears.length === 0) return null;
    return computeHousePropertyIncome(inputs, arrears, rule);
  }, [inputs, arrears]);

  const addProperty = useCallback(() => setProperties((p) => [...p, makeNewProperty()]), []);
  const removeProperty = useCallback((id: string) => setProperties((p) => p.filter((x) => x.id !== id)), []);
  const updateProperty = useCallback((id: string, patch: Partial<PropertyForm>) => setProperties((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x))), []);

  const addArrear = useCallback(() => setArrears((a) => [...a, makeNewArrear()]), []);
  const removeArrear = useCallback((id: string) => setArrears((a) => a.filter((x) => x.id !== id)), []);
  const updateArrear = useCallback((id: string, patch: Partial<ArrearsForm>) => setArrears((a) => a.map((x) => (x.id === id ? { ...x, ...patch } : x))), []);

  const optimizerLink = summary
    ? calcUrl("regime-optimizer", { hpIncome: summary.hpContributionOptional })
    : "/calculators/regime-optimizer";

  return (
    <div className="space-y-6">
      {/* ── Properties ── */}
      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed py-12 text-center">
          <p className="text-muted-foreground">No properties added yet. Add your first property to begin.</p>
          <button type="button" onClick={addProperty} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Add Property
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {properties.map((p, i) => (
              <PropertyCard
                key={p.id}
                form={p}
                index={i}
                result={summary?.propertyResults.find((r) => r.id === p.id)}
                properties={properties}
                onUpdate={(patch) => updateProperty(p.id, patch)}
                onRemove={() => removeProperty(p.id)}
              />
            ))}
          </div>
          <button type="button" onClick={addProperty} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary">
            <Plus className="h-4 w-4" /> Add Another Property
          </button>
        </>
      )}

      {/* ── Section 23 Arrears ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Arrears / Recovered Unrealised Rent — Section {rule.sections["hpArrears"]}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Rent arrears or previously unrealised rent recovered this year. Taxable regardless of
            ownership status (Section 23(2)). <strong>Cannot be offset against house property
            losses</strong> — treated as a separate non-offsettable line item.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {arrears.map((a, i) => {
            const item = summary?.arrearsItems.find((x) => x.id === a.id);
            return (
              <ArrearCard
                key={a.id}
                form={a}
                index={i}
                properties={properties}
                deduction={item?.deduction ?? 0}
                taxable={item?.taxableAmount ?? 0}
                onUpdate={(patch) => updateArrear(a.id, patch)}
                onRemove={() => removeArrear(a.id)}
              />
            );
          })}
          <button type="button" onClick={addArrear} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed py-2.5 text-sm text-muted-foreground hover:border-primary hover:text-primary">
            <Plus className="h-4 w-4" /> Add Arrears Entry
          </button>
          {summary && summary.arrearsGross > 0 && (
            <div className="rounded-md bg-muted/40 p-3">
              <ResultRow label="Total arrears received" amount={summary.arrearsGross} />
              <ResultRow label={`Less: ${Math.round(hp.arrearsDeductionRate * 100)}% deduction (Section 23(3))`} amount={summary.arrearsDeduction} isDeduction />
              <ResultRow label="Total taxable arrears income" amount={summary.arrearsNet} isTotal />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Summary ── */}
      {summary && (properties.length > 0 || arrears.length > 0) && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Total — Income from House Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Default Regime</p>
                  {properties.length > 0 && <ResultRow label="Net from properties" amount={summary.totalIncomeDefault} />}
                  {summary.arrearsNet > 0 && <ResultRow label={`Arrears — Sec. ${rule.sections["hpArrears"]} (non-offsettable)`} amount={summary.arrearsNet} />}
                  <ResultRow label="Total" amount={summary.hpContributionDefault} isTotal />
                  {summary.lossCarryForwardDefault > 0 && (
                    <p className="mt-2 text-xs text-amber-700">Loss of {fmt(summary.lossCarryForwardDefault)} carried forward (default regime: no set-off against other income; only against future HP income)</p>
                  )}
                </div>
                <div className="rounded-lg border p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Optional Regime</p>
                  {properties.length > 0 && (
                    <>
                      <ResultRow label="Net from properties" amount={summary.totalIncomeOptional} />
                      {summary.soInterestAllowedOptional > 0 && (
                        <p className="text-xs text-muted-foreground mb-1">
                          SO interest allowed: {fmt(summary.soInterestAllowedOptional)}
                          {summary.totalSoInterestFull > hp.selfOccupiedInterestCapOptional && (
                            <span className="text-amber-700"> (capped from {fmt(summary.totalSoInterestFull)})</span>
                          )}
                        </p>
                      )}
                    </>
                  )}
                  {summary.arrearsNet > 0 && <ResultRow label={`Arrears — Sec. ${rule.sections["hpArrears"]} (non-offsettable)`} amount={summary.arrearsNet} />}
                  {summary.lossSetOffOptional > 0 && (
                    <ResultRow label={`HP Loss set-off against other income (max ${fmt(hp.lossSetOffCapOptional)})`} amount={summary.lossSetOffOptional} isDeduction />
                  )}
                  <ResultRow label="Net contribution to total income" amount={summary.hpContributionOptional} isTotal />
                  {summary.lossCarryForwardOptional > 0 && (
                    <p className="mt-2 text-xs text-amber-700">Loss of {fmt(summary.lossCarryForwardOptional)} carried forward up to {hp.lossCarryForwardYears} years (against HP income only)</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cross-links */}
          <div className="space-y-3">
            <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm">
              <p className="font-medium">Feed this result into the Regime Optimizer</p>
              <p className="mt-0.5 text-muted-foreground">House property {summary.hpContributionOptional < 0 ? "loss" : "income"} is pre-filled with regime-specific treatment applied automatically.</p>
              <Link href={optimizerLink} className="mt-2 inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline">
                Open Regime Optimizer <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Pre-construction interest?</span> Use the Home Loan calculator (coming soon) for the 5-year deferred instalment breakdown. Enter the current year&apos;s instalment in the home loan interest field above.
            </div>
          </div>

          {/* Section reference */}
          <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Income from House Property — Sections 20-25, Income Tax Act 2025</p>
            <p className="text-xs">
              (Formerly Sections 22-27, IT Act 1961.) S.20 — Charging section &amp; exclusions; S.21 — Annual value &amp; GAV computation;
              S.22 — Deductions (30% standard deduction + home loan interest); S.23 — Arrears &amp; recovered unrealised rent;
              S.24 — Co-owned properties; S.25 — Deemed ownership (spousal / minor-child transfers).
            </p>
          </div>
        </>
      )}
    </div>
  );
}
