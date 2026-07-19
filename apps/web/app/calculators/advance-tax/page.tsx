import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { parseParam } from "@/lib/cross-link";
import { AdvanceTaxClient } from "./_components/at-client";

const BASE = "https://taxsaral.org";
const PAGE_URL = `${BASE}/calculators/advance-tax`;

export const metadata: Metadata = {
  title: "Advance Tax Calculator 2026-27 — Quarterly Instalments | TaxSaral",
  description: "Calculate your advance tax instalments for Tax Year 2026-27 under IT Act 2025. Sections 403-408 — Q1 June, Q2 September, Q3 December, Q4 March due dates and amounts.",
  keywords: ["advance tax calculator", "advance tax 2026-27", "quarterly advance tax", "section 403 IT Act 2025", "advance tax due dates", "advance tax instalments"],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Advance Tax Calculator 2026-27 | TaxSaral", description: "Free advance tax instalment calculator for Tax Year 2026-27 under IT Act 2025.", url: PAGE_URL, type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "Advance Tax Calculator 2026-27 | TaxSaral", description: "Free advance tax calculator — Q1 to Q4 instalments under IT Act 2025." },
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

const AT_FAQS = [
  {
    q: "Who is required to pay advance tax?",
    a: "Any taxpayer whose net tax liability (total tax due minus TDS) exceeds ₹10,000 in a financial year must pay advance tax. This includes salaried individuals who have additional income beyond their salary — such as rental income, bank interest, capital gains, or freelance fees — that is not fully covered by TDS. If your only income is salary and your employer deducts TDS correctly, you are typically covered.",
  },
  {
    q: "What are the four advance tax instalment due dates?",
    a: "Q1: 15% of annual liability by June 15, 2026. Q2: 45% (cumulative) by September 15, 2026. Q3: 75% (cumulative) by December 15, 2026. Q4: 100% by March 15, 2027. Missing these dates attracts interest under Section 425 at 1% per month on the shortfall.",
  },
  {
    q: "Are senior citizens exempt from advance tax?",
    a: "Yes. Senior citizens (age 60 or above during the financial year) who do not have income from business or profession are exempt from paying advance tax under Section 403. They can pay the entire tax as self-assessment tax before filing, without any Section 425 interest penalty.",
  },
  {
    q: "What if I underestimate my income?",
    a: "If your advance tax payments fall short of 90% of your actual tax liability, interest under Section 424 applies at 1% per month from April 1 to the date of payment. Additionally, if any individual instalment was short, Section 425 interest applies on that instalment's shortfall for 3 months. This calculator helps you plan based on your best estimate for the full year.",
  },
  {
    q: "How do I pay advance tax?",
    a: "Advance tax is paid through Challan 280 (ITNS 280) on the income tax e-filing portal (incometax.gov.in). Select 'Advance Tax' as the payment type and enter your PAN, assessment year (2027-28), and amount. Keep the challan receipt — it's your proof of payment.",
  },
  {
    q: "I have capital gains during the year. How do I handle advance tax?",
    a: "Capital gains are often unpredictable (you don't always know in advance when you'll sell an asset). The law provides some relief: for capital gains arising in the 3rd or 4th quarter, you can include them in your Q3 or Q4 instalment estimate respectively. If a gain arose late in the year and you couldn't reasonably estimate it earlier, Section 425 interest is generally not levied for the earlier installments — but Q4 must still catch up to 100%.",
  },
];

const KEY_POINTS = [
  {
    label: "₹10,000 threshold",
    desc: "You must pay advance tax only if your net tax liability (after all TDS credits) exceeds ₹10,000. Below this, pay as self-assessment tax when filing.",
  },
  {
    label: "4 quarterly instalments",
    desc: "Jun 15 (15%), Sep 15 (45%), Dec 15 (75%), Mar 15 (100%) — cumulative percentages. Missing any instalment attracts 1% per month interest under Section 425.",
  },
  {
    label: "Salaried + other income",
    desc: "Salaried individuals usually need advance tax only for non-salary income (rent, FD interest, capital gains, freelance) not covered by TDS.",
  },
];

const AT_JSONLD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: AT_FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
const AT_JSONLD_APP = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Advance Tax Calculator 2026-27",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  description: "Free advance tax instalment calculator for Tax Year 2026-27 under IT Act 2025 Sections 403-408.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  provider: { "@type": "Organization", name: "TaxSaral", url: BASE },
};

export default function AdvanceTaxPage({ searchParams }: Props) {
  const initialIncome = parseParam(searchParams, "income");
  const initialTds = parseParam(searchParams, "tds");

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(AT_JSONLD_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(AT_JSONLD_APP) }} />
      {/* Page header */}
      <div className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Tax Year 2026-27
          </span>
          <span>·</span>
          <span>Income Tax Act 2025</span>
          <span>·</span>
          <span>Section 425</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Advance Tax Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Calculate your quarterly advance tax instalments to avoid interest on late or short payment.
        </p>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For guidance only.</span> Interest on late payment is
            not computed here. Verify with a CA before making advance tax payments.
          </p>
        </div>
      </div>

      {/* Interactive calculator */}
      <AdvanceTaxClient
        initialIncome={initialIncome}
        initialTds={initialTds}
        prefillSource={initialIncome > 0 ? "Multiple Employer Calculator" : undefined}
      />

      {/* Educational content */}
      <div className="mt-16 space-y-10">
        <hr />

        <div>
          <h2 className="mb-1 text-xl font-semibold">Understanding Advance Tax</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Advance tax is the government&apos;s mechanism to collect tax throughout the year rather than as a lump sum at filing time. Pay it in four instalments or face interest penalties.
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

        {/* Instalment schedule */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Tax Year 2026-27 — Instalment Schedule (Section 425)
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Quarter</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Due Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Cumulative %</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">If missed</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-medium">Q1</td>
                  <td className="px-4 py-3">Jun 15, 2026</td>
                  <td className="px-4 py-3">15% of annual liability</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">1% per month interest (Sec. 425) on shortfall for 3 months</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Q2</td>
                  <td className="px-4 py-3">Sep 15, 2026</td>
                  <td className="px-4 py-3">45% of annual liability</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">1% per month on shortfall for 3 months</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Q3</td>
                  <td className="px-4 py-3">Dec 15, 2026</td>
                  <td className="px-4 py-3">75% of annual liability</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">1% per month on shortfall for 3 months</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="px-4 py-3 font-medium">Q4 (final)</td>
                  <td className="px-4 py-3 font-medium">Mar 15, 2027</td>
                  <td className="px-4 py-3 font-medium">100% of annual liability</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">Section 424 interest from Apr 1 if less than 90% paid by Mar 31</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Percentages are cumulative. If your annual liability is ₹50,000, you must have paid at least ₹7,500 by June 15, ₹22,500 by September 15, ₹37,500 by December 15, and ₹50,000 by March 15.
          </p>
        </div>

        {/* Interest penalties */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Interest on Short or Late Payment</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm font-semibold mb-1">Section 425 — Instalment shortfall</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                1% per month (simple interest) on the shortfall in each quarterly instalment. Applied for 3 months per instalment. Calculated on the difference between what you paid and what you should have paid cumulatively.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm font-semibold mb-1">Section 424 — Overall shortfall</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                1% per month if you pay less than 90% of your total tax liability by March 31. Interest runs from April 1 of the following year until the date of payment (self-assessment tax or demand date).
              </p>
            </div>
          </div>
        </div>

        {/* Who must pay */}
        <div className="rounded-lg border bg-card p-5 text-sm">
          <p className="font-semibold mb-3">Quick check — do you need to pay advance tax?</p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="font-medium text-emerald-700 w-8 shrink-0">YES</span>
              <span>You have income beyond salary not covered by TDS (rental income, bank interest, freelance fees, capital gains) and combined net tax exceeds ₹10,000</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-emerald-700 w-8 shrink-0">YES</span>
              <span>You switched employers and your combined TDS is under-deducted (use the Multiple Employer calculator to check)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-slate-500 w-8 shrink-0">NO</span>
              <span>You are a salaried employee with correct TDS deducted by your employer and no other significant income</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-slate-500 w-8 shrink-0">NO</span>
              <span>You are a senior citizen (age 60+) with no business or professional income (Section 425 exemption)</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Common questions</h2>
          <div className="space-y-2">
            {AT_FAQS.map(({ q, a }) => (
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
          Sections 403–408 (advance tax obligation, computation &amp; instalment schedule) · Section 424 (interest for default in payment — old Sec. 234B) · Section 425 (interest for deferment of instalments — old Sec. 234C) — Income Tax Act 2025, Tax Year 2026-27 (AY 2027-28).
        </div>
      </div>
    </div>
  );
}
