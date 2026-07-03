import Link from "next/link";

const CALCULATORS = [
  {
    href: "/calculators/regime-optimizer",
    title: "Regime Optimizer",
    description:
      "Compare default vs optional regime in real-time. Includes Section 156 rebate, marginal relief, and deduction breakeven.",
    badge: "Section 202",
  },
  {
    href: "/calculators/hra",
    title: "HRA Exemption",
    description:
      "Calculate your House Rent Allowance exemption — the three-component minimum formula for metro and non-metro cities.",
    badge: "Sch. III",
  },
  {
    href: "/calculators/house-property-income",
    title: "House Property Income",
    description:
      "Compute income or loss from self-occupied, let-out, and deemed let-out properties. Covers co-ownership, arrears, and regime-specific loss set-off.",
    badge: "Sections 20-25",
  },
  {
    href: "/calculators/multiple-employer",
    title: "Multiple Employer",
    description:
      "Switched jobs this year? Aggregate salary and TDS from all employers to find your true tax position.",
    badge: "Section 392",
  },
  {
    href: "/calculators/advance-tax",
    title: "Advance Tax",
    description:
      "Calculate quarterly instalment amounts (Q1–Q4) and check if your net liability exceeds the ₹10,000 threshold.",
    badge: "Section 425",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Tax Year 2026-27 · Income Tax Act 2025
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">TaxSaral</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Indian income tax calculators built entirely on the Income Tax Act 2025.
          <br className="hidden sm:block" />
          No guesswork — all rates come from the law.
        </p>
      </div>

      {/* Calculator cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CALCULATORS.map(({ href, title, description, badge }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold group-hover:text-primary">{title}</h2>
              <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {badge}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
            <p className="mt-4 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Open calculator →
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        For guidance only — verify with a CA before filing. All calculators use IT Act 2025 rates only.
      </p>
    </main>
  );
}
