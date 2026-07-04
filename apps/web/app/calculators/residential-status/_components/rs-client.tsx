"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight, ArrowLeft, CheckCircle2, AlertTriangle,
  ShieldAlert, Info,
} from "lucide-react";
import { getRuleForYear } from "@taxsaral/tax-rules";
import { determineResidentialStatus } from "@taxsaral/tax-engine";
import type { ResidentialStatusInput, ResidentialStatusResult } from "@taxsaral/tax-engine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const rule = getRuleForYear("TY-2026-27");
const rs = rule.residentialStatus;
const inrFmt = new Intl.NumberFormat("en-IN");
const fmtInr = (n: number) => `₹${inrFmt.format(Math.round(n))}`;

// ── Types ─────────────────────────────────────────────────────────────────────

type Citizenship = "indian" | "pio" | "foreign";
type LeaveReason = "crew" | "employment" | "both" | "neither";
type StepId =
  | "citizenship"
  | "days-this-year"
  | "prior-4-years"
  | "left-india"
  | "foreign-ship"
  | "visitor"
  | "income"
  | "liable-abroad"
  | "nor-years"
  | "nor-days";

interface WizardState {
  citizenship: Citizenship | null;
  daysThisYear: string;
  py1: string; py2: string; py3: string; py4: string;
  leaveReason: LeaveReason | null;
  isCrewForeignShip: boolean | null;
  isVisitor: boolean | null;
  incomeRaw: string;
  liableAbroad: boolean | null;
  yearsNrRaw: string;
  days7Raw: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseNum(raw: string, max = Infinity): number {
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  if (isNaN(n) || n < 0) return 0;
  return Math.min(n, max);
}

function buildInput(s: WizardState): ResidentialStatusInput {
  return {
    citizenship: s.citizenship ?? "foreign",
    daysInIndiaThisYear: parseNum(s.daysThisYear, 366),
    daysInIndiaPrior4Years: parseNum(s.py1, 366) + parseNum(s.py2, 366) + parseNum(s.py3, 366) + parseNum(s.py4, 366),
    leftAsIndianShipCrew: s.leaveReason === "crew" || s.leaveReason === "both",
    leftForEmploymentAbroad: s.leaveReason === "employment" || s.leaveReason === "both",
    isCrewOfForeignBoundShip: s.isCrewForeignShip ?? false,
    isVisitorFromAbroad: s.isVisitor ?? false,
    totalIncomeExclForeignSources: parseNum(s.incomeRaw),
    liableToTaxInAnotherCountry: s.liableAbroad ?? false,
    yearsNonResidentIn10Preceding: parseNum(s.yearsNrRaw, 10),
    daysInIndiaOver7PrecedingYears: parseNum(s.days7Raw, 2557),
  };
}

function getApplicableSteps(s: WizardState, result: ResidentialStatusResult | null): StepId[] {
  const steps: StepId[] = ["citizenship", "days-this-year", "prior-4-years"];
  if (s.citizenship === "indian") { steps.push("left-india"); steps.push("foreign-ship"); }
  if (s.citizenship === "indian" || s.citizenship === "pio") { steps.push("visitor"); steps.push("income"); }
  if (s.citizenship === "indian") steps.push("liable-abroad");
  if (result && result.status !== "Non-Resident") { steps.push("nor-years"); steps.push("nor-days"); }
  return steps;
}

function isStepComplete(id: StepId, s: WizardState): boolean {
  switch (id) {
    case "citizenship":    return s.citizenship !== null;
    case "days-this-year": return s.daysThisYear !== "";
    case "prior-4-years":  return s.py1 !== "" && s.py2 !== "" && s.py3 !== "" && s.py4 !== "";
    case "left-india":     return s.leaveReason !== null;
    case "foreign-ship":   return s.isCrewForeignShip !== null;
    case "visitor":        return s.isVisitor !== null;
    case "income":         return s.incomeRaw !== "";
    case "liable-abroad":  return s.liableAbroad !== null;
    case "nor-years":      return s.yearsNrRaw !== "";
    case "nor-days":       return s.days7Raw !== "";
  }
}

// ── Radio button primitive ────────────────────────────────────────────────────

function RadioOption<T extends string>({
  value, selected, label, hint, onSelect,
}: { value: T; selected: T | null; label: string; hint?: string; onSelect: (v: T) => void }) {
  const active = selected === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "w-full rounded-lg border-2 px-4 py-3 text-left text-sm transition-all",
        active
          ? "border-primary bg-primary/5 font-medium"
          : "border-muted hover:border-primary/40 hover:bg-muted/40"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          active ? "border-primary bg-primary" : "border-muted-foreground/40"
        )}>
          {active && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
        </div>
        <div>
          <p>{label}</p>
          {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
        </div>
      </div>
    </button>
  );
}

// ── YesNo helper ──────────────────────────────────────────────────────────────

function YesNo({ value, onChange }: { value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div className="flex gap-2">
      {[{ label: "Yes", v: true }, { label: "No", v: false }].map(({ label, v }) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            "flex-1 rounded-lg border-2 py-2.5 text-sm font-medium transition-all",
            value === v ? "border-primary bg-primary/5 text-primary" : "border-muted hover:border-primary/40"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ── Number field ──────────────────────────────────────────────────────────────

function NumField({ id, label, hint, value, max, suffix, onChange }: {
  id: string; label: string; hint?: string; value: string; max?: number; suffix?: string; onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          max={max}
          placeholder="0"
          onChange={e => onChange(e.target.value)}
          className={suffix ? "pr-16" : ""}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suffix}</span>
        )}
      </div>
      {hint && <p className="text-xs text-muted-foreground leading-relaxed">{hint}</p>}
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status, large }: { status: string; large?: boolean }) {
  const config = {
    "ROR": { bg: "bg-green-100 text-green-800 border-green-200", label: "Resident and Ordinarily Resident" },
    "RNOR": { bg: "bg-amber-100 text-amber-800 border-amber-200", label: "Resident but Not Ordinarily Resident" },
    "Non-Resident": { bg: "bg-blue-100 text-blue-800 border-blue-200", label: "Non-Resident" },
  }[status] ?? { bg: "bg-muted text-muted-foreground border-muted", label: status };

  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 font-semibold", config.bg, large ? "text-base" : "text-xs")}>
      {large ? config.label : status}
    </span>
  );
}

// ── Result panel ──────────────────────────────────────────────────────────────

function ResultPanel({ result, allDone }: { result: ResidentialStatusResult; allDone: boolean }) {
  const [showTrail, setShowTrail] = useState(false);

  const implication = {
    "ROR": {
      title: "Global income taxable in India",
      body: "As a Resident and Ordinarily Resident, your worldwide income is taxable in India — including salary earned abroad, foreign interest, capital gains, rental income from overseas properties, etc. Double-taxation relief may be available under applicable DTAAs.",
      link: { href: "/calculators/regime-optimizer", label: "See full regime comparison →" },
    },
    "RNOR": {
      title: "India-source + business income taxable; other foreign income exempt",
      body: "As an RNOR, Indian-source income and income from a business controlled in India or profession set up in India is taxable. Other foreign-sourced income is NOT taxable in India. This transitional status typically benefits returning NRIs and usually lasts 2–3 years.",
      link: { href: "/calculators/regime-optimizer", label: "Calculate tax on India income →" },
    },
    "Non-Resident": {
      title: "Only India-source income taxable",
      body: "As a Non-Resident, only income that accrues or arises in India (or is deemed to) is taxable here. Foreign income is not taxable in India. TDS applies on India-source income at applicable NR rates under the Finance Act or DTAA, whichever is beneficial.",
      link: { href: "/calculators/regime-optimizer", label: "Calculate tax on India income →" },
    },
  }[result.status];

  return (
    <div className={cn("space-y-4 transition-all", !allDone && "opacity-75")}>
      {/* Status card */}
      <Card className={cn(
        "border-2",
        result.status === "ROR" && "border-green-200",
        result.status === "RNOR" && "border-amber-200",
        result.status === "Non-Resident" && "border-blue-200",
      )}>
        <CardContent className="pt-5 pb-4">
          {!allDone && (
            <p className="mb-3 text-xs text-muted-foreground">
              Preliminary result — complete all questions to confirm
            </p>
          )}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                Residential Status — Tax Year 2026-27
              </p>
              <StatusBadge status={result.status} large />
              <p className="mt-2 text-xs text-muted-foreground">
                Determinative provision: <strong>Section {result.determinativeSubsection}, IT Act 2025</strong>
              </p>
            </div>
            {result.isDeemedResident && (
              <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                <ShieldAlert className="h-3.5 w-3.5" />
                Deemed Resident [6(7)]
              </div>
            )}
          </div>

          {/* Deemed resident warning */}
          {result.isDeemedResident && (
            <div className="mt-4 flex gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
              <p>
                <strong>You are a DEEMED RESIDENT under Section 6(7).</strong> This is an anti-avoidance provision targeting high-income Indian citizens with no tax home anywhere. Your status is always RNOR per Section 6(13)(c). Consult a CA to review your foreign tax positions before filing.
              </p>
            </div>
          )}

          {/* Section 6(12) note */}
          <div className="mt-3 flex gap-2 rounded-lg bg-muted/40 p-2.5 text-xs text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <p>Section 6(12): Once resident for any one source of income, deemed resident for ALL sources — no bifurcation is permitted.</p>
          </div>
        </CardContent>
      </Card>

      {/* Tax implication */}
      {implication && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tax implications for {result.status}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong className="text-foreground">{implication.title}.</strong> {implication.body}</p>
            <Link
              href={implication.link.href}
              className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4 text-xs font-medium"
            >
              {implication.link.label}
              <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      )}

      {/* 6(6) notes */}
      {result.notes.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 space-y-1">
          {result.notes.map((n, i) => (
            <p key={i}><strong>Note:</strong> {n}</p>
          ))}
        </div>
      )}

      {/* Logic trail */}
      <details className="group" onToggle={e => setShowTrail((e.target as HTMLDetailsElement).open)}>
        <summary className="flex cursor-pointer select-none list-none items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
          Logic trail — step-by-step path taken
          <span className="text-muted-foreground transition-transform duration-200 group-open:rotate-45 text-lg leading-none">+</span>
        </summary>
        {showTrail && (
          <div className="mt-1 rounded-lg border bg-muted/20 divide-y text-xs">
            {result.trail.map((entry, i) => (
              <div key={i} className="flex gap-3 px-4 py-2.5">
                <span className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 font-mono font-medium",
                  entry.result === "met" && "bg-green-100 text-green-700",
                  entry.result === "not-met" && "bg-muted text-muted-foreground",
                  entry.result === "disabled" && "bg-red-100 text-red-700",
                  entry.result === "note" && "bg-amber-100 text-amber-700",
                )}>
                  §{entry.subsection}
                </span>
                <span className="text-muted-foreground">{entry.description}</span>
              </div>
            ))}
          </div>
        )}
      </details>

      {/* Legal reference */}
      <p className="text-xs text-muted-foreground px-1">
        Section 6 (Residential Status), Income Tax Act 2025. Equivalent to Section 6, IT Act 1961.
        Verified verbatim against official gazette text, sub-sections 6(1)–6(14).
      </p>
    </div>
  );
}

// ── Main wizard component ─────────────────────────────────────────────────────

const INIT: WizardState = {
  citizenship: null,
  daysThisYear: "", py1: "", py2: "", py3: "", py4: "",
  leaveReason: null, isCrewForeignShip: null, isVisitor: null,
  incomeRaw: "", liableAbroad: null, yearsNrRaw: "", days7Raw: "",
};

export function ResidentialStatusClient() {
  const [state, setState] = useState<WizardState>(INIT);
  const [stepIndex, setStepIndex] = useState(0);

  const update = (partial: Partial<WizardState>) => setState(prev => ({ ...prev, ...partial }));

  // Compute result in real-time
  const result = useMemo(
    () => state.citizenship !== null ? determineResidentialStatus(buildInput(state), rule) : null,
    [state]
  );

  const steps = useMemo(() => getApplicableSteps(state, result), [state, result]);

  // Clamp stepIndex if applicable steps shrink
  const safeIndex = Math.min(stepIndex, steps.length - 1);
  const currentStepId = steps[safeIndex];
  const allDone = steps.every(id => isStepComplete(id, state));

  const advance = () => {
    if (safeIndex < steps.length - 1) setStepIndex(safeIndex + 1);
  };
  const back = () => {
    if (safeIndex > 0) setStepIndex(safeIndex - 1);
  };

  // Auto-advance after radio selection (300ms)
  const radioSelect = (fn: () => void) => {
    fn();
    setTimeout(() => setStepIndex(i => Math.min(i + 1, steps.length - 1)), 280);
  };

  // Progress
  const completedCount = steps.filter(id => isStepComplete(id, state)).length;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Step {safeIndex + 1} of {steps.length}</span>
          <span>{completedCount} of {steps.length} answered</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(completedCount / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Summary strip of completed prior steps */}
      {safeIndex > 0 && (
        <div className="space-y-1.5">
          {steps.slice(0, safeIndex).map(id => (
            <CompletedStepSummary key={id} stepId={id} state={state} onEdit={() => setStepIndex(steps.indexOf(id))} />
          ))}
        </div>
      )}

      {/* Current step question card */}
      <Card className="border-primary/30">
        <CardContent className="pt-5 space-y-4">
          <StepQuestion
            stepId={currentStepId}
            state={state}
            update={update}
            radioSelect={radioSelect}
            advance={advance}
          />

          {/* Nav buttons */}
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={back}
              disabled={safeIndex === 0}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors disabled:opacity-40"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            {isStepComplete(currentStepId, state) && safeIndex < steps.length - 1 && (
              <button
                type="button"
                onClick={advance}
                className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Continue
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Real-time result (always shown once citizenship is selected) */}
      {result && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {allDone ? "Your Residential Status" : "Preliminary result"}
          </p>
          <ResultPanel result={result} allDone={allDone} />
        </div>
      )}
    </div>
  );
}

// ── Completed step summary ────────────────────────────────────────────────────

function CompletedStepSummary({ stepId, state, onEdit }: { stepId: StepId; state: WizardState; onEdit: () => void }) {
  const summaries: Record<StepId, string> = {
    "citizenship": {
      indian: "Indian citizen",
      pio: "Person of Indian Origin (PIO)",
      foreign: "Foreign national",
    }[state.citizenship ?? ""] ?? "",
    "days-this-year": `${parseNum(state.daysThisYear, 366)} days in India, TY 2026-27`,
    "prior-4-years": `${parseNum(state.py1, 366) + parseNum(state.py2, 366) + parseNum(state.py3, 366) + parseNum(state.py4, 366)} days cumulative over prior 4 years`,
    "left-india": {
      crew: "Left as crew of Indian ship [Sec 6(3)(a)]",
      employment: "Left for employment abroad [Sec 6(3)(b)]",
      both: "Left as crew AND for employment [Sec 6(3)]",
      neither: "Did not leave as crew or for employment",
    }[state.leaveReason ?? ""] ?? "",
    "foreign-ship": state.isCrewForeignShip ? "Crew of a foreign-bound ship [Sec 6(6)]" : "Not crew of foreign-bound ship",
    "visitor": state.isVisitor ? "Came to India on a visit from abroad [Sec 6(4)]" : "Not a visitor from abroad",
    "income": `Income excl. foreign sources: ${fmtInr(parseNum(state.incomeRaw))}`,
    "liable-abroad": state.liableAbroad ? "Liable to tax in another country" : "Not liable to tax in any other country",
    "nor-years": `Non-Resident in ${parseNum(state.yearsNrRaw, 10)} of the last 10 years`,
    "nor-days": `${parseNum(state.days7Raw, 2557)} days in India over last 7 years`,
  };

  return (
    <button
      type="button"
      onClick={onEdit}
      className="w-full flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors"
    >
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
        <span>{summaries[stepId]}</span>
      </div>
      <span className="text-primary text-xs">edit</span>
    </button>
  );
}

// ── Step question renderer ────────────────────────────────────────────────────

function StepQuestion({ stepId, state, update, radioSelect, advance }: {
  stepId: StepId;
  state: WizardState;
  update: (p: Partial<WizardState>) => void;
  radioSelect: (fn: () => void) => void;
  advance: () => void;
}) {
  switch (stepId) {

    case "citizenship":
      return (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-0.5">What is your citizenship / origin?</p>
            <p className="text-xs text-muted-foreground">Section 6(2)–6(7) apply differently depending on whether you are an Indian citizen, PIO, or foreign national.</p>
          </div>
          {(["indian", "pio", "foreign"] as Citizenship[]).map(c => (
            <RadioOption
              key={c}
              value={c}
              selected={state.citizenship}
              label={{ indian: "Indian citizen", pio: "Person of Indian Origin (PIO)", foreign: "Foreign national (neither)" }[c]}
              hint={{ indian: undefined, pio: "Foreign citizen whose self, parents, or grandparents were born in undivided India", foreign: undefined }[c]}
              onSelect={v => radioSelect(() => update({ citizenship: v, leaveReason: null, isCrewForeignShip: null, isVisitor: null }))}
            />
          ))}
        </div>
      );

    case "days-this-year":
      return (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-0.5">How many days were you physically in India during Tax Year 2026-27?</p>
            <p className="text-xs text-muted-foreground">April 1, 2026 – March 31, 2027. Both arrival and departure days count as full days in India.</p>
          </div>
          <NumField
            id="days-ty"
            label="Days in India (TY 2026-27)"
            value={state.daysThisYear}
            max={366}
            suffix="days"
            hint={`Threshold for 6(2)(a): ≥ ${rs.daysThresholdResident} days`}
            onChange={v => update({ daysThisYear: v })}
          />
          {state.daysThisYear !== "" && (
            <button type="button" onClick={advance}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Continue
            </button>
          )}
        </div>
      );

    case "prior-4-years":
      return (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-0.5">Days in India for each of the 4 preceding tax years</p>
            <p className="text-xs text-muted-foreground">Section 6(2)(b) requires ≥ {rs.prior4YearsMinDays} cumulative days over these 4 years. Enter 0 if you were not in India that year.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "py1", label: "TY 2025-26 (most recent)", key: "py1" as const },
              { id: "py2", label: "TY 2024-25", key: "py2" as const },
              { id: "py3", label: "TY 2023-24", key: "py3" as const },
              { id: "py4", label: "TY 2022-23", key: "py4" as const },
            ].map(({ id, label, key }) => (
              <NumField key={id} id={id} label={label} value={state[key]} max={366} suffix="days"
                onChange={v => update({ [key]: v } as Partial<WizardState>)} />
            ))}
          </div>
          {(() => {
            const total = parseNum(state.py1, 366) + parseNum(state.py2, 366) + parseNum(state.py3, 366) + parseNum(state.py4, 366);
            const allFilled = state.py1 !== "" && state.py2 !== "" && state.py3 !== "" && state.py4 !== "";
            return allFilled ? (
              <div className="rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                Total: <strong>{total} days</strong>
                {total >= rs.prior4YearsMinDays ? " — meets the 365-day threshold for 6(2)(b)" : ` — below the ${rs.prior4YearsMinDays}-day threshold for 6(2)(b)`}
              </div>
            ) : null;
          })()}
        </div>
      );

    case "left-india":
      return (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-0.5">Did you leave India during TY 2026-27 for any of these reasons?</p>
            <p className="text-xs text-muted-foreground">Section 6(3): If yes, 6(2)(b) is disabled — you can only become Resident via the 182-day test (6(2)(a)).</p>
          </div>
          {([
            { v: "crew", label: "As crew of an Indian ship", hint: "Merchant Shipping Act 1958, Section 3(18) — triggers Section 6(3)(a)" },
            { v: "employment", label: "For employment outside India", hint: "Triggers Section 6(3)(b)" },
            { v: "both", label: "Both of the above", hint: "Both 6(3)(a) and 6(3)(b) apply" },
            { v: "neither", label: "Neither — I did not leave for these reasons", hint: undefined },
          ] as { v: LeaveReason; label: string; hint?: string }[]).map(({ v, label, hint }) => (
            <RadioOption key={v} value={v} selected={state.leaveReason} label={label} hint={hint}
              onSelect={val => radioSelect(() => update({ leaveReason: val }))} />
          ))}
        </div>
      );

    case "foreign-ship":
      return (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-0.5">Are you crew of a foreign-bound ship that left India?</p>
            <p className="text-xs text-muted-foreground">Section 6(6): If yes, the days in India for your voyage are computed per CBDT-prescribed conditions — a note will appear in your result.</p>
          </div>
          <YesNo value={state.isCrewForeignShip} onChange={v => radioSelect(() => update({ isCrewForeignShip: v }))} />
        </div>
      );

    case "visitor":
      return (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-0.5">Were you living outside India and came to India only on a visit during TY 2026-27?</p>
            <p className="text-xs text-muted-foreground">Section 6(4): Citizen/PIO who is ordinarily resident abroad and visits India. If yes, Section 6(4) may limit how you become Resident.</p>
          </div>
          <YesNo value={state.isVisitor} onChange={v => radioSelect(() => update({ isVisitor: v }))} />
        </div>
      );

    case "income": {
      const threshold = rs.deemedResidentIncomeThreshold;
      const isCitizen = state.citizenship === "indian";
      return (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-0.5">Total income excluding foreign sources (TY 2026-27)</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Section 6(14): &ldquo;Income from foreign sources&rdquo; = income accruing/arising outside India, <em>except</em> income from a business controlled in India or profession set up in India.{" "}
              {isCitizen ? `This determines whether Sections 6(5), 6(7), and 6(13)(b) apply. Threshold: ₹${inrFmt.format(threshold)}.` : `Used for Sections 6(5) and 6(13)(b). Threshold: ₹${inrFmt.format(threshold)}.`}
            </p>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
            <Input
              id="income"
              type="text"
              inputMode="numeric"
              value={state.incomeRaw}
              onChange={e => update({ incomeRaw: e.target.value })}
              className="pl-7"
              placeholder="0"
            />
          </div>
          {state.incomeRaw !== "" && (
            <div className={cn(
              "rounded-lg px-3 py-2 text-xs",
              parseNum(state.incomeRaw) > threshold ? "bg-amber-50 text-amber-800" : "bg-muted/40 text-muted-foreground"
            )}>
              {parseNum(state.incomeRaw) > threshold
                ? `Above ₹${inrFmt.format(threshold)} — Sections 6(5)/${isCitizen ? "6(7)/" : ""}6(13)(b) may apply`
                : `Below ₹${inrFmt.format(threshold)} — income threshold conditions not triggered`}
            </div>
          )}
          {state.incomeRaw !== "" && (
            <button type="button" onClick={advance}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Continue
            </button>
          )}
        </div>
      );
    }

    case "liable-abroad":
      return (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-0.5">Are you liable to tax in any other country or territory by reason of domicile, residence, or any similar criteria?</p>
            <p className="text-xs text-muted-foreground">Section 6(7)(b): If yes, Section 6(7) deemed-resident anti-avoidance does NOT apply — you have a tax home elsewhere.</p>
          </div>
          <YesNo value={state.liableAbroad} onChange={v => radioSelect(() => update({ liableAbroad: v }))} />
        </div>
      );

    case "nor-years":
      return (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-0.5">In how many of the 10 preceding tax years were you a Non-Resident?</p>
            <p className="text-xs text-muted-foreground">Section 6(13)(a)(i): If you were Non-Resident in {rs.norMinNrYearsIn10Preceding} or more of the last 10 years (TY 2015-16 to TY 2025-26), you qualify as RNOR.</p>
          </div>
          <NumField id="nor-years" label="Years as Non-Resident (0–10)" value={state.yearsNrRaw} max={10} suffix="years"
            onChange={v => update({ yearsNrRaw: v })} />
          {state.yearsNrRaw !== "" && (
            <button type="button" onClick={advance}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Continue
            </button>
          )}
        </div>
      );

    case "nor-days":
      return (
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-0.5">Total days in India over the 7 preceding tax years (TY 2019-20 to TY 2025-26)?</p>
            <p className="text-xs text-muted-foreground">Section 6(13)(a)(ii): If you were in India for {rs.norMaxDaysIn7Years} days or fewer over this 7-year window, you qualify as RNOR. Maximum possible: ~2,557 days.</p>
          </div>
          <NumField id="nor-days" label="Cumulative days in India" value={state.days7Raw} max={2557} suffix="days"
            onChange={v => update({ days7Raw: v })} />
          {state.days7Raw !== "" && (() => {
            const d = parseNum(state.days7Raw, 2557);
            return (
              <div className={cn("rounded-lg px-3 py-2 text-xs", d <= rs.norMaxDaysIn7Years ? "bg-amber-50 text-amber-800" : "bg-muted/40 text-muted-foreground")}>
                {d <= rs.norMaxDaysIn7Years ? `${d} ≤ ${rs.norMaxDaysIn7Years} — triggers RNOR under 6(13)(a)(ii)` : `${d} > ${rs.norMaxDaysIn7Years} — does not trigger RNOR under 6(13)(a)(ii)`}
              </div>
            );
          })()}
          {state.days7Raw !== "" && (
            <button type="button" onClick={advance}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              See result
            </button>
          )}
        </div>
      );

    default:
      return null;
  }
}
