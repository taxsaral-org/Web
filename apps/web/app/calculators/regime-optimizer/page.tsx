import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { parseParam } from "@/lib/cross-link";
import { OptimizerClient } from "./_components/optimizer-client";

const BASE = "https://taxsaral.org";
const PAGE_URL = `${BASE}/calculators/regime-optimizer`;

export const metadata: Metadata = {
  title: "Income Tax Regime Optimizer 2026-27 — Default vs Optional | TaxSaral",
  description:
    "Free income tax regime calculator for Tax Year 2026-27 (IT Act 2025). Compare Default vs Optional regime, Section 156 rebate, HRA, 80C, home loan. Find which regime saves you more tax.",
  keywords: ["income tax regime calculator", "default vs optional regime", "IT Act 2025 calculator", "section 156 rebate", "tax year 2026-27", "80C deduction calculator", "HRA calculator"],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Income Tax Regime Optimizer 2026-27 | TaxSaral", description: "Compare Default vs Optional tax regime under IT Act 2025. Free, real-time calculator.", url: PAGE_URL, type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "Income Tax Regime Optimizer 2026-27 | TaxSaral", description: "Compare Default vs Optional tax regime under IT Act 2025. Free, real-time." },
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

const REGIME_FAQS = [
  {
    q: "Which regime is better for me?",
    a: "It depends on your total eligible deductions. As a rough guide: if your deductions (Section 123/80C, HRA, home loan interest, health insurance) together exceed roughly ₹3–4 lakh, the optional regime is likely better. Below that, the default regime usually wins — especially with the Section 156 rebate eliminating tax entirely for incomes up to ₹12 lakh. Use this calculator to find your exact breakeven.",
  },
  {
    q: "What deductions are available only under the optional regime?",
    a: "The optional regime allows: Section 123 (80C) — ₹1.5 lakh; Section 127 (NPS extra) — ₹50,000; Section 130 (80D health insurance) — up to ₹75,000 for senior parents; HRA exemption (Schedule III); home loan interest up to ₹2 lakh for self-occupied property (Section 71); Section 133 (education loan interest); savings/deposit interest exemptions (Sections 149/150). The default regime offers only the ₹75,000 standard deduction.",
  },
  {
    q: "Can I switch regime every year?",
    a: "Yes, if you are a salaried individual (no business income), you can choose a different regime every year when filing your return. However, if you have business or professional income, once you opt out of the default regime, switching back requires meeting specific conditions and is subject to a one-time window.",
  },
  {
    q: "What is the Section 156 rebate?",
    a: "Section 156 (formerly Section 87A) gives a full rebate on income tax if your total income does not exceed ₹12 lakh under the default regime. This means your tax liability becomes zero — even though slabs technically apply above ₹4 lakh. The rebate is only available under the default regime and does not apply to special-rate incomes like capital gains.",
  },
  {
    q: "What is marginal relief and when does it apply?",
    a: "Marginal relief prevents a situation where paying ₹1 more income results in more than ₹1 of extra tax. It typically applies near the ₹12 lakh boundary of the Section 156 rebate and near surcharge thresholds (₹50 lakh, ₹1 crore, etc.). This calculator handles marginal relief automatically.",
  },
];

const KEY_POINTS = [
  {
    label: "Default regime",
    desc: "7 slabs (0%–30%), ₹75,000 standard deduction, full rebate up to ₹12L income (Sec. 156). Most deductions not available.",
  },
  {
    label: "Optional regime",
    desc: "4 slabs (0%–30%), ₹50,000 standard deduction. 80C, HRA, home loan interest, health insurance, and more deductions allowed.",
  },
  {
    label: "Choose annually",
    desc: "Salaried individuals can pick the better regime each year at filing time. Your employer may ask for a declaration at the start of the year — use this calculator to decide.",
  },
];

const REGIME_JSONLD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: REGIME_FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const REGIME_JSONLD_APP = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Income Tax Regime Optimizer 2026-27",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  description: "Compare Default vs Optional income tax regime under IT Act 2025 for Tax Year 2026-27.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  provider: { "@type": "Organization", name: "TaxSaral", url: BASE },
};

export default function RegimeOptimizerPage({ searchParams }: Props) {
  const initialHra = parseParam(searchParams, "hra");
  const initialHpIncome = parseParam(searchParams, "hpIncome", true);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(REGIME_JSONLD_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(REGIME_JSONLD_APP) }} />
      {/* Page header */}
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
        <h1 className="text-3xl font-bold tracking-tight">Income Tax Regime Optimizer</h1>
        <p className="mt-2 text-muted-foreground">
          Compare your tax liability under the default and optional regimes. Results update as you type.
        </p>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For guidance only.</span> Tax calculations are
            estimates based on published IT Act 2025 rates. Verify with a CA before filing your return.
          </p>
        </div>
      </div>

      {/* Interactive calculator */}
      <OptimizerClient initialHra={initialHra} initialHpIncome={initialHpIncome} />

      {/* Educational content */}
      <div className="mt-16 space-y-10">
        <hr />

        {/* Key concepts grid */}
        <div>
          <h2 className="mb-1 text-xl font-semibold">Understanding the two tax regimes</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Under the Income Tax Act 2025, every individual files under one of two parallel tax systems. You compare, then choose.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {KEY_POINTS.map(({ label, desc }) => (
              <div key={label} className="rounded-lg border bg-card p-4">
                <p className="mb-1 text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regime comparison table */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Default vs Optional — Side by Side</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground w-1/3">Feature</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Default Regime</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Optional Regime</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-medium">Slab count</td>
                  <td className="px-4 py-3 text-muted-foreground">7 slabs (0% to 30%)</td>
                  <td className="px-4 py-3 text-muted-foreground">4 slabs (0% to 30%)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Standard deduction</td>
                  <td className="px-4 py-3 text-muted-foreground">₹75,000</td>
                  <td className="px-4 py-3 text-muted-foreground">₹50,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Section 156 rebate</td>
                  <td className="px-4 py-3 text-muted-foreground">Yes — zero tax up to ₹12L income</td>
                  <td className="px-4 py-3 text-muted-foreground">No</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">80C / Sec. 123 (₹1.5L)</td>
                  <td className="px-4 py-3 text-muted-foreground">Not available</td>
                  <td className="px-4 py-3 text-emerald-700 font-medium">Available</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">HRA exemption</td>
                  <td className="px-4 py-3 text-muted-foreground">Not available</td>
                  <td className="px-4 py-3 text-emerald-700 font-medium">Available</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Home loan interest (SO)</td>
                  <td className="px-4 py-3 text-muted-foreground">Not available</td>
                  <td className="px-4 py-3 text-emerald-700 font-medium">Up to ₹2L (Sec. 71)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Health insurance (80D)</td>
                  <td className="px-4 py-3 text-muted-foreground">Not available</td>
                  <td className="px-4 py-3 text-emerald-700 font-medium">Up to ₹75K (Sec. 130)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">HP loss set-off</td>
                  <td className="px-4 py-3 text-muted-foreground">No set-off allowed</td>
                  <td className="px-4 py-3 text-emerald-700 font-medium">Up to ₹2L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Common questions</h2>
          <div className="space-y-2">
            {REGIME_FAQS.map(({ q, a }) => (
              <details key={q} className="group rounded-lg border bg-card">
                <summary className="flex cursor-pointer select-none list-none items-center justify-between px-5 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45 text-lg leading-none">+</span>
                </summary>
                <div className="border-t px-5 py-4 text-sm text-muted-foreground leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Legal reference */}
        <div className="rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Legal reference: </span>
          Section 202 (tax rate slabs) · Section 156 (rebate) · Section 123/Schedule III (deductions) — Income Tax Act 2025, applicable from Tax Year 2026-27.
        </div>
      </div>
    </div>
  );
}
