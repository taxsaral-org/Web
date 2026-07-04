import Link from "next/link";
import { ShieldCheck, Database, Lock } from "lucide-react";

const CALCULATORS = [
  { href: "/calculators/regime-optimizer", label: "Regime Optimizer" },
  { href: "/calculators/hra", label: "HRA Exemption" },
  { href: "/calculators/house-property-income", label: "House Property Income" },
  { href: "/calculators/multiple-employer", label: "Multiple Employer" },
  { href: "/calculators/advance-tax", label: "Advance Tax" },
  { href: "/calculators/residential-status", label: "Residential Status" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight">TaxSaral</span>
              <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-semibold text-blue-700">
                IT Act 2025
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free income tax calculators and guides built entirely on the Income Tax Act 2025 for Tax Year 2026-27.
              No registrations, no ads, no data collection.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3 text-emerald-600" />
                No login required
              </span>
              <span className="flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                <Database className="h-3 w-3 text-emerald-600" />
                No data stored
              </span>
              <span className="flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                Runs in your browser
              </span>
            </div>
          </div>

          {/* Calculators & Guide */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Calculators
            </p>
            <ul className="space-y-2">
              {CALCULATORS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Learn
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/guide" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  IT Act 2025 Guide
                </Link>
              </li>
              <li>
                <Link href="/section-explainer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Section Explainer
                </Link>
              </li>
              <li>
                <Link href="/section-mapping" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  1961 → 2025 Mapping
                </Link>
              </li>
              <li>
                <Link href="/ask" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Ask a Question
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Company
            </p>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Use" },
                { href: "/ask", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Important Notice
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All calculations are estimates for informational purposes only and do not constitute
              tax advice. Indian income tax law involves individual circumstances that cannot all be
              captured in a general-purpose calculator.
            </p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Always verify with a Chartered Accountant</span>{" "}
              before filing your income tax return or making advance tax payments.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Rates and rules sourced from the{" "}
              <span className="font-medium text-foreground">Income Tax Act 2025</span>{" "}
              as applicable to Tax Year 2026-27 (AY 2027-28).
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 TaxSaral.org — For guidance only, not legal or tax advice.</p>
          <p>Income Tax Act 2025 · Tax Year 2026-27 · AY 2027-28</p>
        </div>
      </div>
    </footer>
  );
}
