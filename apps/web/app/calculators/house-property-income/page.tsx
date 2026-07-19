import type { Metadata } from "next";
import { AlertTriangle, Globe } from "lucide-react";
import { HpClient } from "./_components/hp-client";

const BASE = "https://taxsaral.org";
const PAGE_URL = `${BASE}/calculators/house-property-income`;

export const metadata: Metadata = {
  title: "House Property Income Calculator 2026-27 — Free Online | TaxSaral",
  description: "Calculate income or loss from house property under Sections 20-25, IT Act 2025. Covers self-occupied, let-out, deemed let-out, home loan interest, co-ownership and arrears.",
  keywords: ["house property income calculator", "HP income tax", "home loan interest deduction", "section 20 IT Act 2025", "let out property tax", "self occupied property tax"],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "House Property Income Calculator 2026-27 | TaxSaral", description: "Free house property income calculator under IT Act 2025. Sections 20-25.", url: PAGE_URL, type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "House Property Income Calculator 2026-27 | TaxSaral", description: "Free house property income calculator under IT Act 2025." },
};

const HP_FAQS = [
  {
    q: "What is the difference between GAV and NAV?",
    a: "Gross Annual Value (GAV) is the deemed annual rental value of the property — computed as the higher of expected rent (municipal value vs fair market rent) and actual rent received, subject to vacancy relief and standard rent caps. Net Annual Value (NAV) = GAV minus municipal taxes actually paid by the owner. The 30% standard deduction and home loan interest are then deducted from NAV to arrive at taxable income.",
  },
  {
    q: "How many properties can I declare as self-occupied?",
    a: "A maximum of 2 properties can be treated as self-occupied under Sections 21(6)–21(7) of the Income Tax Act 2025 (formerly Section 23 of the 1961 Act). If you own 3 or more properties and none are let out, you must choose 2 as self-occupied (nil annual value) and the remaining are treated as deemed let-out — taxed on their expected rent.",
  },
  {
    q: "Can I set off a house property loss against my salary income?",
    a: "Only under the optional regime — up to a maximum of ₹2 lakh per year. If your interest on a home loan exceeds the NAV of a self-occupied property, the resulting loss can be set off against salary, business income, or other income up to ₹2L. Any excess loss is carried forward for up to 8 years and can only be set off against future house property income. Under the default regime, no set-off is permitted.",
  },
  {
    q: "Can I claim both HRA and home loan interest?",
    a: "Yes, in certain situations. If you own a property (and pay home loan interest) in one city but live in rented accommodation in another city where you work, you can claim both HRA exemption (under optional regime) and deduction for home loan interest under Section 71. Both claims in the same city for the same property are generally scrutinised more carefully.",
  },
  {
    q: "What is unrealised rent and how is it treated?",
    a: "Unrealised rent is rent that the tenant owes but you have not actually collected and have written off as irrecoverable. Under IT Act 2025, unrealised rent is deducted from actual rent received before computing the annual value (GAV), subject to prescribed conditions — the tenancy must be bona fide, you must have vacated or taken steps to vacate, and you must not hold any other beneficial interest in the property occupied by the defaulting tenant.",
  },
  {
    q: "What is vacancy relief under Section 21(2)?",
    a: "If a let-out property was vacant for part of the year and the annual value computed normally (expected rent) exceeds the actual rent because of the vacancy, Section 21(2) reduces the annual value to the actual rent received. This prevents you from being taxed on rent you never received due to genuine vacancy between tenancies.",
  },
];

const KEY_POINTS = [
  {
    label: "Sections 20–25",
    desc: "House property income is governed by Sections 20–25 of the IT Act 2025 (replacing Sections 22–27 of the 1961 Act). Section 20 is the charging section; Section 21 defines annual value; Section 22 lists deductions.",
  },
  {
    label: "Self-occupied: nil annual value",
    desc: "Up to 2 self-occupied properties are taxed at nil annual value. Only home loan interest is deductible — under the optional regime, up to an aggregate ₹2L cap across all self-occupied properties.",
  },
  {
    label: "Let-out: 30% standard deduction",
    desc: "For let-out and deemed let-out properties, you can deduct 30% of NAV as a standard deduction (Section 22) — no receipts needed. Plus the full home loan interest (no cap for let-out properties).",
  },
];

const HP_JSONLD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HP_FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
const HP_JSONLD_APP = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "House Property Income Calculator 2026-27",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  description: "Free house property income and loss calculator under IT Act 2025 Sections 20-25 for Tax Year 2026-27.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  provider: { "@type": "Organization", name: "TaxSaral", url: BASE },
};

export default function HousePropertyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HP_JSONLD_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HP_JSONLD_APP) }} />
      {/* Page header */}
      <div className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Tax Year 2026-27
          </span>
          <span>·</span>
          <span>Income Tax Act 2025</span>
          <span>·</span>
          <span>Sections 20–25</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">House Property Income Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Compute income or loss from house property under the entire Chapter IV-C (Sections 20–25).
          Supports multiple properties, co-ownership, and arrears of rent.
        </p>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For guidance only.</span> Calculations are estimates
            based on published IT Act 2025 rates. Verify with a CA before filing your return.
            Foreign property income is noted but DTAA relief is not computed here.
          </p>
        </div>
      </div>

      {/* Interactive calculator */}
      <HpClient />

      {/* Educational content */}
      <div className="mt-16 space-y-10">
        <hr />

        <div>
          <h2 className="mb-1 text-xl font-semibold">Understanding House Property Income</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Chapter IV-C of the Income Tax Act 2025 taxes you on the annual value of property you own — whether you live in it, rent it out, or leave it vacant.
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

        {/* GAV computation */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">How Annual Value is Computed (Section 21)</h2>
          <div className="rounded-lg border bg-muted/30 p-5 text-sm space-y-2">
            <div className="flex gap-3 items-start">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">1</span>
              <p><span className="font-medium">Expected rent</span> = max(Municipal value, Fair market rent), then capped at Standard rent (if Rent Control Act applies)</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">2</span>
              <p><span className="font-medium">Adjusted actual rent</span> = Actual rent received − Unrealised rent</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">3</span>
              <p><span className="font-medium">GAV</span> = max(Expected rent, Adjusted actual rent) — or just Adjusted actual rent if Section 21(2) vacancy relief applies</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">4</span>
              <p><span className="font-medium">NAV</span> = GAV − Municipal taxes paid by owner (payment basis, not accrual)</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">5</span>
              <p><span className="font-medium">Income</span> = NAV − 30% standard deduction (Section 22) − Home loan interest</p>
            </div>
          </div>
        </div>

        {/* Property types summary */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Property Types at a Glance</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Annual Value</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Interest deduction</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs">
                <tr><td className="px-4 py-3 font-medium">A — Self-occupied (max 2)</td><td className="px-4 py-3 text-muted-foreground">Nil</td><td className="px-4 py-3 text-muted-foreground">Up to ₹2L aggregate (optional regime only)</td></tr>
                <tr><td className="px-4 py-3 font-medium">B — Let-out (full year)</td><td className="px-4 py-3 text-muted-foreground">Higher of expected or actual rent</td><td className="px-4 py-3 text-muted-foreground">Full amount, no cap</td></tr>
                <tr><td className="px-4 py-3 font-medium">C — Let-out then vacant</td><td className="px-4 py-3 text-muted-foreground">Actual rent only (Sec. 21(2) relief)</td><td className="px-4 py-3 text-muted-foreground">Full amount, no cap</td></tr>
                <tr><td className="px-4 py-3 font-medium">D — Partly let / partly self-occ</td><td className="px-4 py-3 text-muted-foreground">Apportioned by units</td><td className="px-4 py-3 text-muted-foreground">Apportioned; SO portion subject to ₹2L cap</td></tr>
                <tr><td className="px-4 py-3 font-medium">F — Deemed let-out (3rd property)</td><td className="px-4 py-3 text-muted-foreground">Expected rent</td><td className="px-4 py-3 text-muted-foreground">Full amount, no cap</td></tr>
                <tr><td className="px-4 py-3 font-medium">G — Builder inventory</td><td className="px-4 py-3 text-muted-foreground">Nil within 2 years; Type F after</td><td className="px-4 py-3 text-muted-foreground">Deductible</td></tr>
                <tr><td className="px-4 py-3 font-medium">H — Own business use</td><td className="px-4 py-3 text-muted-foreground">Excluded — report under PGBP</td><td className="px-4 py-3 text-muted-foreground">Not applicable</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Loss set-off */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 text-sm font-semibold">Loss set-off — Optional Regime</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              House property losses can be set off against salary or other income up to <span className="font-medium">₹2 lakh per year</span>. Remaining loss is carried forward for up to 8 years against future house property income only.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 text-sm font-semibold">Loss set-off — Default Regime</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium text-amber-700">No set-off allowed</span> against other income. House property losses under the default regime are carried forward as-is, against future house property income only.
            </p>
          </div>
        </div>

        {/* Foreign property note */}
        <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm">
          <Globe className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
          <div>
            <p className="font-medium text-orange-900">Foreign property (Type I)</p>
            <p className="mt-1 text-xs text-orange-800 leading-relaxed">
              Resident individuals must declare income from foreign property in their Indian income tax return. The computation is the same as for Indian property. DTAA (Double Tax Avoidance Agreement) relief for taxes paid abroad must be computed separately — this calculator does not handle DTAA credit.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Common questions</h2>
          <div className="space-y-2">
            {HP_FAQS.map(({ q, a }) => (
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

        <div className="rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Legal reference: </span>
          Sections 20–25, Income Tax Act 2025 (Chapter IV-C). S.20 — Charging section; S.21 — Annual value computation;
          S.22 — Deductions (30% + interest); S.23 — Arrears; S.24 — Co-ownership; S.25 — Deemed ownership.
        </div>
      </div>
    </div>
  );
}
