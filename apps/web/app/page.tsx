import Link from "next/link";
import { Calculator, ShieldCheck, Database, Zap, Lock, BookOpen } from "lucide-react";

const CALCULATORS = [
  {
    href: "/calculators/regime-optimizer",
    title: "Regime Optimizer",
    description:
      "Compare default vs optional regime in real-time. Includes Section 156 rebate, marginal relief, and deduction breakeven.",
    badge: "Section 202",
    tip: "Most useful calculator to start with",
  },
  {
    href: "/calculators/hra",
    title: "HRA Exemption",
    description:
      "Calculate your House Rent Allowance exemption using the three-condition minimum formula for metro and non-metro cities.",
    badge: "Schedule III",
    tip: null,
  },
  {
    href: "/calculators/house-property-income",
    title: "House Property Income",
    description:
      "Compute income or loss from self-occupied, let-out, and deemed let-out properties. Covers co-ownership, arrears, and regime-specific loss set-off.",
    badge: "Sections 20–25",
    tip: null,
  },
  {
    href: "/calculators/multiple-employer",
    title: "Multiple Employer",
    description:
      "Switched jobs this year? Aggregate salary and TDS from all employers to find your true tax position and any shortfall.",
    badge: "Section 392",
    tip: null,
  },
  {
    href: "/calculators/advance-tax",
    title: "Advance Tax",
    description:
      "Calculate quarterly instalment amounts (Q1–Q4) and check if your net liability crosses the ₹10,000 threshold.",
    badge: "Section 425",
    tip: null,
  },
];

const TRUST_BADGES = [
  { icon: Lock, label: "No login required" },
  { icon: Database, label: "No data stored" },
  { icon: Zap, label: "Instant calculations" },
  { icon: BookOpen, label: "Cites IT Act 2025 sections" },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Enter your income details",
    body: "Type your salary, deductions, rent paid, or any other input the calculator needs. All fields are optional — you only fill what applies to you.",
  },
  {
    step: "2",
    title: "See a live breakdown",
    body: "Results update as you type. Every figure is accompanied by the relevant Act section so you know exactly where the number comes from.",
  },
  {
    step: "3",
    title: "Know your exact position",
    body: "Understand your tax liability, the better regime for your situation, and whether you need to pay advance tax — before you talk to your CA.",
  },
];

const FAQS = [
  {
    q: "Which income tax act do these calculators use?",
    a: "All calculators use the Income Tax Act 2025 exclusively. This is the new Act that replaces the Income Tax Act 1961 for Tax Year 2026-27 onwards. The section numbers are different — for example, the Section 156 rebate (old 87A), Section 202 (new tax regime slabs), and Section 425 (advance tax). We cite the 2025 Act sections throughout.",
  },
  {
    q: "Is my data private? Do you store anything?",
    a: "Nothing leaves your browser. All calculations run locally using JavaScript. We do not collect, transmit, or store any of the numbers you enter. There are no accounts, no cookies with personal data, and no analytics that track your inputs.",
  },
  {
    q: "Can I rely on these results to file my return?",
    a: "These calculators are designed to help you understand your approximate tax position and have an informed conversation with your Chartered Accountant. They do not account for every individual circumstance — carry-forward losses from prior years, exemptions specific to your employment, or special income types like ESOPs and foreign income may require separate treatment. Always verify with a CA before filing.",
  },
  {
    q: "What is the difference between the default and optional regime?",
    a: "Under IT Act 2025, the default regime has 7 slabs (0%–30%) with a full tax rebate up to ₹12 lakh income (Section 156) and a ₹75,000 standard deduction. Most deductions like 80C, HRA, and home loan interest are not available. The optional regime has 4 slabs (0%–30%) but allows most deductions — 80C (Section 123), HRA (Schedule III), home loan interest (Section 71), health insurance (Section 130), and more — with a ₹50,000 standard deduction. Use the Regime Optimizer above to compare both for your specific income.",
  },
  {
    q: "Do these calculators work for all income types?",
    a: "The current suite focuses on salaried income, house property income, and advance tax — the most common needs for individual taxpayers. Capital gains, business income (PGBP), and foreign income are not covered by the current calculators.",
  },
];

export default function Home() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b bg-muted/20">
        <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Tax Year 2026-27 · Income Tax Act 2025
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Indian Income Tax,{" "}
            <span className="text-primary">Simplified</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Free calculators built directly on the Income Tax Act 2025.
            <br className="hidden sm:block" />
            No ads. No login. No guesswork — every number cites its section.
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground"
              >
                <Icon className="h-3.5 w-3.5 text-emerald-600" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/calculators/regime-optimizer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Start with Regime Optimizer
            </Link>
            <p className="mt-2 text-xs text-muted-foreground">
              The right regime choice can save you thousands — check yours first.
            </p>
          </div>
        </div>
      </section>

      {/* ── Calculators ──────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-2 text-xl font-semibold">All Calculators</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Each calculator covers a specific aspect of your income tax. Use them independently or link them together.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CALCULATORS.map(({ href, title, description, badge, tip }) => (
            <Link
              key={href}
              href={href}
              className="group relative rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
            >
              {tip && (
                <span className="absolute right-4 top-4 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                  {tip}
                </span>
              )}
              <div className="mb-3 flex items-start justify-between gap-3 pr-2">
                <h3 className="text-base font-semibold group-hover:text-primary">{title}</h3>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {badge}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              <p className="mt-4 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open calculator →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="border-t bg-muted/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-2 text-xl font-semibold">How it works</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            TaxSaral is designed to help you understand your tax position before you sit down with your CA.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, body }) => (
              <div key={step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {step}
                </div>
                <div>
                  <p className="font-medium text-sm">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why trust us ─────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-2 text-xl font-semibold">Why TaxSaral?</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Most tax calculators in India still use the 1961 Act. TaxSaral was built from scratch for 2025.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border p-5">
              <ShieldCheck className="mb-3 h-5 w-5 text-emerald-600" />
              <p className="font-medium text-sm">Built on the actual law</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Every rate, slab, deduction limit, and section number is sourced directly from the Income Tax Act 2025 — not from a summary or circular. Section numbers are displayed on-screen so you can verify.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <Lock className="mb-3 h-5 w-5 text-emerald-600" />
              <p className="font-medium text-sm">Completely private</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Your income details never leave your device. Calculations run entirely in your browser with zero server calls for your data. No account, no email, no tracking of your inputs.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <Zap className="mb-3 h-5 w-5 text-emerald-600" />
              <p className="font-medium text-sm">Live, linked calculators</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Results from the HRA calculator feed directly into the Regime Optimizer. House property income/losses carry across too. One set of inputs, complete picture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="border-t bg-muted/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-8 text-xl font-semibold">Frequently asked questions</h2>
          <div className="space-y-2">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group rounded-lg border bg-card">
                <summary className="flex cursor-pointer select-none list-none items-center justify-between px-5 py-4 font-medium text-sm [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45 text-lg leading-none">
                    +
                  </span>
                </summary>
                <div className="border-t px-5 py-4 text-sm text-muted-foreground leading-relaxed">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom disclaimer ─────────────────────────────────────────── */}
      <section className="border-t">
        <div className="container mx-auto max-w-4xl px-4 py-6 text-center text-xs text-muted-foreground">
          For guidance only — verify with a CA before filing. All calculators use Income Tax Act 2025 rates only (Tax Year 2026-27 / AY 2027-28).
        </div>
      </section>
    </main>
  );
}
