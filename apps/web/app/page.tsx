import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, ShieldCheck, Database, Zap, Lock, BookOpen, ArrowRight,
} from "lucide-react";
import { CASE_LAWS } from "./case-law/_components/case-law-data";
import { SECTIONS } from "./section-explainer/_components/sections-data";
import { DETAILED_ENTRIES } from "./detailed-explainer/_components/detailed-data";
import { MAPPINGS } from "./section-mapping/_components/mapping-data";

export const metadata: Metadata = {
  title:
    "TaxSaral — Income Tax Act 2025: Case Law, Section Guide & Calculators",
  description:
    "The Income Tax Act 2025 in one place — 112 landmark judgments mapped to the new sections, a complete 1961-to-2025 section mapping, plain-language section explainers, in-depth analyses, practice quizzes and free calculators for Tax Year 2026-27. No login, no ads.",
  alternates: { canonical: "https://taxsaral.org" },
  openGraph: {
    title: "TaxSaral — Income Tax Act 2025: Case Law, Guide & Calculators",
    description:
      "112 landmark judgments mapped to IT Act 2025 sections, a complete 1961-to-2025 section mapping, explainers, quizzes and free calculators. No login, no ads.",
    url: "https://taxsaral.org",
    type: "website",
    siteName: "TaxSaral",
  },
};

const CALCULATORS = [
  {
    href: "/calculators/regime-optimizer",
    title: "Regime Optimizer",
    description:
      "Compare default vs optional regime in real-time. Includes Section 156 rebate, marginal relief, and deduction breakeven.",
    badge: "Section 202",
    tip: "Most useful calculator to start with",
    accent: "border-l-4 border-l-blue-400",
    badgeColor: "bg-blue-50 text-blue-700",
  },
  {
    href: "/calculators/hra",
    title: "HRA Exemption",
    description:
      "Calculate your House Rent Allowance exemption using the three-condition minimum formula for metro and non-metro cities.",
    badge: "Schedule III",
    tip: null,
    accent: "border-l-4 border-l-emerald-400",
    badgeColor: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/calculators/house-property-income",
    title: "House Property Income",
    description:
      "Compute income or loss from self-occupied, let-out, and deemed let-out properties. Covers co-ownership, arrears, and regime-specific loss set-off.",
    badge: "Sections 20–25",
    tip: null,
    accent: "border-l-4 border-l-amber-400",
    badgeColor: "bg-amber-50 text-amber-700",
  },
  {
    href: "/calculators/multiple-employer",
    title: "Multiple Employer",
    description:
      "Switched jobs this year? Aggregate salary and TDS from all employers to find your true tax position and any shortfall.",
    badge: "Section 392",
    tip: null,
    accent: "border-l-4 border-l-violet-400",
    badgeColor: "bg-violet-50 text-violet-700",
  },
  {
    href: "/calculators/advance-tax",
    title: "Advance Tax",
    description:
      "Calculate quarterly instalment amounts (Q1–Q4) and check if your net liability crosses the ₹10,000 threshold.",
    badge: "Section 425",
    tip: null,
    accent: "border-l-4 border-l-rose-400",
    badgeColor: "bg-rose-50 text-rose-700",
  },
  {
    href: "/calculators/residential-status",
    title: "Residential Status",
    description:
      "Determine whether you are ROR, RNOR, or Non-Resident under Section 6. Step-by-step wizard covering all exceptions for Indian citizens, PIOs, and foreign nationals.",
    badge: "Section 6",
    tip: "Essential for NRIs and returning Indians",
    accent: "border-l-4 border-l-cyan-500",
    badgeColor: "bg-cyan-50 text-cyan-700",
  },
];

const TRUST_BADGES = [
  { icon: Lock,     label: "No login required" },
  { icon: Database, label: "No data stored" },
  { icon: Zap,      label: "Instant calculations" },
  { icon: BookOpen, label: "Cites IT Act 2025 sections" },
];

// Counts are derived from the data at build time rather than hardcoded, so
// they cannot drift as content is added.
const HERO_STATS = [
  { value: `${CASE_LAWS.length}`,        label: "Landmark judgments" },
  { value: `${SECTIONS.length}`,         label: "Sections explained" },
  { value: `${MAPPINGS.length}`,         label: "1961 → 2025 mappings" },
  { value: `${DETAILED_ENTRIES.length}`, label: "Detailed explainers" },
];

// The main reference sections of the site. Calculators are listed separately
// below; these are the parts that make the site worth returning to.
const RESOURCES = [
  {
    href: "/case-law",
    title: "Case Law",
    description:
      "Landmark Supreme Court and High Court judgments — facts, arguments, reasoning and principles — each mapped from the 1961 provision to its IT Act 2025 counterpart.",
    cta: "Browse judgments",
    accent: "border-l-4 border-l-blue-500",
    badge: "112 judgments",
    badgeColor: "bg-blue-50 text-blue-700",
  },
  {
    href: "/section-explainer",
    title: "Section Explainer",
    description:
      "The sections that matter most in practice, explained in plain language — what each one says, what changed from the 1961 Act, and how it applies.",
    cta: "Explore sections",
    accent: "border-l-4 border-l-emerald-500",
    badge: `${SECTIONS.length} sections`,
    badgeColor: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/detailed-explainer",
    title: "Detailed Explainer",
    description:
      "Deep-dive analyses of the provisions that cause the most difficulty — slump sale, buyback, deemed dividend, grandfathering — with worked computations.",
    cta: "Read the analyses",
    accent: "border-l-4 border-l-violet-500",
    badge: "Worked examples",
    badgeColor: "bg-violet-50 text-violet-700",
  },
  {
    href: "/section-mapping",
    title: "1961 → 2025 Mapping",
    description:
      "Know the old section but not the new one? Search any provision of the 1961 Act and find its equivalent under the Income Tax Act 2025.",
    cta: "Find a section",
    accent: "border-l-4 border-l-amber-500",
    badge: `${MAPPINGS.length} mappings`,
    badgeColor: "bg-amber-50 text-amber-700",
  },
  {
    href: "/quiz",
    title: "Practice Quiz",
    description:
      "Concept-check questions paired with each explainer, plus harder application-level case studies from ICAI study material. Every answer is explained.",
    cta: "Test yourself",
    accent: "border-l-4 border-l-rose-500",
    badge: "Explained answers",
    badgeColor: "bg-rose-50 text-rose-700",
  },
  {
    href: "/guide",
    title: "Beginner's Guide",
    description:
      "New to the Act? Start here — the two regimes, deductions, TDS and advance tax explained from scratch, without assuming prior knowledge.",
    cta: "Start reading",
    accent: "border-l-4 border-l-teal-500",
    badge: "Start here",
    badgeColor: "bg-teal-50 text-teal-700",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Enter your income details",
    body: "Type your salary, deductions, rent paid, or any other input the calculator needs. All fields are optional — you only fill what applies to you.",
    color: "bg-blue-600",
  },
  {
    step: "2",
    title: "See a live breakdown",
    body: "Results update as you type. Every figure is accompanied by the relevant Act section so you know exactly where the number comes from.",
    color: "bg-emerald-600",
  },
  {
    step: "3",
    title: "Know your exact position",
    body: "Understand your tax liability, the better regime for your situation, and whether you need to pay advance tax — before you talk to your CA.",
    color: "bg-violet-600",
  },
];

const FAQS = [
  {
    q: "Which income tax act does TaxSaral cover?",
    a: "The Income Tax Act 2025 exclusively — the new Act that replaces the Income Tax Act 1961 from Tax Year 2026-27 onwards. The section numbers are different throughout: the rebate is Section 156 (old 87A), the regime slabs sit in Section 202, and advance tax in Section 425. Every calculator, explainer and judgment on the site cites the 2025 section, and the case law pages show the old provision alongside the new one.",
  },
  {
    q: "I know the old section number. How do I find the new one?",
    a: "Use the 1961 to 2025 Section Mapping. It is searchable by either number, so you can enter the provision you know — Section 45 for capital gains, say — and find its equivalent in the new Act, which is Section 67. Every case law entry on the site also displays the mapping for the provisions it was decided under, so you can see at a glance where a familiar judgment now sits.",
  },
  {
    q: "Does old case law still apply under the Income Tax Act 2025?",
    a: "Often yes, but not always, and that is exactly what the Case Law section is for. Where a provision has merely been renumbered, the earlier judgments continue to govern. Where it has been recast, the position can change — B.C. Srinivasa Setty, for instance, held that no capital gains arise where the cost of acquisition cannot be determined, but Section 90 of the new Act now assigns a nil cost to self-generated assets, so the outcome for goodwill no longer follows. Each judgment on the site carries a note explaining how far the principle still holds.",
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
    a: "The current suite focuses on salaried income, house property income, and advance tax — the most common needs for individual taxpayers. Capital gains, business income (PGBP), and foreign income are not covered by the current calculators, though all three are covered in the Section Explainer and the Case Law section.",
  },
];

// Makes the answers below eligible for rich results in Google.
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-br from-indigo-100/70 via-blue-50/50 to-teal-50/20">
        <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
          {/* Status pill */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Tax Year 2026-27 · Income Tax Act 2025
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            The Income Tax Act 2025,{" "}
            <span className="text-primary">Made Usable</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Landmark case law mapped to the new sections, a section-by-section
            guide, in-depth explainers and free calculators.
            <br className="hidden sm:block" />
            No ads. No login. No guesswork — every answer cites its section.
          </p>

          {/* Headline numbers */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {HERO_STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-bold text-primary">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 text-blue-500" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/case-law"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-all"
            >
              <BookOpen className="h-4 w-4" />
              Browse Case Law
            </Link>
            <Link
              href="/calculators/regime-optimizer"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm hover:bg-primary/5 transition-all"
            >
              <Calculator className="h-4 w-4" />
              Regime Optimizer
            </Link>
          </div>
          <p className="mt-2.5 text-xs text-muted-foreground">
            Every judgment mapped to its Income Tax Act 2025 section.
          </p>
        </div>
      </section>

      {/* ── Explore ──────────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-1 text-xl font-semibold">Explore the Act</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Six ways into the Income Tax Act 2025, depending on what you need —
          a judgment, a section, a worked example, or the new number for an
          old provision.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RESOURCES.map(({ href, title, description, cta, accent, badge, badgeColor }) => (
            <Link
              key={href}
              href={href}
              className={`group rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:bg-muted/10 ${accent}`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="font-semibold transition-colors group-hover:text-primary">
                  {title}
                </h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${badgeColor}`}>
                  {badge}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-80 transition-opacity group-hover:opacity-100">
                {cta}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Calculators ──────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-1 text-xl font-semibold">Free Calculators</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Work out the number, not just the rule. Each calculator covers one
          aspect of your income tax and cites the section behind every figure.
          Use them independently or link them together.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CALCULATORS.map(({ href, title, description, badge, tip, accent, badgeColor }) => (
            <Link
              key={href}
              href={href}
              className={`group relative rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:bg-muted/20 ${accent}`}
            >
              {tip && (
                <span className="absolute right-4 top-4 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                  {tip}
                </span>
              )}
              <div className="mb-3 flex items-start justify-between gap-3 pr-2">
                <h3 className="text-base font-semibold group-hover:text-primary transition-colors">{title}</h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-mono font-medium ${badgeColor}`}>
                  {badge}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              <p className="mt-4 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open calculator →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="border-t bg-gradient-to-b from-blue-50/30 to-background">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-1 text-xl font-semibold">How it works</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            TaxSaral is designed to help you understand your tax position before you sit down with your CA.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, body, color }) => (
              <div key={step} className="flex gap-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${color} text-sm font-bold text-white shadow-sm`}>
                  {step}
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
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
          <h2 className="mb-1 text-xl font-semibold">Why TaxSaral?</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Most tax calculators in India still use the 1961 Act. TaxSaral was built from scratch for 2025.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-xl border border-t-4 border-t-emerald-400 bg-card p-5 hover:shadow-sm transition-all">
              <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-100 border border-emerald-200">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="font-semibold text-sm">Built on the actual law</p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Every rate, slab, deduction limit, and section number is sourced directly from the Income Tax Act 2025 — not from a summary or circular. Section numbers are displayed on-screen so you can verify.
              </p>
            </div>
            <div className="rounded-xl border border-t-4 border-t-blue-400 bg-card p-5 hover:shadow-sm transition-all">
              <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-blue-100 border border-blue-200">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <p className="font-semibold text-sm">Completely private</p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Your income details never leave your device. Calculations run entirely in your browser with zero server calls for your data. No account, no email, no tracking of your inputs.
              </p>
            </div>
            <div className="rounded-xl border border-t-4 border-t-violet-400 bg-card p-5 hover:shadow-sm transition-all">
              <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-violet-100 border border-violet-200">
                <Zap className="h-5 w-5 text-violet-600" />
              </div>
              <p className="font-semibold text-sm">Live, linked calculators</p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Results from the HRA calculator feed directly into the Regime Optimizer. House property income/losses carry across too. One set of inputs, complete picture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-8 text-xl font-semibold">Frequently asked questions</h2>
          <div className="space-y-2">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group rounded-xl border bg-card hover:border-primary/20 transition-colors">
                <summary className="flex cursor-pointer select-none list-none items-center justify-between px-5 py-4 font-medium text-sm [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="ml-4 shrink-0 text-primary/60 transition-transform duration-200 group-open:rotate-45 text-xl leading-none font-light">
                    +
                  </span>
                </summary>
                <div className="border-t border-primary/10 px-5 py-4 text-sm text-muted-foreground leading-relaxed">
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
