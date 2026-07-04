import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { MultipleEmployerClient } from "./_components/me-client";

export const metadata: Metadata = {
  title: "Multiple Employer Tax Calculator — TaxSaral",
  description:
    "Aggregate salary from multiple employers and check advance tax liability. Income Tax Act 2025, Tax Year 2026-27.",
};

const ME_FAQS = [
  {
    q: "Why does switching jobs create a tax problem?",
    a: "Each employer deducts TDS (Tax Deducted at Source) independently based only on the salary and declarations they know about. Employer A assumes you earned nothing before joining; Employer B may similarly not know about Employer A. Both may grant you the full ₹75,000 standard deduction, the Section 156 rebate threshold, and any other declared deductions — resulting in under-deduction when your combined income is higher.",
  },
  {
    q: "What is Form 12B and am I required to submit it?",
    a: "Form 12B is a declaration you must submit to your new employer containing your salary earned and TDS deducted by all previous employers in the same financial year. Under Section 192(2) of the Income Tax Act 2025, your new employer is then required to factor this information into their TDS calculations going forward. Failing to submit Form 12B often leads to under-deduction of TDS.",
  },
  {
    q: "What if my previous employer didn't provide the details in time?",
    a: "Even if you couldn't submit Form 12B, your overall tax liability is calculated on your total annual income — not per-employer. If TDS falls short, the shortfall must be paid as advance tax by March 15 or as self-assessment tax before filing. Interest under Sections 424 and 425 of the IT Act 2025 applies on late or short payment.",
  },
  {
    q: "Do I get the standard deduction from each employer?",
    a: "No. The ₹75,000 standard deduction under the default regime (or ₹50,000 under the optional regime) is a per-individual annual deduction — not per employer. Your total salary from all employers combined gets one deduction. Each employer may apply it independently in their TDS calculation, but only one deduction applies in your final return.",
  },
  {
    q: "How do I reconcile TDS from multiple employers in my return?",
    a: "Use your Form 26AS or Annual Information Statement (AIS) from the income tax portal to see all TDS credits against your PAN. Include all salary income and all TDS amounts in your ITR. The net tax payable (or refund due) is computed on the total. This calculator helps you estimate that net position before you file.",
  },
  {
    q: "What form do I use to file if I had multiple employers?",
    a: "Use ITR-1 (Sahaj) if your total income is up to ₹50 lakh with only salary, house property (one property), and other income. If you have capital gains or business income, use ITR-2 or ITR-3. The form is the same regardless of how many employers — list all employer salary details in the income from salary schedule.",
  },
];

const KEY_POINTS = [
  {
    label: "TDS gap risk",
    desc: "Each employer deducts TDS only on what they know. If you don't disclose prior employer's salary via Form 12B, each employer under-deducts, leaving you with a tax shortfall at filing time.",
  },
  {
    label: "One standard deduction",
    desc: "The ₹75,000 standard deduction (default regime) is per person per year — not per employer. Your ITR uses one deduction on total salary from all employers.",
  },
  {
    label: "Advance tax may apply",
    desc: "If the TDS shortfall across employers exceeds ₹10,000, you are required to pay advance tax by March 15. Missing it attracts interest under Sections 424 and 425 (IT Act 2025).",
  },
];

export default function MultipleEmployerPage() {
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
          <span>Section 392 (TDS)</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Multiple Employer Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Switched jobs this year? Aggregate your salary income and TDS from all employers to
          find your net tax position.
        </p>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For guidance only.</span> Computed under the default
            regime with standard deduction only. Include Form 16 from each employer. Verify with a
            CA before filing.
          </p>
        </div>
      </div>

      {/* Interactive calculator */}
      <MultipleEmployerClient />

      {/* Educational content */}
      <div className="mt-16 space-y-10">
        <hr />

        <div>
          <h2 className="mb-1 text-xl font-semibold">Why Multiple Employers Create a Tax Gap</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Job changes within a financial year are increasingly common. The TDS system was not designed for multiple employers — each employer acts independently, which almost always results in under-deduction.
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

        {/* What happens */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">What Actually Happens</h2>
          <div className="space-y-3">
            {[
              {
                step: "Jan–Jun",
                title: "At Employer A",
                body: "Employer A deducts TDS based on your full-year annualised salary projection with them. They apply standard deduction and any declarations you made. They have no idea you'll change jobs.",
              },
              {
                step: "Jul",
                title: "You join Employer B",
                body: "Employer B also annualises your salary with them and starts fresh. If you don't submit Form 12B with your Employer A details, B may apply the full standard deduction again and project a much lower annual income.",
              },
              {
                step: "Mar–Jul",
                title: "Filing time",
                body: "Your ITR must show total salary from A + B. The combined income is higher — likely in a higher slab. Combined TDS was based on two separate, lower projections. You owe the shortfall, plus interest if it exceeded ₹10,000.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4 rounded-lg border bg-card p-4">
                <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-mono font-medium text-muted-foreground">
                  {step}
                </div>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to do */}
        <div className="rounded-lg border bg-emerald-50 border-emerald-200 p-5 text-sm">
          <p className="font-semibold text-emerald-900 mb-2">What you should do</p>
          <ol className="ml-4 list-decimal space-y-1.5 text-emerald-800 text-xs">
            <li>Get your final payslip and TDS certificate (Form 16 Part B or monthly TDS statements) from Employer A.</li>
            <li>Submit Form 12B to Employer B with Employer A&apos;s salary and TDS figures immediately after joining.</li>
            <li>If it&apos;s too late for Form 12B (you&apos;ve already left Employer B), use this calculator to estimate your shortfall.</li>
            <li>If the shortfall exceeds ₹10,000, pay advance tax before March 15 to avoid interest.</li>
            <li>File your ITR using data from both Form 16 certificates, and verify your 26AS to ensure all TDS credits are reflected.</li>
          </ol>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Common questions</h2>
          <div className="space-y-2">
            {ME_FAQS.map(({ q, a }) => (
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
          Section 392 (TDS on salary) · Section 192(2) (Form 12B obligation) · Section 424 (interest for default in advance tax) · Section 425 (interest for deferment of instalments) — Income Tax Act 2025, Tax Year 2026-27.
        </div>
      </div>
    </div>
  );
}
