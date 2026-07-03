import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { HraClient } from "./_components/hra-client";

export const metadata: Metadata = {
  title: "HRA Exemption Calculator — TaxSaral",
  description:
    "Calculate your House Rent Allowance exemption under the Income Tax Act 2025 (Schedule III), Tax Year 2026-27. Metro and non-metro city rates included.",
};

const HRA_FAQS = [
  {
    q: "Is HRA exemption available under the default (new) regime?",
    a: "No. HRA exemption is only available under the optional (old) regime. If you have chosen the default regime for Tax Year 2026-27, your entire HRA is taxable. This is one of the major deductions that might make the optional regime more attractive for you — use the Regime Optimizer to compare.",
  },
  {
    q: "What counts as 'basic salary' for the HRA formula?",
    a: "Under the Income Tax Act 2025, 'basic salary' for HRA purposes typically means basic pay plus dearness allowance (DA). Commission based on a fixed percentage of sales turnover is also included. Performance bonuses, HRA itself, and most allowances are excluded. Check your salary slip or Form 16 for the components your employer considers as basic for TDS purposes.",
  },
  {
    q: "What are the 8 metro cities for the 50% rate?",
    a: "Delhi (including NCR), Mumbai (including Navi Mumbai and Thane), Kolkata, Chennai, Bangalore, Pune, Hyderabad, and Ahmedabad. If you live in any other city, the rate is 40% of basic salary. The classification is based on the city you actually live in, not your employer's headquarters.",
  },
  {
    q: "Can I claim HRA if I pay rent to a parent or family member?",
    a: "Yes, you can pay rent to a parent and claim HRA exemption — provided the tenancy is genuine, your parent owns the property, and rent is actually transferred. The rental income must be declared by your parent in their own tax return. Paying rent to a spouse is generally not accepted as it may be challenged.",
  },
  {
    q: "Is a landlord's PAN mandatory?",
    a: "If your annual rent exceeds ₹1 lakh per year (₹8,333 per month), you must provide your landlord's PAN to your employer. If the landlord does not have a PAN, a declaration to that effect can be submitted, but your employer may not grant the full exemption. Keep rent receipts as supporting documentation.",
  },
  {
    q: "What if I own a house but rent another place for work?",
    a: "You can still claim HRA if you live in a rented accommodation, even if you own a property elsewhere — for example, if you own a house in your hometown but rent an apartment in the city where you work. The exemption is based on where you actually live and pay rent.",
  },
];

const KEY_POINTS = [
  {
    label: "Optional regime only",
    desc: "HRA exemption applies only under the optional regime (Schedule III, IT Act 2025). Under the default regime, HRA received is fully taxable.",
  },
  {
    label: "Minimum of 3 amounts",
    desc: "The exempt portion is the LOWEST of: (1) actual HRA received, (2) 50% or 40% of basic salary, and (3) actual rent paid minus 10% of basic salary.",
  },
  {
    label: "Metro vs non-metro",
    desc: "8 cities get the 50% rate: Delhi, Mumbai, Kolkata, Chennai, Bangalore, Pune, Hyderabad, Ahmedabad. All others use 40%.",
  },
];

export default function HraPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Tax Year 2026-27
          </span>
          <span>·</span>
          <span>Income Tax Act 2025</span>
          <span>·</span>
          <span>Schedule III</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">HRA Exemption Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Find how much of your House Rent Allowance is exempt from tax under the optional regime.
        </p>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For guidance only.</span> HRA exemption applies only
            under the optional (old) regime. Verify with a CA before filing.
          </p>
        </div>
      </div>

      {/* Interactive calculator */}
      <HraClient />

      {/* Educational content */}
      <div className="mt-16 space-y-10">
        <hr />

        <div>
          <h2 className="mb-1 text-xl font-semibold">Understanding HRA Exemption</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            HRA is part of your salary package meant to cover rent costs. The law provides a partial tax exemption — but only under the optional regime and only if you actually pay rent.
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

        {/* Formula breakdown */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">The HRA Exemption Formula</h2>
          <div className="rounded-lg border bg-muted/30 p-5 space-y-3 text-sm">
            <p className="font-medium">Exempt HRA = Minimum of:</p>
            <ol className="ml-4 space-y-2 list-decimal marker:text-muted-foreground">
              <li>
                <span className="font-medium">Actual HRA received</span>
                <span className="text-muted-foreground"> — as per your salary slip or Form 16</span>
              </li>
              <li>
                <span className="font-medium">50% of basic salary</span>
                <span className="text-muted-foreground"> (metro cities) or </span>
                <span className="font-medium">40% of basic salary</span>
                <span className="text-muted-foreground"> (non-metro cities)</span>
              </li>
              <li>
                <span className="font-medium">Actual rent paid</span>
                <span className="text-muted-foreground"> minus </span>
                <span className="font-medium">10% of basic salary</span>
              </li>
            </ol>
            <p className="text-muted-foreground pt-2 border-t">
              The remaining HRA (total received minus exempt amount) is added to your taxable income under &ldquo;Salaries&rdquo;.
            </p>
          </div>
        </div>

        {/* Example */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Worked example (Bangalore)</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Condition</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="px-4 py-3">Basic salary (annual)</td><td className="px-4 py-3">₹6,00,000</td></tr>
                <tr><td className="px-4 py-3">HRA received (annual)</td><td className="px-4 py-3">₹2,40,000</td></tr>
                <tr><td className="px-4 py-3">Actual rent paid (annual)</td><td className="px-4 py-3">₹2,00,000</td></tr>
                <tr className="bg-muted/20"><td className="px-4 py-3 font-medium">Condition 1 — actual HRA</td><td className="px-4 py-3 font-medium">₹2,40,000</td></tr>
                <tr className="bg-muted/20"><td className="px-4 py-3 font-medium">Condition 2 — 50% of basic (metro)</td><td className="px-4 py-3 font-medium">₹3,00,000</td></tr>
                <tr className="bg-muted/20"><td className="px-4 py-3 font-medium">Condition 3 — rent minus 10% of basic</td><td className="px-4 py-3 font-medium">₹2,00,000 − ₹60,000 = ₹1,40,000</td></tr>
                <tr className="bg-emerald-50">
                  <td className="px-4 py-3 font-semibold text-emerald-800">Exempt HRA (minimum of 3)</td>
                  <td className="px-4 py-3 font-semibold text-emerald-800">₹1,40,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-muted-foreground">Taxable HRA (₹2,40,000 − ₹1,40,000)</td>
                  <td className="px-4 py-3 text-muted-foreground">₹1,00,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Common questions</h2>
          <div className="space-y-2">
            {HRA_FAQS.map(({ q, a }) => (
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
          Schedule III, Rule 3 — HRA exemption formula · Income Tax Act 2025, Tax Year 2026-27.
          Metro city classification follows Central Government notifications as adopted by the 2025 Act.
        </div>
      </div>
    </div>
  );
}
